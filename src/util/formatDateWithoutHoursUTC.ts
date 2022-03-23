import { format } from 'date-fns';

export default function formatDateWithoutHoursUTC(date: Date) {
    return format(date, 'yyyy-MM-dd');
}
