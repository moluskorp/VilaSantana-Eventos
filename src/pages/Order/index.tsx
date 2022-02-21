import { ClientProvider } from '../../hooks/useClient';
import { ModalProvider } from '../../hooks/useModal';
import Page from './Page';

export default function Order() {
    return (
        <ClientProvider>
            <ModalProvider>
                <Page />
            </ModalProvider>
        </ClientProvider>
    );
}
