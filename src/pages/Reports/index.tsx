import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Container, Nav, Title } from './style';

export default function Reports() {
    return (
        <Nav>
            <>
                <Header />
                <Container>
                    <Title>Relatórios</Title>
                    <Button style={{ height: '3rem', marginTop: '1rem' }}>
                        Vendas da semana
                    </Button>
                    <Button style={{ height: '3rem', marginTop: '1rem' }}>
                        Vendas do dia
                    </Button>
                    <Button style={{ height: '3rem', marginTop: '1rem' }}>
                        Vendas por período
                    </Button>
                </Container>
                <Footer />
            </>
        </Nav>
    );
}
