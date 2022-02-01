import styled, { css } from 'styled-components';

interface ContainerProps {
    isInvalid: boolean;
    isFocused: boolean;
}

export const Nav = styled.div`
    margin-top: 1rem;
`;

export const Container = styled.div<ContainerProps>`
    margin-top: 0.5rem;
    border: 1px solid;
    height: 30px;

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
    }
`;

export const ErrorMessage = styled.text`
    color: red;
    font-size: 1rem;

    align-self: start;
    margin-left: 10%;
`;

export const ContainerInput = styled.div<ContainerProps>`
    input {
        height: 30px;
        background-color: transparent;
        margin-left: 0.5rem;
        width: 100%;
        font-weight: 500;
    }
`;
