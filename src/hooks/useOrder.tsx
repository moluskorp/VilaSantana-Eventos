import {
    endAt,
    equalTo,
    get,
    limitToFirst,
    onValue,
    orderByChild,
    query,
    ref,
    remove,
    set,
    startAt,
    update,
} from 'firebase/database';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { v4 as uuidV4 } from 'uuid';
import { database } from '../services/firebase';
import formatDateWithoutHoursUTC from '../util/formatDateWithoutHoursUTC';

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

type FirebaseOrder = Record<
    string,
    {
        id: string;
        client: Client;
        items: Item[];
        createdAt: Date;
        deliveryprice: number;
        deliveryDate: string;
        deliverytime: string;
        deliverytype: string;
        discount: number;
        money: boolean;
        total: number;
        card: boolean;
        pix: boolean;
        check: boolean;
        subTotal: number;
        status: 'pendente' | 'completo';
    }
>;

type Order = {
    id: string;
    client: Client;
    items: Item[];
    createdAt: Date;
    deliveryprice: number;
    deliveryDate: string;
    deliverytime: string;
    deliverytype: string;
    discount: number;
    money: boolean;
    total: number;
    card: boolean;
    pix: boolean;
    check: boolean;
    subTotal: number;
    status: 'pendente' | 'completo';
};

interface OrderProviderProps {
    children: ReactNode;
}

interface Payment {
    money: boolean;
    pix: boolean;
    card: boolean;
    check: boolean;
}

interface UpdateItemAmount {
    name: string;
    amount: number;
}

interface OrderContextData {
    order: Item[];
    addItem: ({ name, price, quantity }: Item) => boolean;
    removeItem: (name: string) => void;
    updateItemAmount: ({ name, amount }: UpdateItemAmount) => void;
    total: number;
    setDiscount: (discount: number) => void;
    setDelivery: (discount: number) => void;
    delivery: number;
    discount: number;
    subTotal: number;
    saveOrderOnDb: (
        client: Client,
        deliverydate: Date,
        deliverytime: string,
        { money, card, pix, check }: Payment,
        deliverytype: 'entrega' | 'retirada',
        status: 'pendente' | 'completo',
    ) => Promise<void>;
    updateOrderOnDb: (
        id: string,
        client: Client,
        deliverydate: Date,
        deliverytime: string,
        { money, card, pix, check }: Payment,
        deliverytype: 'entrega' | 'retirada',
        status: 'pendente' | 'completo',
    ) => Promise<void>;
    getListFromDate: (date: Date) => Promise<Order[]>;
    getListBetweenDates: (data: any) => Order[];
    deleteOrder: (id: string) => Promise<void>;
    updateOrderOnDbWithOrder: (order: Order) => Promise<void>;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps): JSX.Element {
    const [discount, setDiscount] = useState(0);
    const [delivery, setDelivery] = useState(0);
    const [order, setOrder] = useState<Item[]>([
        {
            name: 'Cento de Salgado',
            price: 10.9,
            quantity: 2,
        },
        {
            name: 'Coca Cola',
            price: 7,
            quantity: 5,
        },
    ]);

    const subTotal = useMemo(() => {
        return order.reduce((sumTotal, item) => {
            const subTotalReduce = item.quantity * item.price;
            return sumTotal + subTotalReduce;
        }, 0);
    }, [order]);

    const total = useMemo(() => {
        return subTotal - discount + delivery;
    }, [discount, delivery, subTotal]);

    const addItem = useMemo(
        () =>
            ({ name, price, quantity }: Item) => {
                const updatedOrder = [...order];
                const productExists = updatedOrder.find(
                    product => product.name === name,
                );

                if (productExists) {
                    alert('Produto já na listagem');
                    return false;
                }
                updatedOrder.push({
                    name,
                    price,
                    quantity,
                });

                setOrder(updatedOrder);
                return true;
            },
        [order],
    );

    const removeItem = useMemo(
        () => (name: string) => {
            const updatedOrder = [...order];

            const productIndex = updatedOrder.findIndex(
                product => product.name === name,
            );

            if (productIndex >= 0) {
                updatedOrder.splice(productIndex, 1);
                setOrder(updatedOrder);
            }
        },
        [order],
    );

    const updateItemAmount = useMemo(
        () =>
            ({ name, amount }: UpdateItemAmount) => {
                if (amount < 0) {
                    return;
                }

                const updatedOrder = [...order];

                const productExists = updatedOrder.find(
                    product => product.name === name,
                );

                if (productExists) {
                    productExists.quantity = amount;
                    setOrder(updatedOrder);
                }
            },
        [order],
    );

    const saveOrderOnDb = useCallback(
        async (
            client: Client,
            deliverydate: Date,
            deliverytime: string,
            { money, card, pix, check }: Payment,
            deliverytype: 'entrega' | 'retirada',
        ) => {
            const id = uuidV4();
            await set(ref(database, `orders/${id}`), {
                createdAt: formatDateWithoutHoursUTC(new Date()),
                client,
                items: order,
                deliveryprice: delivery,
                deliveryDate: formatDateWithoutHoursUTC(deliverydate),
                deliverytime,
                deliverytype,
                discount,
                money,
                total,
                card,
                pix,
                check,
                subTotal,
                status: 'pendente',
            });
        },
        [delivery, discount, total, subTotal, order],
    );

    const updateOrderOnDb = useCallback(
        async (
            id: string,
            client: Client,
            deliverydate: Date,
            deliverytime: string,
            { money, card, pix, check }: Payment,
            deliverytype: 'entrega' | 'retirada',
            status: 'pendente' | 'completo',
        ) => {
            await update(ref(database, `orders/${id}`), {
                createdAt: formatDateWithoutHoursUTC(new Date()),
                client,
                items: order,
                deliveryprice: delivery,
                deliveryDate: formatDateWithoutHoursUTC(deliverydate),
                deliverytime,
                deliverytype,
                discount,
                money,
                total,
                card,
                pix,
                check,
                subTotal,
                status,
            });
        },
        [delivery, discount, total, subTotal, order],
    );

    const updateOrderOnDbWithOrder = useCallback(async (updateOrder: Order) => {
        try {
            await update(ref(database, `orders/${updateOrder.id}`), {
                createdAt: updateOrder.createdAt,
                client: updateOrder.client,
                items: updateOrder.items,
                deliveryprice: updateOrder.deliveryprice,
                deliveryDate: updateOrder.deliveryDate,
                deliverytime: updateOrder.deliverytime,
                deliverytype: updateOrder.deliverytype,
                discount: updateOrder.discount,
                money: updateOrder.money,
                total: updateOrder.total,
                card: updateOrder.card,
                pix: updateOrder.pix,
                check: updateOrder.check,
                subTotal: updateOrder.subTotal,
                status: updateOrder.status,
            });
        } catch (err: any) {
            console.log(err.message);
        }
    }, []);

    const getListFromDate = useCallback(async (date: Date) => {
        try {
            const dbRefQ = query(
                ref(database, 'orders'),
                orderByChild('deliveryDate'),
                equalTo(formatDateWithoutHoursUTC(date)),
            );

            const resultFirebase = await get(dbRefQ);

            const result: FirebaseOrder = resultFirebase.val();

            const parsedOrders = Object.entries(result).map(([key, value]) => {
                return {
                    id: key,
                    client: value.client,
                    items: value.items,
                    createdAt: value.createdAt,
                    deliveryprice: value.deliveryprice,
                    deliveryDate: value.deliveryDate,
                    deliverytime: value.deliverytime,
                    deliverytype: value.deliverytype,
                    discount: value.discount,
                    money: value.money,
                    total: value.total,
                    card: value.card,
                    pix: value.pix,
                    check: value.check,
                    subTotal: value.subTotal,
                    status: value.status,
                };
            });
            return parsedOrders;
        } catch (err: any) {
            console.log(err.message);
        }
        return {} as Order[];
    }, []);

    // const getListBetweenDates = useCallback(async (start: Date, end: Date) => {
    //     const dbRefQ = query(
    //         ref(database, 'orders'),
    //         orderByChild('deliveryDate'),
    //         startAt(formatDateWithoutHoursUTC(start)),
    //         endAt(formatDateWithoutHoursUTC(end)),
    //     );

    //     const resultFirebase = await get(dbRefQ);

    //     const result: FirebaseOrder = resultFirebase.val();

    //     const parsedOrders = Object.entries(result).map(([key, value]) => {
    //         return {
    //             id: key,
    //             client: value.client,
    //             items: value.items,
    //             createdAt: value.createdAt,
    //             deliveryprice: value.deliveryprice,
    //             deliveryDate: value.deliveryDate,
    //             deliverytime: value.deliverytime,
    //             deliverytype: value.deliverytype,
    //             discount: value.discount,
    //             money: value.money,
    //             total: value.total,
    //             card: value.card,
    //             pix: value.pix,
    //             check: value.check,
    //             subTotal: value.subTotal,
    //         };
    //     });
    //     return parsedOrders;
    // }, []);

    const getListBetweenDates = useCallback((data: any) => {
        const result: FirebaseOrder = data;

        const parsedOrders = Object.entries(result).map(([key, value]) => {
            return {
                id: key,
                client: value.client,
                items: value.items,
                createdAt: value.createdAt,
                deliveryprice: value.deliveryprice,
                deliveryDate: value.deliveryDate,
                deliverytime: value.deliverytime,
                deliverytype: value.deliverytype,
                discount: value.discount,
                money: value.money,
                total: value.total,
                card: value.card,
                pix: value.pix,
                check: value.check,
                subTotal: value.subTotal,
                status: value.status,
            };
        });

        return parsedOrders;
    }, []);

    const deleteOrder = useCallback(async (id: string) => {
        await remove(ref(database, `orders/${id}`));
    }, []);

    const value = useMemo(
        () => ({
            removeItem,
            addItem,
            updateItemAmount,
            order,
            total,
            setDiscount,
            setDelivery,
            delivery,
            discount,
            subTotal,
            saveOrderOnDb,
            getListFromDate,
            getListBetweenDates,
            deleteOrder,
            updateOrderOnDb,
            setOrder,
            updateOrderOnDbWithOrder,
        }),
        [
            removeItem,
            addItem,
            updateItemAmount,
            order,
            total,
            delivery,
            discount,
            subTotal,
            saveOrderOnDb,
            getListFromDate,
            getListBetweenDates,
            deleteOrder,
            updateOrderOnDb,
            updateOrderOnDbWithOrder,
        ],
    );

    return (
        <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
    );
}
export function useOrder(): OrderContextData {
    const context = useContext(OrderContext);

    return context;
}
