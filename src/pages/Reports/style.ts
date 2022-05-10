import styled from 'styled-components';

export const Nav = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
`;

export const Container = styled.div`
    flex: 1;
    width: 73rem;
    height: 830px;
    margin: auto;
    margin-top: 0.5rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h1`
    margin-top: 1rem;
`;

export const Paragraph = styled.p`
    margin-top: 1rem;
`;

export const Flex = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;
