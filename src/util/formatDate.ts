import { format } from 'date-fns';

export default function formatDate(date: Date) {
    const oi = format(date, 'dd/MM/yyyy');
    return oi;
}
