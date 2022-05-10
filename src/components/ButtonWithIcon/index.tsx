import { ButtonHTMLAttributes } from 'react';
import { Container, Nav } from './style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: 'primary' | 'secundary' | 'outline';
    className?: string;
    containerStyle?: object;
}

export default function ButtonWithIcon({
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
            <Nav>{children}</Nav>
        </Container>
    );
}
