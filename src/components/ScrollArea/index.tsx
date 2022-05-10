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
    style?: object;
}

export default function ScrollArea({ children, style }: ScrollAreaProps) {
    const { order } = useOrder();
    return (
        <StyledScrollArea style={style}>
            <StyledViewport>
                <Box style={{ padding: '15px 20px' }}>{children}</Box>
            </StyledViewport>
            <StyledScrollbar orientation="vertical">
                <StyledThumb />
            </StyledScrollbar>
        </StyledScrollArea>
    );
}
