import styled from 'styled-components';

interface ContainerProps {
    buttonType:
        | 'primary'
        | 'secundary'
        | 'outline'
        | 'borderPrimary'
        | 'borderSecundary';
    loading?: boolean;
}

// eslint-disable-next-line
export const Container = styled.button<ContainerProps>`
    padding: ${props => (props.buttonType === 'outline' ? '' : '1rem 3rem')};
    background-color: ${props =>
        props.buttonType === 'primary'
            ? '#121212'
            : props.buttonType === 'secundary'
            ? props.theme.blue
            : 'transparent'};
    border: ${props =>
        props.buttonType === 'borderPrimary' ||
        props.buttonType === 'borderSecundary'
            ? '1px solid'
            : '0px'};
    border-color: ${props =>
        props.buttonType === 'borderPrimary'
            ? '#CC3AB4'
            : props.buttonType === 'borderSecundary'
            ? '#000'
            : 'transparent'};
    border-radius: 0.5rem;
    font-weight: ${props => (props.buttonType === 'outline' ? '500' : 'bold')};
    color: ${props => (props.buttonType === 'primary' ? 'white' : 'black')};
`;

export const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface IconProps {
    icon: string | undefined;
}

export const Icon = styled.div<IconProps>`
    background: url(${props => props.icon}) no-repeat center;
    width: 3.25rem;
    height: 3.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;
