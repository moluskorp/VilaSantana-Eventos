import styled, { css } from 'styled-components';

interface ContainerProps {
    isFocused: boolean;
}

export const Nav = styled.div``;

export const Container = styled.div<ContainerProps>`
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
    margin-left: 0.25rem;
    display: flex;
    align-items: center;

    input {
        background-color: transparent;
        height: 30px;
        font-weight: 500;
        margin-right: 0.5rem;
        width: 100%;

        text-align: right;
    }
`;

export const Flex = styled.div`
    display: flex;
`;
