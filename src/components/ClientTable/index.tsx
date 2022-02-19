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
    Row,
} from './style';

const listClient = [
    {
        name: 'Carlos Cesar Baratella Junior',
        address: 'Trav. Schibuola',
        number: '171',
        district: 'Campos Eliseos',
        whatsapp: '(16) 99604 - 0016',
    },
    {
        name: 'Neusa Ribeiro Baratella',
        address: 'Trav. Schibuola',
        number: '188',
        district: 'Campos Eliseos',
        whatsapp: '(16) 99604 - 1234',
    },
    {
        name: 'Carlos Cesar Baratella',
        address: 'Trav. Schibuola',
        number: '239',
        district: 'Campos Eliseos',
        whatsapp: '(16) 99604 - 1478',
    },
];

export default function ClientTable() {
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
            {listClient.map(client => (
                <Row
                    key={client.name}
                    style={{
                        flexDirection: 'row',
                        marginTop: '0.5rem',
                    }}
                    onClick={() => {
                        console.log(`Clicou em ${client.name}`);
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
        </Container>
    );
}
