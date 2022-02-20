import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { auth } from '../services/firebase';

type User = {
    id: string;
    name: string | null;
    avatar: string | null;
};

type AuthContextType = {
    user: User | null | undefined;
    createUserWithEmail: (email: string, password: string) => Promise<void>;
    loginWithEmail: (email: string, password: string) => Promise<void>;
    signOutUser: () => Promise<void>;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({
    children,
}: AuthContextProviderProps) {
    const [user, setUser] = useState<User | null>();

    async function loginWithEmail(email: string, password: string) {
        const { user: data } = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        );
        const { uid: id, displayName: name, photoURL: avatar } = data;
        const userLogin = { id, name, avatar };
        setUser(userLogin);
    }

    async function createUserWithEmail(email: string, password: string) {
        const { user: data } = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        const { uid: id, displayName: name, photoURL: avatar } = data;
        const userLogin = { id, name, avatar };
        setUser(userLogin);
    }

    const signOutUser = useCallback(async () => {
        await auth.signOut();
        setUser(null);
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userEvent => {
            if (userEvent) {
                const {
                    uid: id,
                    displayName: name,
                    photoURL: avatar,
                } = userEvent;
                const userLogin = { id, name, avatar };
                setUser(userLogin);
            } else {
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const value = useMemo(
        () => ({ user, createUserWithEmail, loginWithEmail, signOutUser }),
        [user, signOutUser],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
