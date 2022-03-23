import styled from 'styled-components';

import trashIcon from '../../assets/trash.svg';

export const Nav = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 4px;
`;

export const DescriptionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13.25rem;
    font-weight: bold;
    border-right: 1px solid rgba(0, 0, 0, 0.4);
    p {
        padding: 0.25rem;
    }
`;

export const QuantityHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.25rem;
    font-weight: bold;
    border-right: 1px solid rgba(0, 0, 0, 0.4);

    p {
        padding: 0.25rem;
    }
`;

export const PriceHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6.6rem;
    font-weight: bold;
    border-right: 1px solid rgba(0, 0, 0, 0.4);

    p {
        padding: 0.25rem;
    }
`;

export const TotalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6.6rem;
    font-weight: bold;
    border-right: 1px solid rgba(0, 0, 0, 0.4);

    p {
        padding: 0.25rem;
    }
`;

export const RemoveHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    font-weight: bold;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    p {
        padding: 0.25rem;
    }
`;

export const DescriptionContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13rem;
    border-right: 1px solid rgba(0, 0, 0, 0.4);
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    p {
        padding: 0.25rem;
    }
`;

export const QuantityContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.25rem;
    border-right: 1px solid rgba(0, 0, 0, 0.4);
    border-top: 1px solid rgba(0, 0, 0, 0.4);

    p {
        padding: 0.25rem;
    }
`;

export const PriceContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6.45rem;
    border-right: 1px solid rgba(0, 0, 0, 0.4);
    border-top: 1px solid rgba(0, 0, 0, 0.4);

    p {
        padding: 0.25rem;
    }
`;

export const TotalContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6.46rem;
    border-right: 1px solid rgba(0, 0, 0, 0.4);
    border-top: 1px solid rgba(0, 0, 0, 0.4);

    p {
        padding: 0.25rem;
    }
`;

export const RemoveContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.8rem;
    border-top: 1px solid rgba(0, 0, 0, 0.4);

    p {
        padding: 0.25rem;
    }
`;

export const Flex = styled.div`
    display: flex;
    width: 100%;
`;

export const TrashIcon = styled.button`
    background: url(${trashIcon}) no-repeat center;
    width: 1.5rem;
    height: 1.5rem;
`;
