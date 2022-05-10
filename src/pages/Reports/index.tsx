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
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    endAt,
    get,
    orderByChild,
    query,
    ref,
    startAt,
} from 'firebase/database';
import { getDaysInMonth, eachDayOfInterval, Interval } from 'date-fns';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Container, Flex, Nav, Paragraph, Title } from './style';
import { database } from '../../services/firebase';
import { useOrder } from '../../hooks/useOrder';
import Input from '../../components/Input';
import DateInput from '../../components/DateInput';
import formatDateWithoutHoursUTC from '../../util/formatDateWithoutHoursUTC';
import SellsReport from '../../reports/SellsReport';
import formatDate from '../../util/formatDate';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TitleJS,
    Tooltip,
    Legend,
);

interface Item {
    name: string;
    price: number;
    quantity: number;
}

type Client = {
    id: string;
    cpf: string;
    name: string;
    whatsapp: string;
    address: Address;
};

type Address = {
    street: string;
    number: string;
    district: string;
    complement: string;
    city: string;
    postalcode: string;
};

type Order = {
    id: string;
    client: Client;
    items: Item[];
    createdAt: Date;
    deliveryprice: number;
    deliveryDate: string;
    deliverytime: string;
    deliverytype: string;
    discount: number;
    money: boolean;
    total: number;
    card: boolean;
    pix: boolean;
    check: boolean;
    subTotal: number;
    status: 'pendente' | 'completo';
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

function getData(dado: Map<any, any>) {
    const test = [] as number[];
    dado.forEach((value, index) => {
        test[index - 1] = value;
    });
    return test;
}

export default function Reports() {
    const [initialDate, setInitialDate] = useState<Date>(new Date());
    const [finalDate, setFinalDate] = useState<Date>(new Date());
    const { getListBetweenDates } = useOrder();
    const [orders, setOrders] = useState<Order[]>();

    const daysSells = useMemo(() => {
        const days = new Map();
        orders?.forEach(order => {
            const day = new Date(`${order.deliveryDate} 03:00:00`).toString();
            const total =
                (!days.get(day) ? 0 : Number(days.get(day))) +
                Number(order.total);
            days.set(day, total);
        });
        return days;
    }, [orders]);

    const data2 = getData(daysSells);

    const interval = useMemo(() => {
        return { start: initialDate, end: finalDate } as Interval;
    }, [initialDate, finalDate]);

    const eachDaysInInterval = useMemo(() => {
        return eachDayOfInterval(interval);
    }, [interval]);

    const labels = useMemo(() => {
        const days = [] as number[];
        for (let index = 0; index < eachDaysInInterval.length; index++) {
            days[index] = eachDaysInInterval[index].getDate();
        }
        return days;
    }, [eachDaysInInterval]);

    const dataSells = useMemo(() => {
        const test = [] as Date[];
        const newArray = eachDaysInInterval.map(day => {
            return new Date(day.setHours(3)).toString();
        });
        daysSells.forEach((value, key) => {
            const date = new Date(key).toString();
            const index = newArray.indexOf(date);
            test[index] = value;
        });
        return test;
    }, [daysSells, eachDaysInInterval]);

    const data = useMemo(() => {
        return {
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
    }, [labels, dataSells]);

    const initialDateFormatted = useMemo(() => {
        return formatDate(initialDate);
    }, [initialDate]);

    const finalDateFormatted = useMemo(() => {
        return formatDate(finalDate);
    }, [finalDate]);

    useEffect(() => {
        const initial = formatDateWithoutHoursUTC(initialDate);
        const final = formatDateWithoutHoursUTC(finalDate);
        const dbRef = query(
            ref(database, 'orders'),
            orderByChild('deliveryDate'),
            startAt(initial),
            endAt(final),
        );

        get(dbRef).then(result => {
            const list = getListBetweenDates(result.val());

            setOrders(list);
        });
    }, [initialDate, finalDate]);

    const handlePrint = useCallback(() => {
        if (!orders) {
            alert('Nenhuma venda encontrada');
            return;
        }
        SellsReport(orders, initialDateFormatted, finalDateFormatted);
    }, [orders]);

    return (
        <Nav>
            <>
                <Header />
                <Container>
                    <Title>Vendas</Title>
                    <Paragraph>Selecione o período</Paragraph>
                    <Flex>
                        <DateInput
                            label="Data Início"
                            name="date"
                            onChange={e => {
                                setInitialDate(e);
                            }}
                        />
                        <DateInput
                            label="Data Final"
                            name="dateFinal"
                            onChange={e => {
                                setFinalDate(e);
                            }}
                        />
                    </Flex>
                    <Line options={options} data={data} />
                </Container>
                <button type="button" onClick={handlePrint}>
                    Clique
                </button>
                {/* {orders?.map(order => (
                    <p key={order.id}>
                        {order.deliveryDate} - {order.client.name}
                    </p>
                ))} */}
                <Footer />
            </>
        </Nav>
    );
}
