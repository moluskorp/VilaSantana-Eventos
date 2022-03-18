import styled, { css } from 'styled-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';

interface ContainerProps {
    isInvalid: boolean;
    isFocused: boolean;
}

export const Nav = styled.div`
    margin-top: 1rem;
`;

export const Input = styled(DayPickerInput)`
    background-color: transparent;
    height: 30px;
    margin-left: 0.25rem;
    font-weight: 500;
    width: 100%;
    padding: 10rem;
`;

export const Container = styled.div<ContainerProps>`
    margin-top: 0.5rem;
    border: 1px solid;
    height: 30px;
    width: 100%;

    border-color: ${props =>
        props.isFocused ? props.theme.blue : props.theme.pink};
    border-radius: 10px;

    ${props => {
        if (props.isFocused) {
            return css``;
        }
        if (props.isInvalid) {
            return css`
                border: 0.125rem solid red;
            `;
        }
        return css``;
    }}

    display: flex;
    flex-direction: column;
    justify-content: center;

    > span {
        font-size: 1rem;
        margin-left: 200px;
        color: red;
    }
`;

export const ErrorMessage = styled.text`
    color: red;
    font-size: 0.75rem;

    align-self: start;
    margin-left: 10%;
`;

export const ContainerInput = styled.div<ContainerProps>`
    width: 100%;
    margin-left: 0.5rem;
    padding: 1rem;

    * {
    }
`;

export const Flex = styled.div`
    display: flex;
`;
