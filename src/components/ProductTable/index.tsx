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
}

type Item = {
    name: string;
    quantity: number;
    priceFormatted: string;
    total: string;
};

export default function ProductTable({ items }: ProductTableProps) {
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
                        <TrashIcon />
                    </RemoveContent>
                </Flex>
            ))}
        </Nav>
    );
}
