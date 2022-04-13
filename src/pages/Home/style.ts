import styled from 'styled-components';

export const Nav = styled.div`
    flex: 1;
    width: 73rem;
    height: 830px;
    margin: auto;
    margin-top: 0.5rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1.25rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Container = styled.div`
    display: flex;
    flex: 1;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 2rem;
`;

export const Flex = styled.div`
    display: flex;
`;

export const ContainerOrders = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1rem;
    justify-content: space-between;
    padding: 0.5rem;

    transition: background-color 0.5s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
        cursor: pointer;
        border: 1 px solid black;
        border-radius: 10px;
        box-shadow: 4px 4px 3px 3px rgba(0, 0, 0, 0.1);
    }
`;

interface PendentesProps {
    orderStatus: 'pendente' | 'completo';
}

export const Pendentes = styled.p<PendentesProps>`
    color: ${props =>
        props.orderStatus === 'pendente' ? props.theme.pink : 'black'};

    &:hover {
        cursor: pointer;
    }
`;

export const Completas = styled.p<PendentesProps>`
    color: ${props =>
        props.orderStatus === 'completo' ? props.theme.pink : 'black'};

    &:hover {
        cursor: pointer;
    }
`;
