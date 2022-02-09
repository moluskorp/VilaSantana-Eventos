import { Container } from './style';

interface DividerProps {
    style?: object;
}

export default function Divider({ style }: DividerProps) {
    return <Container style={style} />;
}
