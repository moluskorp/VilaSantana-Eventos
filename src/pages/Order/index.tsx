import { ClientProvider } from '../../hooks/useClient';
import { ModalProvider } from '../../hooks/useModal';
import { SellerProvider } from '../../hooks/useSeller';
import Page from './Page';

export default function Order() {
    return (
        <ClientProvider>
            <SellerProvider>
                <ModalProvider>
                    <Page />
                </ModalProvider>
            </SellerProvider>
        </ClientProvider>
    );
}
