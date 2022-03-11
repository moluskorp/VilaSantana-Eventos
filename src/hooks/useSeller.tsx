import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { ref, set, get, child } from 'firebase/database';

import { v4 as uuidV4 } from 'uuid';
import { database } from '../services/firebase';

type Seller = {
    id: string;
    cpf: string;
    name: string;
    whatsapp: string;
};

type SellerProviderProps = {
    children: ReactNode;
};

// type FirebaseSeller = Record<
//     string,
//     {
//         cpf: string;
//         name: string;
//         whatsapp: string;
//     }
// >;

interface SellerContextData {
    seller: Seller | null | undefined;
    changeSeller: (seller: Seller) => void;
    saveSellerOnDb: () => Promise<void>;
    selectSellerOnDb: (id: string) => Promise<void>;
}

const SellerContext = createContext<SellerContextData>({} as SellerContextData);

export function SellerProvider({ children }: SellerProviderProps) {
    const [seller, setSeller] = useState<Seller | null>();

    useEffect(() => {
        // console.log(seller);
    }, [seller]);

    function changeSeller(newSeller: Seller) {
        if (!newSeller) {
            return;
        }
        if (!newSeller?.id) {
            // eslint-disable-next-line
            newSeller.id = uuidV4();
        }
        setSeller(newSeller);
    }

    const saveSellerOnDb = useCallback(async () => {
        await set(ref(database, `sellers/${seller?.id}`), {
            cpf: seller?.cpf,
            name: seller?.name,
            whatsapp: seller?.whatsapp,
        });
    }, [seller]);

    const selectSellerOnDb = useCallback(async (id: string) => {
        try {
            const dbRef = ref(database);
            const result = await get(child(dbRef, `sellers/${id}`));
            if (result.exists()) {
                // console.log(result.val());
            } else {
                // console.log('Nenhum cliente encontrado');
            }
        } catch (err) {
            // console.log(err);
        }
    }, []);

    const value = useMemo(
        () => ({
            seller,
            changeSeller,
            saveSellerOnDb,
            selectSellerOnDb,
        }),
        [seller, saveSellerOnDb, selectSellerOnDb],
    );

    return (
        <SellerContext.Provider value={value}>
            {children}
        </SellerContext.Provider>
    );
}

export function useSeller(): SellerContextData {
    const context = useContext(SellerContext);

    return context;
}
