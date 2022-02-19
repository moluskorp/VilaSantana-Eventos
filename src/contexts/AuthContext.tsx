import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { auth } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
};

type AuthContextType = {
    user: User | undefined;
    createUserWithEmail: (email: string, password: string) => Promise<void>;
    loginWithEmail: (email: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

async function createUserWithEmail(email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
    );
}

async function loginWithEmail(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({
    children,
}: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userEvent => {
            if (userEvent) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user]);

    const value = useMemo(
        () => ({ user, createUserWithEmail, loginWithEmail }),
        [user],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
