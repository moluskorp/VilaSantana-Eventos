import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

type Client = {
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

interface ClientContextData {
    client: Client | null | undefined;
    changeClient: (client: Client) => void;
}

const ClientContext = createContext<ClientContextData>({} as ClientContextData);

export function ClientProvider({ children }: ClientProviderProps) {
    const [client, setClient] = useState<Client | null>();

    useEffect(() => {
        console.log(client);
    }, [client]);

    function changeClient(newClient: Client) {
        setClient(newClient);
    }

    const value = useMemo(() => ({ client, changeClient }), [client]);

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
