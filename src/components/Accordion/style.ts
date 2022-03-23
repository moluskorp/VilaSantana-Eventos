import styled, { keyframes } from 'styled-components';
import arrowDownIcon from '../../assets/arrow-down-with.svg';

interface ChildrenContainerProps {
    open: boolean;
}

const slideDown = keyframes({
    from: { height: 0 },
    to: { height: '100%' },
});

const slideUp = keyframes({
    from: { height: '100%' },
    to: { height: 0 },
});

export const Nav = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    margin-top: 1rem;
`;

export const TitleHeader = styled.p`
    font-size: 1.25rem;
    font-weight: 500;
    padding: 1rem;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    width: 100%;
    height: 5%;
    font-size: 1rem;
    transition: filter 0.2s;

    &:hover {
        cursor: pointer;
        filter: brightness(0.8);
    }
`;

export const ChildrenContainer = styled.div<ChildrenContainerProps>`
    visibility: ${props => (props.open ? 'visible' : 'hidden')};
    opacity: ${props => (props.open ? '1' : '0')};
    display: flex;
    flex-direction: column;
    width: 100%;
    animation: ${props => (props.open ? slideDown : slideUp)} 300ms
        cubic-bezier(0.87, 0, 0.13, 1) forwards;
    transition: visibility 0.6s linear, opacity 0.6s linear;
`;

export const ArrowDownIcon = styled.button<ChildrenContainerProps>`
    background: url(${arrowDownIcon}) no-repeat center;
    color: 'red';
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;

    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
    transform: ${props => (props.open ? 'rotate(180deg)' : 'rorate(0deg)')};
`;
