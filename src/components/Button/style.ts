import styled from 'styled-components';

interface ContainerProps {
    buttonType: 'primary' | 'secundary' | 'outline';
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
    border-radius: 0.5rem;
    font-weight: ${props => (props.buttonType === 'outline' ? '500' : 'bold')};
    color: ${props => (props.buttonType === 'primary' ? 'white' : 'black')};
`;
