import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import DeliveryCard from '../../components/DeliveryCard';
import {
    DialogOrderDetails,
    ModalHandles,
} from '../../components/DialogOrderDetails';
import Divider from '../../components/Divider';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Input from '../../components/Input';
import ScrollArea from '../../components/ScrollArea';
import useAuth from '../../hooks/useAuth';
import { useOrder } from '../../hooks/useOrder';
import { database } from '../../services/firebase';
import errorResolverFirebase from '../../util/errorResolverFirebase';
import { formatPrice } from '../../util/format';
import formatDate from '../../util/formatDate';
import formatDateWithoutHoursUTC from '../../util/formatDateWithoutHoursUTC';
import {
    Completas,
    Container,
    ContainerOrders,
    Flex,
    Nav,
    Pendentes,
} from './style';
import logoutIcon from '../../assets/logout.svg';
import reportIcon from '../../assets/report.svg';
import clientIcon from '../../assets/user.svg';
import deliveryIcon from '../../assets/delivery.svg';
import {
    DialogSearchClient,
    ModalDialogSearchClientHandles,
} from '../../components/DialogSearchClient';

type Order = {
    id: string;
    client: Client;
    items: Item[];
    createdAt: Date;
    deliveryprice: number;
    deliveryDate: string;
    deliveryDateFormatted: string;
    deliverytime: string;
    deliverytype: string;
    deliveryTypeFormatted: string;
    discount: number;
    money: boolean;
    total: number;
    totalFormatted: string;
    card: boolean;
    pix: boolean;
    check: boolean;
    subTotal: number;
    status: 'pendente' | 'completo';
};

interface Item {
    name: string;
    price: number;
    quantity: number;
}

type Client = {
    id: string;
    cpf: string;
    name: string;
    whatsapp: string;
    address: Address;
};

type Address = {
    street: string;
    number: string;
    district: string;
    complement: string;
    city: string;
    postalcode: string;
};

export default function Home() {
    const modalClientRef = useRef<ModalDialogSearchClientHandles>(null);
    const { createUserWithEmail, loginWithEmail } = useAuth();
    const { getListBetweenDates, deleteOrder } = useOrder();
    const [orders, setOrders] = useState<Order[]>([] as Order[]);
    const [ordersFilter, setOrdersFilter] = useState<Order[]>(orders);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const modalRef = useRef<ModalHandles>(null);
    const orderRef = query(
        ref(database, 'orders'),
        orderByChild('createdAt'),
        equalTo(formatDateWithoutHoursUTC(new Date())),
    );
    const [orderStatus, setOrderStatus] = useState<'pendente' | 'completo'>(
        'pendente',
    );
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const searchOrders = orders.filter(
            order => order.client.name.indexOf(searchInput) >= 0,
        );
        setOrdersFilter(searchOrders);
    }, [searchInput, orders]);

    useEffect(() => {
        onValue(orderRef, snapshot => {
            const data = snapshot.val();
            const updatedOrders = getListBetweenDates(data);
            const formattedOrder = updatedOrders.map(order => {
                const dateString = order.deliveryDate.toString();
                const date = new Date(dateString.concat(' 03:00'));
                return {
                    ...order,
                    deliveryTypeFormatted:
                        order.deliverytype[0].toUpperCase() +
                        order.deliverytype.substring(1),
                    deliveryDateFormatted: formatDate(date),
                    totalFormatted: formatPrice(order.total),
                };
            });
            const orderSort = formattedOrder.sort((a, b) => {
                const deliveryA = Number(a.deliverytime.replace(':', '.'));
                const deliveryB = Number(b.deliverytime.replace(':', '.'));
                return deliveryA < deliveryB
                    ? -1
                    : deliveryA > deliveryB
                    ? 1
                    : 0;
            });
            setOrders(orderSort);
        });
        const interval = setInterval(() => setTime(new Date()), 1000 * 60); // 1 minuto
        return () => {
            clearInterval(interval);
        };
    }, []);

    const deliveryStatus = useMemo(() => {
        const hourNow = time.getHours();
        const minutesNow = time.getMinutes();
        const hourNowComplete = Number(`${hourNow}.${minutesNow}`);
        const deliveryLate: Order | undefined = orders.find(order => {
            const orderHour = Number(order.deliverytime.replace(':', '.'));
            return orderHour < hourNowComplete && order.status === 'pendente';
        });
        const nextDelivery: Order | undefined = orders.find(order => {
            const orderHour = Number(order.deliverytime.replace(':', '.'));
            return orderHour > hourNowComplete && order.status === 'pendente';
        });
        return { deliveryLate, nextDelivery };
    }, [orders, time]);

    const ordersSepareted = useMemo(() => {
        return ordersFilter.filter(order => order.status === orderStatus);
    }, [ordersFilter, orderStatus]);

    const totalSells = useMemo(() => {
        return formatPrice(
            ordersSepareted.reduce((sumTotal, order) => {
                return sumTotal + order.total;
            }, 0),
        );
    }, [ordersSepareted]);

    async function handleCreateUser() {
        try {
            await createUserWithEmail('molusko.rp@hotmail.com', '123456');
        } catch (err: any) {
            const error = errorResolverFirebase(err);
            alert(error);
        }
    }

    async function handleLogin() {
        try {
            await loginWithEmail('moluskorp@hotmail.com', '123123');
        } catch (err: any) {
            const error = errorResolverFirebase(err);
            alert(error);
        }
    }

    const handleDeleteOrder = useCallback(
        async (id: string) => {
            try {
                await deleteOrder(id);
                const newOrders = orders.filter(order => order.id !== id);
                setOrders(newOrders);
            } catch (err: any) {
                const error = errorResolverFirebase(err);
                alert(error);
            }
        },
        [orders, deleteOrder],
    );

    return (
        <>
            <Header />
            <Nav>
                <Container style={{ flexDirection: 'row' }}>
                    <Flex
                        style={{
                            width: '41.875rem',
                            height: '100%',
                            flexDirection: 'column',
                        }}
                    >
                        <h1>Oi, Molusko</h1>
                        <Flex
                            style={{
                                width: '100%',
                                justifyContent: 'space-between',
                            }}
                        />
                        <Flex style={{ marginTop: '1rem' }}>
                            <h3>Entregas do dia</h3>
                        </Flex>
                        <Flex
                            style={{
                                marginTop: '0.5rem',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Flex>
                                <Pendentes
                                    orderStatus={orderStatus}
                                    onClick={() => {
                                        setOrderStatus('pendente');
                                    }}
                                >
                                    Pendentes
                                </Pendentes>
                                <Flex style={{ width: '2rem' }} />
                                <Completas
                                    orderStatus={orderStatus}
                                    onClick={() => {
                                        setOrderStatus('completo');
                                    }}
                                >
                                    Completas
                                </Completas>
                            </Flex>
                            <Input
                                name="search"
                                placeholder="Pesquisar"
                                value={searchInput}
                                onChange={e => {
                                    setSearchInput(e.target.value);
                                }}
                            />
                        </Flex>
                        <Flex style={{ marginTop: '0.5rem' }}>
                            <Divider
                                style={{ width: '9rem' }}
                                selected={orderStatus === 'pendente' && true}
                            />
                            <Divider
                                style={{ width: '9rem' }}
                                selected={orderStatus === 'completo' && true}
                            />
                            <Divider />
                        </Flex>
                        <ScrollArea style={{ width: '100%', height: '77%' }}>
                            {ordersSepareted.map(order => (
                                <React.Fragment key={order.id}>
                                    <DialogOrderDetails
                                        onDelete={(id: string) => {
                                            handleDeleteOrder(id);
                                        }}
                                        ref={modalRef}
                                        order={order}
                                    >
                                        <ContainerOrders
                                            onClick={() => {
                                                modalRef.current?.setOrder(
                                                    order,
                                                );
                                                modalRef.current?.openModal();
                                            }}
                                        >
                                            <Flex
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <h4>{order.client.name}</h4>
                                                <Flex
                                                    style={{
                                                        marginTop: '0.5rem',
                                                    }}
                                                >
                                                    <p>
                                                        {
                                                            order.deliveryTypeFormatted
                                                        }
                                                    </p>
                                                    <p
                                                        style={{
                                                            marginLeft: '1rem',
                                                        }}
                                                    >
                                                        {
                                                            order.deliveryDateFormatted
                                                        }
                                                    </p>
                                                    <p
                                                        style={{
                                                            marginLeft: '1rem',
                                                        }}
                                                    >
                                                        {order.deliverytime}
                                                    </p>
                                                </Flex>
                                            </Flex>

                                            <h1>{order.totalFormatted}</h1>
                                        </ContainerOrders>
                                    </DialogOrderDetails>
                                </React.Fragment>
                            ))}
                        </ScrollArea>
                        <h2
                            style={{
                                marginTop: '1rem',
                                marginLeft: 'auto',
                            }}
                        >
                            Total: {totalSells}
                        </h2>
                    </Flex>
                    <Flex
                        style={{
                            width: '29.25rem',
                            height: '100%',
                            marginLeft: '1rem',
                            flexDirection: 'column',
                        }}
                    >
                        <DeliveryCard
                            type="late"
                            deliveryStatus={deliveryStatus.deliveryLate}
                            onClick={() => {
                                if (deliveryStatus.deliveryLate) {
                                    modalRef.current?.setOrder(
                                        deliveryStatus.deliveryLate,
                                    );
                                    modalRef.current?.openModal();
                                }
                            }}
                        />
                        <DeliveryCard
                            type="next"
                            style={{ marginTop: '1.5rem' }}
                            deliveryStatus={deliveryStatus.nextDelivery}
                            onClick={() => {
                                if (deliveryStatus.nextDelivery) {
                                    modalRef.current?.setOrder(
                                        deliveryStatus.nextDelivery,
                                    );
                                    modalRef.current?.openModal();
                                }
                            }}
                        />
                        <Divider style={{ marginTop: '3rem' }} />
                        <Button
                            icon={deliveryIcon}
                            style={{ marginTop: '2.5rem' }}
                            onClick={() => {
                                navigate('../oi');
                            }}
                        >
                            Nova entrega
                        </Button>
                        <DialogSearchClient ref={modalClientRef} canCancel />
                        <Button
                            icon={clientIcon}
                            buttonType="secundary"
                            style={{ marginTop: '1.5rem' }}
                            onClick={() => {
                                modalClientRef.current?.openModal();
                            }}
                        >
                            Cadastro de Cliente
                        </Button>
                        <Button
                            icon={reportIcon}
                            buttonType="borderSecundary"
                            style={{ marginTop: '1.5rem' }}
                            onClick={() => {
                                navigate('../reports');
                            }}
                        >
                            Resumo de Vendas
                        </Button>
                        <Button
                            icon={logoutIcon}
                            buttonType="borderPrimary"
                            style={{ marginTop: '1.5rem' }}
                        >
                            Fazer LogOff
                        </Button>
                    </Flex>
                </Container>
            </Nav>
            <Footer />
        </>
    );
}
