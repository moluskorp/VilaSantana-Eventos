import styled, { css } from 'styled-components';

interface ContainerProps {
    type: 'late' | 'next';
    hover: boolean;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    width: 100%;
    height: 8.125rem;
    background-color: ${props =>
        props.type === 'late'
            ? 'rgba(242, 57, 57, 0.5)'
            : 'rgba(124,206,95,0.5)'};
    opacity: 1;
    box-shadow: 4px 4px 4px
        ${props =>
            props.type === 'late'
                ? 'rgba(233, 136, 153, 0.25)'
                : 'rgba(124,206,95,0.5)'};
    border-radius: 0.75rem;
    align-items: center;
    justify-content: space-between;

    ${props =>
        props.hover &&
        css`
            cursor: pointer;
            transition: filter 0.2s;

            &:hover {
                filter: brightness(0.8);
            }
        `}
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    margin-left: 1.5rem;
`;

export const Name = styled.p`
    font-size: 1rem;
    opacity: 50%;
    margin-top: 1rem;
    margin-left: 1.5rem;
`;

export const Address = styled.p`
    font-size: 1rem;
    opacity: 67%;
    margin-top: 0.5rem;
    margin-left: 1.5rem;
`;

export const Time = styled.p`
    font-size: 2.5rem;
    font-weight: bold;
    margin-right: 1.5rem;
`;

export const Flex = styled.div`
    display: flex;
    flex-direction: column;
`;
