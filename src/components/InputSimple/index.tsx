import { InputHTMLAttributes, useCallback, useState } from 'react';
import 'react-day-picker/lib/style.css';

import { Container, ContainerInput, Nav } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
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

export default function InputSimple({
    name,
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

    return (
        <Nav>
            <Container
                style={containerStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
            >
                <ContainerInput isFocused={isFocused}>
                    {type === 'currency' && <span>R$</span>}

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
                        onKeyPress={event => {
                            handleInputNumber(event);
                        }}
                        {...rest}
                    />
                </ContainerInput>
            </Container>
        </Nav>
    );
}
