import { Container, Flex, Label, Nav } from './style';

export default function Footer() {
    return (
        <Nav>
            <Container>
                <Flex>
                    <Label>Desenvolvido por</Label>
                    <strong>Junior Baratella</strong>
                </Flex>
            </Container>
        </Nav>
    );
}
