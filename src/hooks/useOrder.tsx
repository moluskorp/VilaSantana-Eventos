import { ref, set } from 'firebase/database';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { database } from '../services/firebase';

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
    ) => Promise<void>;
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
            await set(ref(database, `orders/`), {
                createdAt: new Date(),
                client,
                items: order,
                deliveryprice: delivery,
                deliverydate,
                deliverytime,
                deliverytype,
                discount,
                money,
                total,
                card,
                pix,
                check,
                subTotal,
            });
        },
        [delivery, discount, total, subTotal, order],
    );

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
