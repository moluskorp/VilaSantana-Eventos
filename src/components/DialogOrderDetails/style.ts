import styled, { keyframes } from 'styled-components';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Form as UnForm } from '@unform/web';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import closeIcon from '../../assets/close.svg';
import trashIcon from '../../assets/trash.svg';

interface StyledContentAccordionProps {
    dataState: 'open' | 'closed';
}

const slideDown = keyframes({
    from: { height: 0 },
    to: { height: '80px' },
});

const slideUp = keyframes({
    from: { height: '80px' },
    to: { height: 0 },
});

export const StyledOverlay = styled(DialogPrimitive.Overlay)`
    background-color: black;
    opacity: 0.7;
    position: fixed;
    inset: 0;
    @media (prefers-reduced-motion: no-preference) {
        animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
`;

export const Form = styled(UnForm)`
    width: 100%;
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
    max-width: 580px;
    max-height: 85vh;
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
    width: 100%;
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

export const TrashIconOrder = styled.button`
    background: url(${trashIcon}) no-repeat center;
    width: 2rem;
    height: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 60px;
    right: 10px;
`;

export const TrashIcon = styled.button`
    background: url(${trashIcon}) no-repeat center;
    width: 1.5rem;
    height: 1.5rem;
`;

export const StyledAccordion = styled(AccordionPrimitive.Root)`
    border-radius: 0.375rem;
    width: 18.75px;
    background-color: red;
    box-shadow: 0 2px 10px black;
`;

export const StyledItem = styled(AccordionPrimitive.Item)`
    overflow: hidden;
    margin-top: '0.5rem';

    &:first-child {
        margin-top: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    &:focus-within {
        position: relative;
        z-index: 1;
        box-shadow: 0 0 0 2px green;
    }
`;

export const StyledHeader = styled(AccordionPrimitive.Header)`
    all: unset;
    display: flex;
`;

export const StyledTrigger = styled(AccordionPrimitive.Trigger)`
    all: unset;
    font-family: inherit;
    background-color: transparent;
    padding: 0 1.25rem;
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    line-height: 1;
    color: violet;
    box-shadow: 0 1px 0 black;
    background-color: white;

    &:hover {
        background-color: purple;
    }
`;

export const StyledContentAccordion = styled(
    AccordionPrimitive.Content,
)<StyledContentAccordionProps>`
    overflow: hidden;
    font-size: 1rem;
    color: blue;
    background-color: red;

    animation: ${props => (props.dataState === 'open' ? slideDown : slideUp)}
        300ms cubic-bezier(0.87, 0, 0.13, 1) forwards;
`;

export const StyledContentText = styled.div`
    padding: 1rem 1.25rem;
`;

export const StyledChevron = styled(
    ChevronDownIcon,
)<StyledContentAccordionProps>`
    color: violet;
    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
    transform: ${props =>
        props.dataState === 'open' ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

interface TestAnimationProps {
    status: string;
}

export const TestAnimation = styled.div<TestAnimationProps>`
    background-color: red;
    width: 100%;

    animation: ${props => (props.status === 'open' ? slideDown : slideUp)} 300ms
        cubic-bezier(0.87, 0, 0.13, 1) forwards;
`;
