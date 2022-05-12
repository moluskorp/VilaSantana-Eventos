import { ButtonHTMLAttributes } from 'react';
import LoadingSpinner from '../LoadingSpinner';
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
    loading?: boolean;
    loadingContainer?: object;
}

export default function Button({
    children,
    buttonType = 'primary',
    className,
    containerStyle,
    icon,
    iconStyle,
    loading = false,
    loadingContainer,
    ...rest
}: ButtonProps): JSX.Element {
    return (
        <Container
            style={containerStyle}
            className={className}
            buttonType={buttonType}
            disabled={loading}
            {...rest}
        >
            {loading ? (
                <Nav style={loadingContainer}>
                    <LoadingSpinner
                        style={{
                            width: '24px',
                            height: '24px',
                            alignSelf: 'center',
                            justifySelf: 'center',
                            margin: 'auto',
                            padding: '0',
                        }}
                    />
                </Nav>
            ) : (
                <Nav style={{ justifyContent: 'space-between' }}>
                    <>
                        {children}
                        {!!icon && <Icon icon={icon} style={iconStyle} />}
                    </>
                </Nav>
            )}
        </Container>
    );
}
