import { ButtonHTMLAttributes } from 'react';
import { Container, Icon, Nav } from './style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?:
        | 'primary'
        | 'secundary'
        | 'outline'
        | 'borderPrimary'
        | 'borderSecundary';
    className?: string;
    containerStyle?: object;
    icon?: string;
    iconStyle?: object;
}

export default function Button({
    children,
    buttonType = 'primary',
    className,
    containerStyle,
    icon,
    iconStyle,
    ...rest
}: ButtonProps): JSX.Element {
    return (
        <Container
            style={containerStyle}
            className={className}
            buttonType={buttonType}
            {...rest}
        >
            <Nav>
                {children}
                {!!icon && <Icon icon={icon} style={iconStyle} />}
            </Nav>
        </Container>
    );
}
