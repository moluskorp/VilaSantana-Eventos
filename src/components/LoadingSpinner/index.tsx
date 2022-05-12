import { Container, Spinner } from './style';

interface Props {
    borderColor?: 'primary' | 'secondary';
    style?: object;
}

export default function LoadingSpinner({
    borderColor = 'primary',
    style,
}: Props) {
    return (
        <Container>
            <Spinner borderColor={borderColor} style={style} />
        </Container>
    );
}
