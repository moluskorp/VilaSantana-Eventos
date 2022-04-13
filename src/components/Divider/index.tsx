import { Container } from './style';

interface DividerProps {
    style?: object;
    selected?: boolean;
}

export default function Divider({ style, selected = false }: DividerProps) {
    return <Container selected={selected} style={style} />;
}
