import { useCallback, useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayPickerProps } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FieldError } from 'react-hook-form';
import formatDate from '../../util/formatDate';
import { Container, ContainerInput, Nav } from './style';

interface DateInputProps extends DayPickerProps {
    name: string;
    label?: string;
    error?: FieldError;
    containerStyle?: object;
    onChange: (e: Date) => void;
}

export default function DateInput({
    name,
    label,
    error,
    containerStyle = {},
    onChange,
}: DateInputProps): JSX.Element {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

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
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            >
                <ContainerInput isInvalid={!!error} isFocused={isFocused}>
                    <DayPickerInput
                        formatDate={formatDateInput}
                        format="dd/MM/yyyy"
                        placeholder={`${formatDate(new Date())}`}
                        dayPickerProps={{
                            weekdaysShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
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
                        onDayChange={onChange}
                    />
                </ContainerInput>
            </Container>
        </Nav>
    );
}
