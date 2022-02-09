import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface Item {
    name: string;
    price: number;
    quantity: number;
}

interface OrderProviderProps {
    children: ReactNode;
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

    const total = useMemo(() => {
        const subTotal = order.reduce((sumTotal, item) => {
            const subTotalReduce = item.quantity * item.price;
            return sumTotal + subTotalReduce;
        }, 0);
        return subTotal - discount + delivery;
    }, [order, discount, delivery]);

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
        }),
        [
            removeItem,
            addItem,
            updateItemAmount,
            order,
            total,
            delivery,
            discount,
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
