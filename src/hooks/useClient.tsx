import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    ref,
    set,
    get,
    child,
    query,
    limitToFirst,
    startAt,
    endAt,
    orderByKey,
    orderByChild,
} from 'firebase/database';

import { v4 as uuidV4 } from 'uuid';
import { database } from '../services/firebase';

type Client = {
    id: string;
    cpf: string;
    name: string;
    whatsapp: string;
    address: string;
    number: string;
    district: string;
    complement: string;
    city: string;
    postalcode: string;
};

type ClientProviderProps = {
    children: ReactNode;
};

type FirebaseClient = Record<
    string,
    {
        cpf: string;
        name: string;
        whatsapp: string;
        address: string;
        number: string;
        district: string;
        complement: string;
        city: string;
        postalcode: string;
    }
>;

type Pagination = {
    firstClient: string;
    lastClient: string;
    action: 'next' | 'previous' | '';
};

interface ClientContextData {
    client: Client | null | undefined;
    changeClient: (client: Client) => Promise<void>;
    saveClientOnDb: () => Promise<void>;
    selectClientOnDb: (id: string) => Promise<void>;
    selectClientListOnDb: (pagination: Pagination) => Promise<Client[]>;
    selectClientListByNameOnDb: (
        name: string,
        pagination: Pagination,
    ) => Promise<Client[]>;
    selectClientOnDbByCpf: (cpf: string) => Promise<Client[] | null>;
}

const ClientContext = createContext<ClientContextData>({} as ClientContextData);

export function ClientProvider({ children }: ClientProviderProps) {
    const [client, setClient] = useState<Client | null>();

    const saveClientOnDb = useCallback(async () => {
        console.log('client', client);
        await set(ref(database, `clients/${client?.id}`), {
            cpf: client?.cpf,
            name: client?.name,
            whatsapp: client?.whatsapp,
            address: client?.address,
            number: client?.number,
            district: client?.district,
            complement: client?.complement,
            city: client?.city,
            postalcode: client?.postalcode,
        });
    }, [client]);

    const selectClientOnDb = useCallback(async (id: string) => {
        try {
            const dbRef = ref(database);
            const result = await get(child(dbRef, `clients/${id}`));
            if (result.exists()) {
                console.log(result.val());
            } else {
                console.log('Nenhum cliente encontrado');
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const selectClientOnDbByCpf = useCallback(async (cpf: string) => {
        try {
            const dbRefQ = query(
                ref(database, 'clients'),
                orderByChild('cpf'),
                startAt(cpf),
                endAt(cpf),
            );
            const resultFirebase = await get(dbRefQ);
            const result: FirebaseClient = resultFirebase.val();
            if (result) {
                const parsedClients = Object.entries(result).map(
                    ([key, value]) => {
                        return {
                            id: key,
                            cpf: value.cpf,
                            name: value.name,
                            whatsapp: value.whatsapp,
                            address: value.address,
                            number: value.number,
                            district: value.district,
                            complement: value.complement,
                            city: value.city,
                            postalcode: value.postalcode,
                        };
                    },
                );
                return parsedClients;
            }
            return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }, []);

    const changeClient = useCallback(
        async (newClient: Client) => {
            if (!newClient) {
                return;
            }
            if (newClient.id) {
                setClient(newClient);
                return;
            }
            const resultSearchCpf = await selectClientOnDbByCpf(newClient.cpf);
            if (resultSearchCpf) {
                setClient(resultSearchCpf[0]);
                return;
            }
            if (!newClient?.id) {
                // eslint-disable-next-line
                newClient.id = uuidV4();
            }
            setClient(newClient);
        },
        [selectClientOnDbByCpf],
    );

    const selectClientListByNameOnDb = useCallback(
        async (
            name: string,
            { firstClient, lastClient, action }: Pagination,
        ) => {
            try {
                const dbRefQ =
                    action === 'next'
                        ? query(
                              ref(database, 'clients'),
                              orderByChild('name'),
                              startAt(`${name}`),
                              endAt(`${name}`),
                              limitToFirst(10),
                          )
                        : action === 'previous'
                        ? query(
                              ref(database, 'clients'),
                              orderByChild('name'),
                              startAt(`${name}`),
                              endAt(`${name}`),
                              limitToFirst(10),
                          )
                        : query(
                              ref(database, 'clients'),
                              orderByChild('name'),
                              startAt('11'),
                              endAt('11\uf8ff'), // \uf8ff
                              limitToFirst(10),
                          );
                const resultFirebase = await get(dbRefQ);

                const result: FirebaseClient = resultFirebase.val();

                const parsedClients = Object.entries(result).map(
                    ([key, value]) => {
                        return {
                            id: key,
                            cpf: value.cpf,
                            name: value.name,
                            whatsapp: value.whatsapp,
                            address: value.address,
                            number: value.number,
                            district: value.district,
                            complement: value.complement,
                            city: value.city,
                            postalcode: value.postalcode,
                        };
                    },
                );

                return parsedClients;
            } catch (err: any) {
                console.log(err.message);
            }
            return {} as Client[];
        },
        [],
    );

    const selectClientListOnDb = useCallback(
        async ({ firstClient, lastClient, action }: Pagination) => {
            try {
                const dbRefQ =
                    action === 'next'
                        ? query(
                              ref(database, 'clients'),
                              orderByKey(),
                              startAt(lastClient),
                              limitToFirst(10),
                          )
                        : action === 'previous'
                        ? query(
                              ref(database, 'clients'),
                              orderByKey(),
                              endAt(firstClient),
                              limitToFirst(10),
                          )
                        : query(
                              ref(database, 'clients'),
                              orderByKey(),
                              limitToFirst(10),
                          );
                const resultFirebase = await get(dbRefQ);

                const result: FirebaseClient = resultFirebase.val();

                const parsedClients = Object.entries(result).map(
                    ([key, value]) => {
                        return {
                            id: key,
                            cpf: value.cpf,
                            name: value.name,
                            whatsapp: value.whatsapp,
                            address: value.address,
                            number: value.number,
                            district: value.district,
                            complement: value.complement,
                            city: value.city,
                            postalcode: value.postalcode,
                        };
                    },
                );

                return parsedClients;
            } catch (err: any) {
                console.log(err.message);
            }
            return {} as Client[];
        },
        [],
    );

    const value = useMemo(
        () => ({
            client,
            changeClient,
            saveClientOnDb,
            selectClientOnDb,
            selectClientListOnDb,
            selectClientListByNameOnDb,
            selectClientOnDbByCpf,
        }),
        [
            client,
            saveClientOnDb,
            selectClientOnDb,
            selectClientListOnDb,
            changeClient,
            selectClientListByNameOnDb,
            selectClientOnDbByCpf,
        ],
    );

    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    );
}

export function useClient(): ClientContextData {
    const context = useContext(ClientContext);

    return context;
}
