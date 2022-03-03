import { useCallback, useEffect, useMemo, useState } from 'react';
import { useClient } from '../../hooks/useClient';
import Divider from '../Divider';
import {
    Container,
    DivAddress,
    DivDistrict,
    DivName,
    DivNumber,
    DivWhats,
    Flex,
    Label,
    LabelHeader,
    Name,
    Next,
    Previous,
    Row,
} from './style';

type Pagination = {
    firstClient: string;
    lastClient: string;
    action: 'next' | 'previous' | '';
};

type Client = {
    id: string;
    name: string;
    address: string;
    number: string;
    district: string;
    whatsapp: string;
    cpf: string;
    complement: string;
    city: string;
    postalcode: string;
};

type ClientTableProps = {
    clients: Client[];
};

export default function ClientTable({ clients }: ClientTableProps) {
    const { changeClient, selectClientListOnDb, selectClientListByNameOnDb } =
        useClient();
    // const [clients, setClients] = useState<Client[]>();
    const [pagination, setPagination] = useState<Pagination>({} as Pagination);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log('Clients: ');
        console.log(clients);
    }, [clients]);

    const nextButtonDisabled = useMemo(() => {
        if (clients) {
            return clients?.length <= 9;
        }
        return false;
    }, [clients]);

    const previousButtonDisabled = useMemo(() => {
        return page === 1;
    }, [page]);

    const handleSelectClient = useCallback(
        (client: Client) => {
            changeClient(client);
        },
        [changeClient],
    );

    const handleNextPage = useCallback(() => {
        if (clients) {
            setPagination({
                firstClient: clients[0].id,
                lastClient: clients[clients.length - 1].id,
                action: 'next',
            });
            setPage(page + 1);
        }
    }, [clients, page]);

    const handlePreviousPage = useCallback(() => {
        if (clients) {
            setPagination({
                firstClient: clients[0].id,
                lastClient: clients[clients.length - 1].id,
                action: 'previous',
            });
            setPage(page - 1);
        }
    }, [clients, page]);

    return (
        <Container>
            <Flex
                style={{
                    flexDirection: 'row',
                }}
            >
                <DivName>
                    <LabelHeader>Nome</LabelHeader>
                </DivName>
                <DivAddress>
                    <LabelHeader>Endereço</LabelHeader>
                </DivAddress>
                <DivNumber>
                    <LabelHeader>Número</LabelHeader>
                </DivNumber>
                <DivDistrict>
                    <LabelHeader>Bairro</LabelHeader>
                </DivDistrict>
                <DivWhats>
                    <LabelHeader>WhatsApp</LabelHeader>
                </DivWhats>
            </Flex>
            <Divider style={{ marginTop: '0.5rem' }} />
            {clients?.map(client => (
                <Row
                    key={client.name}
                    style={{
                        flexDirection: 'row',
                        marginTop: '0.5rem',
                    }}
                    onClick={() => {
                        handleSelectClient(client);
                    }}
                >
                    <DivName>
                        <Name>{client.name}</Name>
                    </DivName>
                    <DivAddress>
                        <Label>{client.address}</Label>
                    </DivAddress>
                    <DivNumber>
                        <Label>{client.number}</Label>
                    </DivNumber>
                    <DivDistrict>
                        <Label>{client.district}</Label>
                    </DivDistrict>
                    <DivWhats>
                        <Label>{client.whatsapp}</Label>
                    </DivWhats>
                </Row>
            ))}
            <Divider style={{ marginTop: '0.5rem' }} />
            <Flex
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '1rem',
                }}
            >
                <Previous
                    disabled={previousButtonDisabled}
                    onClick={handlePreviousPage}
                />
                <Next disabled={nextButtonDisabled} onClick={handleNextPage} />
            </Flex>
        </Container>
    );
}
