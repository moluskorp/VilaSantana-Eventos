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
import useAuth from '../../hooks/useAuth';
import { useOrder } from '../../hooks/useOrder';
import errorResolverFirebase from '../../util/errorResolverFirebase';
import formatDate from '../../util/formatDate';
import { Container, ContainerOrders, Flex, Nav } from './style';

type Order = {
    id: string;
    client: Client;
    items: Item[];
    createdAt: Date;
    deliveryprice: number;
    deliveryDate: Date;
    deliverytime: string;
    deliverytype: string;
    discount: number;
    money: boolean;
    total: number;
    card: boolean;
    pix: boolean;
    check: boolean;
    subTotal: number;
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
    const { getListFromDate, getListBetweenDates } = useOrder();
    const [orders, setOrders] = useState<Order[]>([] as Order[]);
    const modalRef = useRef<ModalHandles>(null);

    useEffect(() => {
        getListBetweenDates(
            new Date('2022-03-21 03:00'),
            new Date('2022-03-24 03:00'),
        )
            .then(result => {
                if (result) {
                    setOrders(result);
                }
            })
            .catch(err => {
                const error = errorResolverFirebase(err);
                alert(error);
            });
    }, [getListFromDate, getListBetweenDates]);

    const totalSells = useMemo(() => {
        return orders.reduce((sumTotal, order) => {
            return sumTotal + order.total;
        }, 0);
    }, [orders]);

    const ordersFormatted = useMemo(() => {
        return orders.map(order => {
            const dateString = order.deliveryDate.toString();
            const date = dateString.concat(' 03:00');
            const deliveryDateDate = new Date(date);
            console.log(order);
            return {
                deliveryDateFormatted: formatDate(deliveryDateDate),
                ...order,
            };
        });
    }, [orders]);

    async function handleCreateUser() {
        try {
            await createUserWithEmail('molusko.rp@hotmail.com', '123456');
        } catch (err) {
            const error = errorResolverFirebase(err);
            alert(error);
        }
    }

    async function handleLogin() {
        try {
            await loginWithEmail('moluskorp@hotmail.com', '123123');
        } catch (err) {
            const error = errorResolverFirebase(err);
            alert(error);
        }
    }

    const handleDeleteOrder = useCallback(
        async (id: string) => {
            const newOrders = orders.filter(order => order.id !== id);
            setOrders(newOrders);
        },
        [orders],
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
                                <p>Pendentes</p>
                                <Flex style={{ width: '2rem' }} />
                                <p>Completas</p>
                            </Flex>
                            <p>Pesquisar</p>
                        </Flex>
                        <Flex style={{ marginTop: '0.5rem' }}>
                            <Divider style={{ width: '6rem' }} />
                            <Divider style={{ width: '7rem' }} />
                            <Divider />
                        </Flex>
                        {ordersFormatted.map(order => (
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
                                                <p>{order.deliverytype}</p>
                                                <p
                                                    style={{
                                                        marginLeft: '1rem',
                                                    }}
                                                >
                                                    {order.deliverytime}
                                                </p>
                                            </Flex>
                                        </Flex>

                                        <h1>R$ {order.total}</h1>
                                    </ContainerOrders>
                                </DialogOrderDetails>
                            </React.Fragment>
                        ))}
                        <h2 style={{ marginTop: '1rem', marginLeft: 'auto' }}>
                            Total: R$ {totalSells}
                        </h2>
                    </Flex>
                </Container>
            </Nav>
            <Footer />
        </>
    );
}
