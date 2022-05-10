import {
    ForwardedRef,
    ForwardRefRenderFunction,
    RefForwardingComponent,
    useCallback,
} from 'react';
import { useClient } from '../../hooks/useClient';
import { ModalDialogSearchClientHandles } from '../DialogSearchClient';
import { Container, Cpf, Name } from './style';

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

interface ClientSearchDiv {
    client: Client;
    setCanCancel: (condition: boolean) => void;
    closeModal: (open: boolean) => void;
}

export default function ClientSearchDiv({
    client,
    setCanCancel,
    closeModal,
}: ClientSearchDiv) {
    const { changeClient } = useClient();

    const handleSelectClient = useCallback(() => {
        changeClient(client);
        setCanCancel(true);
        closeModal(true);
    }, [changeClient, client, setCanCancel, closeModal]);

    return (
        <Container onClick={handleSelectClient}>
            <Name>{client.name}</Name>
            <Cpf>{client.cpf}</Cpf>
        </Container>
    );
}
