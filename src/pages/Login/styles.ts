import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;

    align-items: center;
    justify-content: center;
`;

export const LinkStyled = styled(Link)`
    color: transparent;
`;

export const Content = styled.div`
    display: flex;
    background-color: rgba(249, 249, 249, 0.4);
    padding: 5rem;
    border-radius: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.h1`
    font-size: 62px;
    font-weight: bold;
`;

export const Paragraph = styled.p`
    font-size: 24px;
    margin-top: 2rem;
`;

export const Flex = styled.div`
    display: flex;
`;

export const Label = styled.label`
    font-size: 1rem;
    color: #cc3ab4;

    &:hover {
        cursor: pointer;
    }
`;
