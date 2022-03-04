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
    type?:
        | 'currency'
        | 'normal'
        | 'integer'
        | 'float'
        | 'date'
        | 'time'
        | 'telephone'
        | 'postalcode'
        | 'password'
        | 'email';
    containerStyle?: object;
}

export default function Input({
    name,
    label,
    error,
    containerStyle = {},
    type = 'normal',
    ...rest
}: InputProps): JSX.Element {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputNumber = useCallback(
        (event: {
            target: HTMLInputElement;
            key: string;
            preventDefault: () => void;
            currentTarget: {
                maxLength: number;
            };
        }) => {
            let { value } = event.target;
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
            } else if (type === 'time') {
                event.target.maxLength = 5;
                const notANumber = event.key.search(/\D/g) > -1;
                if (notANumber) {
                    event.preventDefault();
                } else {
                    value = value.replace(/^(\d{2})(\d)/, '$1:$2');
                    event.target.value = value;
                }
            } else if (type === 'telephone') {
                event.target.maxLength = 17;
                const notANumber = event.key.search(/\D/g) > -1;
                if (notANumber) {
                    event.preventDefault();
                } else {
                    value = value.replace(/^(\d{2})(\d{5})/, '($1) $2 - ');
                    event.target.value = value;
                }
            } else if (type === 'postalcode') {
                event.target.maxLength = 11;
                const notANumber = event.key.search(/\D/g) > -1;
                if (notANumber) {
                    event.preventDefault();
                } else {
                    value = value.replace(/^(\d{5})(\d)/, '$1 - $2');
                    event.target.value = value;
                }
            }
        },
        [type],
    );

    function formatDateInput(date: Date) {
        return formatDate(date);
    }

    const placeHolder =
        type === 'time'
            ? '00:00'
            : type === 'postalcode'
            ? '00000 - 000'
            : type === 'telephone' && '(00) 00000 - 0000';

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
                    {type === 'currency' && <span>R$</span>}
                    {type !== 'date' ? (
                        <input
                            name={name}
                            id={name}
                            type={
                                type === 'password'
                                    ? 'password'
                                    : type === 'email'
                                    ? 'email'
                                    : ''
                            }
                            placeHolder={placeHolder}
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
