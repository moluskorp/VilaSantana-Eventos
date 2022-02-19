import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import errorResolverFirebase from '../../util/errorResolverFirebase';
import { Container } from './style';

export default function Home() {
    const { createUserWithEmail, loginWithEmail } = useAuth();

    async function handleCreateUser() {
        try {
            await createUserWithEmail('molusko.rp@hotmail.com', '123456');
        } catch (err) {
            const error = errorResolverFirebase(err);
            alert(error);
        }
    }

    async function handleLogin() {
        try {
            await loginWithEmail('moluskorp@hotmail.com', '123123');
        } catch (err) {
            const error = errorResolverFirebase(err);
            alert(error);
        }
    }

    return (
        <Container>
            <Link to="/oi">
                <Button onClick={handleLogin}>Novo pedido</Button>
            </Link>
            <Button onClick={handleCreateUser}>Cadastro de Clientes</Button>
            <Button onClick={handleLogin}>Pedidos Realizados</Button>
        </Container>
    );
}
