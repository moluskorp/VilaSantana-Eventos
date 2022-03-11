import { HTMLAttributes } from 'react';
import { Container, Cpf, Name } from './style';

type Seller = {
    id: string;
    cpf: string;
    name: string;
    whatsapp: string;
};

interface SellerSearchDiv extends HTMLAttributes<HTMLDivElement> {
    seller: Seller;
}

export default function SellerSearchDiv({ seller, ...props }: SellerSearchDiv) {
    return (
        <Container {...props}>
            <Name>{seller.name}</Name>
            <Cpf>{seller.cpf}</Cpf>
        </Container>
    );
}
