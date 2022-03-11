import styled from 'styled-components';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

export const StyledScrollArea = styled(ScrollAreaPrimitive.Root)`
    width: 95%;
    height: 70%;

    border-radius: 0.5rem;
    overflow: 'hidden';
`;

export const StyledViewport = styled(ScrollAreaPrimitive.Viewport)`
    width: 100%;
    height: 100%;
    border-radius: 'inherit';
`;

export const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar)`
    display: flex;
    user-select: 'none';
    touch-action: 'none';

    padding: 2px;
    background: rgba(220, 209, 209, 1);
    transition: background 160ms ease-out;
    width: 10;

    &:hover {
        background: rgba(184, 182, 182, 1);
    }
`;

export const StyledThumb = styled(ScrollAreaPrimitive.Thumb)`
    flex: 1;
    background: #5bb1ce;
    border-radius: 10;
    position: 'relative';

    &::before {
        content: '"';
        color: transparent;
        position: 'absolute';
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        min-width: 44px;
        min-height: 44px;
    }
`;

export const StyledCorner = styled(ScrollAreaPrimitive.Corner)`
    background: green;
`;

export const Box = styled.div``;

export const Text = styled.div`
    color: violet;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
`;

export const Tag = styled.div`
    color: yellow;
    font-size: 0.75rem;
    line-height: 1rem;
    margin-top: 10px;
    border-top: 1px solid orange;
    padding-top: 10px;
`;
