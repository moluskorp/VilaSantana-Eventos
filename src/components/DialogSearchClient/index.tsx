import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ReactNode, useEffect } from 'react';
import { useClient } from '../../hooks/useClient';
import { useModal } from '../../hooks/useModal';
import Button from '../Button';
import ClientTable from '../ClientTable';
import DialogAddClient from '../DialogAddClient';
import {
    CloseIcon,
    Flex,
    StyledContent,
    StyledDescription,
    StyledOverlay,
    StyledTitle,
} from './style';

interface ContentProps {
    children: ReactNode;
}

function Content({ children, ...props }: ContentProps) {
    return (
        <DialogPrimitive.Portal>
            <StyledOverlay />
            <StyledContent {...props}>{children}</StyledContent>
        </DialogPrimitive.Portal>
    );
}

export default function DialogSearchClient() {
    const { open, setOpen } = useModal();
    const { client } = useClient();
    const Dialog = DialogPrimitive.Root;
    // const DialogTrigger = DialogPrimitive.Trigger;
    const DialogContent = Content;
    const DialogTitle = StyledTitle;
    const DialogDescription = StyledDescription;
    const DialogClose = DialogPrimitive.Close;

    useEffect(() => {
        console.log('passou aqui no modal');
    }, [open]);

    function handleCloseModal() {
        if (client) {
            setOpen(false);
        } else {
            alert('Primeiro selecione um cliente');
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogTitle>Buscar um Cliente</DialogTitle>
                <DialogDescription>
                    Selecione um cliente na lista ou clique no botão para
                    adicionar um novo
                </DialogDescription>
                <ClientTable />
                <Flex
                    style={{
                        marginLeft: 'auto',
                        justifyContent: 'end',
                        marginTop: '1rem',
                    }}
                >
                    <DialogAddClient>
                        <Button buttonType="secundary">
                            Cadastrar novo cliente
                        </Button>
                    </DialogAddClient>
                    <Button
                        buttonType="outline"
                        containerStyle={{ marginLeft: '1rem' }}
                        onClick={handleCloseModal}
                    >
                        Cancelar
                    </Button>
                </Flex>
                <CloseIcon onClick={handleCloseModal} />
            </DialogContent>
        </Dialog>
    );
}
