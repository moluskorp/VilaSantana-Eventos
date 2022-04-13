import {
    equalTo,
    off,
    onValue,
    orderByChild,
    query,
    ref,
} from 'firebase/database';
import React, {
    createRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import {
    DialogOrderDetails,
    ModalHandles,
} from '../../components/DialogOrderDetails';
import Divider from '../../components/Divider';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Input from '../../components/Input';
import InputOrder from '../../components/InputOrder';
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

type Order = {
    id: string;
    client: Client;
    items: Item[];
    createdAt: Date;
    deliveryprice: number;
    deliveryDate: string;
    deliverytime: string;
    deliverytype: string;
    deliveryTypeFormatted: string;
    discount: number;
    money: boolean;
    total: number;
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
    const { createUserWithEmail, loginWithEmail } = useAuth();
    const { getListFromDate, getListBetweenDates, deleteOrder } = useOrder();
    const [orders, setOrders] = useState<Order[]>([] as Order[]);
    const [ordersFilter, setOrdersFilter] = useState<Order[]>(orders);
    const [searchInput, setSearchInput] = useState('');
    const modalRef = useRef<ModalHandles>(null);
    const orderRef = query(
        ref(database, 'orders'),
        orderByChild('createdAt'),
        equalTo(formatDateWithoutHoursUTC(new Date())),
    );
    const [orderStatus, setOrderStatus] = useState<'pendente' | 'completo'>(
        'pendente',
    );
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
                return {
                    ...order,
                    deliveryTypeFormatted:
                        order.deliverytype[0].toUpperCase() +
                        order.deliverytype.substring(1),
                };
            });
            setOrders(formattedOrder);
        });
    }, []);

    // useEffect(() => {
    //     // getListBetweenDates(
    //     //     new Date('2022-03-21 03:00'),
    //     //     new Date('2022-03-24 03:00'),
    //     // )
    //     //     .then(result => {
    //     //         if (result) {
    //     //             setOrders(result);
    //     //         }
    //     //     })
    //     //     .catch(err => {
    //     //         const error = errorResolverFirebase(err);
    //     //         alert(error);
    //     //     });
    // }, [getListFromDate, getListBetweenDates]);

    const ordersFormatted = useMemo(() => {
        return ordersFilter.map(order => {
            const dateString = order.deliveryDate.toString();
            const date = dateString.concat(' 03:00');
            const deliveryDateDate = new Date(date);
            return {
                ...order,
                deliveryDateFormatted: formatDate(deliveryDateDate),
                totalFormatted: formatPrice(order.total),
            };
        });
    }, [ordersFilter]);

    const ordersSepareted = useMemo(() => {
        return ordersFormatted.filter(order => order.status === orderStatus);
    }, [ordersFormatted, orderStatus]);

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
                <Container>
                    <Flex
                        style={{
                            width: '670px',
                            flexDirection: 'column',
                        }}
                    >
                        <h1>Oi, Molusko</h1>
                        <Flex
                            style={{
                                marginTop: '1.5rem',
                                width: '100%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Link to="/oi">
                                <Button onClick={handleLogin}>
                                    Novo pedido
                                </Button>
                            </Link>
                            <Button onClick={handleCreateUser}>
                                Cadastro de Clientes
                            </Button>
                        </Flex>
                        {/* <Button onClick={handleLogin}>
                            Pedidos Realizados
                        </Button> */}
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
                                            modalRef.current?.setOrder(order);
                                            modalRef.current?.openModal();
                                        }}
                                    >
                                        <Flex
                                            style={{ flexDirection: 'column' }}
                                        >
                                            <h4>{order.client.name}</h4>
                                            <Flex
                                                style={{ marginTop: '0.5rem' }}
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
                        <h2 style={{ marginTop: '1rem', marginLeft: 'auto' }}>
                            Total: {totalSells}
                        </h2>
                    </Flex>
                </Container>
            </Nav>
            <Footer />
        </>
    );
}
