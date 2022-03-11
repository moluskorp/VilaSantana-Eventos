import { ReactNode } from 'react';
import { useOrder } from '../../hooks/useOrder';
import {
    Box,
    StyledScrollArea,
    StyledScrollbar,
    StyledThumb,
    StyledViewport,
    Tag,
    Text,
} from './style';

interface ScrollAreaProps {
    children: ReactNode;
}

export default function ScrollArea({ children }: ScrollAreaProps) {
    const { order } = useOrder();
    return (
        <StyledScrollArea>
            <StyledViewport>
                <Box style={{ padding: '15px 20px' }}>{children}</Box>
            </StyledViewport>
            <StyledScrollbar orientation="vertical">
                <StyledThumb />
            </StyledScrollbar>
        </StyledScrollArea>
    );
}
