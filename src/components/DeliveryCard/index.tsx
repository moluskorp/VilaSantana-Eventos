import {
    ButtonHTMLAttributes,
    HtmlHTMLAttributes,
    useMemo,
    useState,
} from 'react';
import { useOrder } from '../../hooks/useOrder';
import Button from '../Button';
import { Address, Container, Flex, Name, Time, Title } from './style';

interface AddressClient {
    number: string;
    street: string;
}

interface Client {
    address: AddressClient;
    name: string;
}

interface Delivery {
    client: Client;
    deliverytime: string;
    id: string;
}

interface DeliveryCardProps {
    type: 'late' | 'next';
    style?: object;
    deliveryStatus: Delivery | undefined;
    onClick?: () => void;
}

export default function DeliveryCard({
    type,
    style,
    deliveryStatus,
    onClick,
}: DeliveryCardProps) {
    const [hover, setHover] = useState(false);
    const { updateStatusOrderWithId } = useOrder();
    return (
        <div>
            {deliveryStatus ? (
                <Container
                    style={style}
                    type={type}
                    onMouseEnter={() => {
                        setHover(true);
                    }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                    hover={hover}
                    onClick={() => {
                        if (hover && onClick) {
                            onClick();
                        }
                    }}
                >
                    <Flex>
                        <Title>
                            {type === 'late'
                                ? 'Entrega Atrasada'
                                : 'Próxima Entrega'}
                        </Title>
                        <Name>{deliveryStatus?.client.name}</Name>
                        <Address>
                            {deliveryStatus?.client.address.street},{' '}
                            {deliveryStatus?.client.address.number}
                        </Address>
                    </Flex>
                    <Flex
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Time>{deliveryStatus?.deliverytime}</Time>
                        <Button
                            buttonType="outline"
                            style={{
                                marginTop: '1rem',
                                marginRight: '1.5rem',
                                border: '1px solid black',
                                padding: '0.5rem',
                            }}
                            onMouseEnter={() => {
                                setHover(false);
                            }}
                            onMouseLeave={() => {
                                setHover(true);
                            }}
                            onClick={() => {
                                updateStatusOrderWithId(
                                    deliveryStatus.id,
                                    'completo',
                                );
                            }}
                        >
                            Finalizar Pedido
                        </Button>
                    </Flex>
                </Container>
            ) : (
                <Container style={style} type={type} hover={false}>
                    <Flex
                        style={{
                            margin: '0 auto',
                        }}
                    >
                        <h1 style={{ margin: '0 auto' }}>
                            Nenhuma entrega {type === 'late' && 'Atrasada'}
                        </h1>
                    </Flex>
                </Container>
            )}
        </div>
    );
}
