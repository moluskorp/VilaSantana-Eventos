import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { Avatar, Content, Logo, Nav } from './Header';

import logoImg from '../../assets/M.svg';
import profileImg from '../../assets/profile.jpg';
import useAuth from '../../hooks/useAuth';

export default function Header() {
    const { signOutUser } = useAuth();

    const handleLogOut = useCallback(async () => {
        await signOutUser();
    }, [signOutUser]);

    return (
        <Nav>
            <Content>
                <Logo src={logoImg} alt="Moltech" />
                <Avatar onClick={handleLogOut} />
            </Content>
        </Nav>
    );
}
