import styled from 'styled-components';
import { Label as lbl } from '@radix-ui/react-label';

import trashIcon from '../../assets/trash.svg';
import subtractIcon from '../../assets/subtract.svg';
import addIcon from '../../assets/add.svg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem 0;
`;

export const Flex = styled.div`
    display: flex;

    p {
        margin-right: 0.5rem;
    }
`;

export const Label = styled(lbl)`
    color: black;
`;

export const TrashIcon = styled.button`
    background: url(${trashIcon}) no-repeat center;
    width: 1.5rem;
    height: 1.5rem;
`;

export const SubtractIcon = styled.button`
    background: url(${subtractIcon}) no-repeat center;
    width: 0.25rem;
    height: 0.25rem;
    background-color: #dfdddd;
    padding: 0.75rem;

    border-radius: 0.625rem 0 0 0.625rem;
    border-right: 0.5px solid rgba(0, 0, 0, 0.4);
`;

export const AddIcon = styled.button`
    background: url(${addIcon}) no-repeat center;
    width: 0.25rem;
    height: 0.25rem;

    background-color: #dfdddd;
    padding: 0.75rem;

    border-radius: 0 0.625rem 0.625rem 0;
    border-left: 0.5px solid rgba(0, 0, 0, 0.4);
`;
