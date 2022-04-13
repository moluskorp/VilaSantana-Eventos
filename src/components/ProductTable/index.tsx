import { useCallback, useMemo, useState } from 'react';
import {
    DescriptionContent,
    DescriptionHeader,
    Flex,
    Nav,
    PriceContent,
    PriceHeader,
    QuantityContent,
    QuantityHeader,
    RemoveContent,
    RemoveHeader,
    TotalContent,
    TotalHeader,
    TrashIcon,
} from './style';

interface ProductTableProps {
    items: Item[];
    setItems: (item: Item[]) => Promise<void>;
    status: 'pendente' | 'completo';
}

type Item = {
    name: string;
    quantity: number;
    priceFormatted: string;
    price: number;
    total: string;
};

export default function ProductTable({
    items,
    setItems,
    status,
}: ProductTableProps) {
    const handleDeleteItem = useCallback(
        (name: string) => {
            const newItems = items.filter(item => item.name !== name);
            setItems(newItems);
        },
        [items, setItems],
    );
    const removeDisabled = useMemo(() => status !== 'pendente', [status]);

    return (
        <Nav>
            <Flex>
                <DescriptionHeader>
                    <p>Descrição</p>
                </DescriptionHeader>
                <QuantityHeader>
                    <p>QTD</p>
                </QuantityHeader>
                <PriceHeader>
                    <p>Preço UN</p>
                </PriceHeader>
                <TotalHeader>
                    <p>Total</p>
                </TotalHeader>
                <RemoveHeader>
                    <p>Excluir</p>
                </RemoveHeader>
            </Flex>

            {items.map(item => (
                <Flex>
                    <DescriptionContent>
                        <p>{item.name}</p>
                    </DescriptionContent>
                    <QuantityContent>
                        <p>{item.quantity}</p>
                    </QuantityContent>
                    <PriceContent>
                        <p>{item.priceFormatted}</p>
                    </PriceContent>
                    <TotalContent>
                        <p>{item.total}</p>
                    </TotalContent>
                    <RemoveContent>
                        <TrashIcon
                            disabled={removeDisabled}
                            onClick={() => {
                                handleDeleteItem(item.name);
                            }}
                        />
                    </RemoveContent>
                </Flex>
            ))}
        </Nav>
    );
}
