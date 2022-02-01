import { ButtonHTMLAttributes } from 'react';
import { Container } from './style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: 'primary' | 'secundary' | 'outline';
    className?: string;
    containerStyle?: object;
}

export default function Button({
    children,
    buttonType = 'primary',
    className,
    containerStyle,
    ...rest
}: ButtonProps): JSX.Element {
    return (
        <Container
            style={containerStyle}
            className={className}
            buttonType={buttonType}
            {...rest}
        >
            {children}
        </Container>
    );
}
