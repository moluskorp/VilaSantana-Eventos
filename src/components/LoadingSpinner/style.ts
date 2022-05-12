import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    display: flex;
`;

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
interface SpinnerProps {
    borderColor: 'primary' | 'secondary';
}

export const Spinner = styled.div<SpinnerProps>`
    width: 40px;
    height: 40px;
    border: 6px solid;
    border-radius: 50%;
    //animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    animation: ${rotate} 1.5s linear infinite;
    border-color: ${props =>
        props.borderColor === 'primary'
            ? '#fff #fff transparent transparent'
            : '#000 #000 transparent transparent'};

    &:nth-child(1) {
        animation-delay: -0.45s;
    }

    &:nth-child(2) {
        animation-delay: -0.3s;
    }

    &:nth-child(3) {
        animation-delay: -0.15s;
    }
`;
