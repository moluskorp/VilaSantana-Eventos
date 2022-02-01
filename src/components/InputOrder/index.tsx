import { InputHTMLAttributes, useCallback, useState } from 'react';

import { FieldError } from 'react-hook-form';
import { Container, ErrorMessage, ContainerInput, Nav } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    error?: FieldError;
    type?: 'currency' | 'normal' | 'integer' | 'float';
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
        if (type === 'integer') {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        } else if (type === 'currency' || type === 'float') {
            if (!/[0-9]|,/.test(event.key)) {
                event.preventDefault();
            }
        }
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
                    <input
                        name={name}
                        {...register(name)}
                        onKeyPress={event => {
                            handleInputNumber(event);
                        }}
                        {...rest}
                    />
                </ContainerInput>
            </Container>
            {!!error && <ErrorMessage>{error.message}</ErrorMessage>}
        </Nav>
    );
}
