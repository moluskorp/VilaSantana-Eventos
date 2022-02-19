import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 1.5rem;
`;

export const Flex = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 4px;
    padding-bottom: 4px;

    &:hover {
        box-sizing: border-box;
        box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.25);
        background-color: #ddd;
        padding: 4px;
        cursor: pointer;
    }
`;

export const Name = styled.strong`
    font-size: 1rem;
    font-weight: bold;
`;

export const Label = styled.p`
    font-size: 1rem;
    font-weight: 500;
`;

export const LabelHeader = styled.p`
    font-size: 1rem;
    font-weight: bold;
`;

export const DivName = styled.div`
    display: flex;
    width: 35%;
`;

export const DivAddress = styled.div`
    display: flex;
    width: 25%;
`;

export const DivNumber = styled.div`
    display: flex;
    width: 10%;
`;

export const DivDistrict = styled.div`
    display: flex;
    width: 15%;
`;

export const DivWhats = styled.div`
    display: flex;
    width: 15%;
`;

export const Divider = styled.div`
    content: '';
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
`;
