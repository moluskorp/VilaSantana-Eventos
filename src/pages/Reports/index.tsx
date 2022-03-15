import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as TitleJS,
    Tooltip,
    Legend,
} from 'chart.js';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Container, Nav, Title } from './style';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TitleJS,
    Tooltip,
    Legend,
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Total da venda',
        },
    },
};

const labels = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

const dataSells = [
    4000, 7000, 5000, 6000, 2000, 4000, 5000, 8000, 6000, 4000, 5000, 7000,
];

const data = {
    labels,
    datasets: [
        {
            label: 'Total de vendas em R$',
            data: dataSells,
            borderColor: 'rgb(40,99,132)',
            backgroundColor: 'rgba(55, 99, 132, 0.5)',
        },
    ],
};

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
                    <Line options={options} data={data} />
                </Container>
                <Footer />
            </>
        </Nav>
    );
}
