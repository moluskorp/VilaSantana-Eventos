import { InputHTMLAttributes, useCallback, useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FieldError } from 'react-hook-form';
import { Container, ErrorMessage, ContainerInput, Nav, Flex } from './style';
import formatDate from '../../util/formatDate';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    error?: FieldError;
    type?: 'currency' | 'normal' | 'integer' | 'float' | 'date';
    containerStyle?: object;
    setFocus: (input: string) => void;
    register: (field: string) => void;
}

export default function InputOrder({
    name,
    label,
    error,
    containerStyle = {},
    type = 'normal',
    register,
    setFocus,
    ...rest
}: InputProps): JSX.Element {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    function handleInputClick() {
        setFocus(name);
    }

    function handleInputNumber(event) {
        const { value } = event.target;
        if (type === 'integer') {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        } else if (type === 'currency' || type === 'float') {
            if (!/[0-9]|,/.test(event.key)) {
                event.preventDefault();
            }
            const havePoint = value.indexOf(',');
            if (havePoint > 0) {
                if (event.key === ',') {
                    event.preventDefault();
                }
            }
        }
    }

    function formatDateInput(date: Date, format: string, locale: string) {
        console.log(date);
        console.log(format);
        console.log(locale);
        return formatDate(date);
    }

    return (
        <Nav>
            <span>{label}</span>
            <Container
                style={containerStyle}
                isInvalid={!!error}
                isFocused={isFocused}
                key={name}
                onClick={handleInputClick}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            >
                <ContainerInput isInvalid={!!error} isFocused={isFocused}>
                    {type === 'currency' && <span>R$</span>}
                    {type !== 'date' ? (
                        <input
                            name={name}
                            {...register(name)}
                            onKeyPress={event => {
                                handleInputNumber(event);
                            }}
                            {...rest}
                        />
                    ) : (
                        <DayPickerInput
                            formatDate={formatDateInput}
                            format="dd/MM/yyyy"
                            placeholder={`${formatDate(new Date())}`}
                            dayPickerProps={{
                                weekdaysShort: [
                                    'D',
                                    'S',
                                    'T',
                                    'Q',
                                    'Q',
                                    'S',
                                    'S',
                                ],
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
                        />
                    )}
                </ContainerInput>
            </Container>
            {!!error && <ErrorMessage>{error.message}</ErrorMessage>}
        </Nav>
    );
}
