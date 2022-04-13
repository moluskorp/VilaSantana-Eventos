import styled, { css } from 'styled-components';

interface ContainerProps {
    selected: boolean;
}

export const Container = styled.div<ContainerProps>`
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    ${props =>
        props.selected &&
        css`
            border-color: ${props.theme.pink};
        `}
`;
