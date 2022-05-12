import styled from 'styled-components';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as LabelPrimitive from '@radix-ui/react-label';

import closeIcon from '../../assets/close.svg';

export const StyledOverlay = styled(DialogPrimitive.Overlay)`
    background-color: black;
    opacity: 0.7;
    position: fixed;
    inset: 0;
    @media (prefers-reduced-motion: no-preference) {
        animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
`;

export const StyledContent = styled(DialogPrimitive.Content)`
    background-color: white;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 62.5rem;
    max-height: 90vh;
    height: 90vh;
    padding: 25px;

    @media (prefers-reduced-motion: no preference) {
        animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:focus {
        outline: none;
    }
`;

export const StyledTitle = styled(DialogPrimitive.Title)`
    margin: 0;
    font-weight: 500;
    color: black;
    font-size: 17;
`;

export const StyledDescription = styled(DialogPrimitive.Description)`
    margin: '10px 0 20px';
    color: black;
    font-size: 15;
    line-height: 1.5;
`;

export const Flex = styled.div`
    display: flex;
`;

export const Label = styled(LabelPrimitive.Root)`
    font-size: 2rem;
    font-weight: 500;
`;

export const CloseIcon = styled.button`
    background: url(${closeIcon}) no-repeat center;
    opacity: 0.7;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    td,
    th {
        border: 1px solid rgba(0, 0, 0, 0.3);
        text-align: left;
        padding: 0.5rem;
    }

    tr:nth-child(even) {
        background-color: #ddd;
    }

    tr {
        & + tr {
            &:hover {
                background-color: rgba(0, 0, 0, 0.3);
                cursor: pointer;
            }
        }
    }
`;
