import { useCallback } from 'react';
import { useClient } from '../../hooks/useClient';
import { Container, Cpf, Name } from './style';

type Client = {
    id: string;
    cpf: string;
    name: string;
    whatsapp: string;
    address: string;
    number: string;
    district: string;
    complement: string;
    city: string;
    postalcode: string;
};

interface ClientSearchDiv {
    client: Client;
}

export default function ClientSearchDiv({ client }: ClientSearchDiv) {
    const { changeClient } = useClient();

    const handleSelectClient = useCallback(() => {
        changeClient(client);
    }, [changeClient, client]);

    return (
        <Container onClick={handleSelectClient}>
            <Name>{client.name}</Name>
            <Cpf>{client.cpf}</Cpf>
        </Container>
    );
}
