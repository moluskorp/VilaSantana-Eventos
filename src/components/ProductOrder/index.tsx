import { useCallback, useMemo, useState } from 'react';
import {
    AddIcon,
    Container,
    Flex,
    Label,
    SubtractIcon,
    TrashIcon,
} from './style';

interface Item {
    name: string;
    price: number;
    quantity: number;
}

interface ProductOrderProps {
    name: string;
    price: number;
    quantity: number;
    itens: Item[];
    setItens: (item: Item[]) => void;
}

export default function ProductOrder({
    name,
    price,
    quantity: quantityCreated,
    itens,
    setItens,
}: ProductOrderProps) {
    const [quantity, setQuantity] = useState(quantityCreated);

    const total = useMemo(() => quantity * price, [quantity, price]);

    const handleAddQuantity = useCallback(() => {
        setQuantity(quantity + 1);
    }, [quantity]);

    const handleRemoveQuantity = useCallback(() => {
        setQuantity(quantity - 1);
    }, [quantity]);

    const handleRemoveItem = useCallback(() => {
        const newItens = itens.filter(item => item.name !== name);
        setItens(newItens);
    }, [setItens, itens, name]);

    return (
        <Container>
            <Flex
                style={{
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                }}
            >
                <h3>{name}</h3>
                <TrashIcon onClick={handleRemoveItem} />
            </Flex>
            <Flex
                style={{
                    justifyContent: 'space-between',
                    marginTop: '0.25rem',
                }}
            >
                <Flex>
                    <p>Valor:</p> <h4>R${price}</h4>
                </Flex>
                <Flex>
                    <p>Qtd:</p> <h4>{quantity}</h4>
                    <Flex style={{ marginLeft: '0.5rem' }}>
                        <SubtractIcon onClick={handleRemoveQuantity} />
                        <AddIcon onClick={handleAddQuantity} />
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                style={{
                    justifyContent: 'space-between',
                    marginTop: '0.25rem',
                }}
            >
                <Label style={{ fontSize: '24px' }}>Total:</Label>
                <Label
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textAlign: 'right',
                    }}
                >
                    R$ {total}
                </Label>
            </Flex>
        </Container>
    );
}
