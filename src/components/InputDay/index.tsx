import { FieldError } from 'react-hook-form';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useCallback, useState } from 'react';
import formatDate from '../../util/formatDate';
import {
    Container,
    ErrorMessage,
    ContainerInput,
    Nav,
    Input,
    Flex,
} from './style';

interface InputDayProps {
    containerStyle?: object;
    name: string;
    label?: string;
    error?: FieldError;
    setSelectedDay: (value: Date) => void;
    selectedDay: string;
}

export default function InputDay({
    name,
    label,
    error,
    containerStyle = {},
    setSelectedDay,
    selectedDay,
    ...rest
}: InputDayProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    function handleInputClick() {
        // setFocus(name);
    }

    function formatDateInput(date: Date) {
        return formatDate(date);
    }

    return (
        <Nav>
            <label htmlFor={name}>{label}</label>
            <Container
                style={containerStyle}
                isInvalid={!!error}
                isFocused={isFocused}
                key={name}
                onClick={handleInputClick}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            >
                <Flex style={{ marginLeft: '0.5rem' }}>
                    <Input
                        formatDate={formatDateInput}
                        format="dd/MM/yyyy"
                        placeholder={`${formatDate(new Date())}`}
                        dayPickerProps={{
                            weekdaysShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                            fromMonth: new Date(),
                            months: [
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
                            ],
                        }}
                        onDayChange={day => setSelectedDay(day)}
                    />
                </Flex>
            </Container>
        </Nav>
    );
}
