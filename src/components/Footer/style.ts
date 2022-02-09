import styled from 'styled-components';
import { Label as lbl } from '@radix-ui/react-label';

export const Nav = styled.div`
    background-color: white;
    height: 40px;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    margin-top: 0.5rem;
`;

export const Container = styled.div`
    width: 1140px;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    margin: auto;
`;

export const Label = styled(lbl)`
    color: black;
`;

export const Flex = styled.div`
    display: flex;

    strong {
        margin-left: 4px;
    }
`;
