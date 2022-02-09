import { useCallback, useEffect, useMemo, useState } from 'react';
import { useOrder } from '../../hooks/useOrder';
import { formatPrice } from '../../util/format';
import {
    AddIcon,
    Container,
    Flex,
    Label,
    SubtractIcon,
    TrashIcon,
} from './style';

interface ProductOrderProps {
    name: string;
    price: number;
    priceFormatted: string;
    quantity: number;
}

export default function ProductOrder({
    name,
    price,
    quantity: quantityCreated,
    priceFormatted,
}: ProductOrderProps) {
    const [quantity, setQuantity] = useState(quantityCreated);
    const { updateItemAmount, removeItem } = useOrder();

    const total = useMemo(
        () => formatPrice(quantity * price),
        [quantity, price],
    );

    const handleAddQuantity = useCallback(() => {
        const amount = quantity + 1;
        updateItemAmount({ name, amount });
        setQuantity(amount);
    }, [name, quantity, updateItemAmount]);

    const handleRemoveQuantity = useCallback(() => {
        const amount = quantity - 1;
        updateItemAmount({ name, amount });
        setQuantity(amount);
    }, [name, quantity, updateItemAmount]);

    const handleRemoveItem = useCallback(() => {
        removeItem(name);
    }, [removeItem, name]);

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
                    <p>Valor:</p> <h4>{priceFormatted}</h4>
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
                    {total}
                </Label>
            </Flex>
        </Container>
    );
}
