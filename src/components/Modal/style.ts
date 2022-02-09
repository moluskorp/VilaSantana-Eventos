import styled, { keyframes } from 'styled-components';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const overlayShow = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});

const contentShow = keyframes({
    '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
    '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const StyledOverlay = styled(DialogPrimitive.Overlay)`
    background-color: black;
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
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;

    @media (prefers-reduced-motion: no preference) {
        animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:focus {
        outline: none;
    }
`;
