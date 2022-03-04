import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 0.25rem;

    border-radius: 0.5rem;

    & + div {
        margin-top: 0.25rem;
    }

    &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.3);
    }
`;

export const Name = styled.div`
    font-size: 1rem;
    font-weight: bold;
`;

export const Cpf = styled.p`
    font-size: 0.75rem;
    font-weight: 300;
    margin-top: 0.25rem;
`;

export const Flex = styled.div`
    display: flex;
`;
