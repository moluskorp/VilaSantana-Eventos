import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { Container, ErrorMessage } from './style';

interface InputDivProps {
    children: ReactNode;
    error?: FieldError;
}

export default function InputDiv({ children, error }: InputDivProps) {
    return (
        <Container>
            {children}
            {!!error && <ErrorMessage>{error.message}</ErrorMessage>}
        </Container>
    );
}
