import * as DialogPrimitive from '@radix-ui/react-dialog';
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

function Content({ children, ...props }) {
    return (
        <DialogPrimitive.Portal>
            <StyledOverlay />
            <StyledContent {...props}>{children}</StyledContent>
        </DialogPrimitive.Portal>
    );
}

export default function DialogSearchClient({ children, ...props }) {
    const Dialog = DialogPrimitive.Root;
    const DialogTrigger = DialogPrimitive.Trigger;
    const DialogContent = Content;
    const DialogTitle = StyledTitle;
    const DialogDescription = StyledDescription;
    const DialogClose = DialogPrimitive.Close;
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
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
                    <DialogClose asChild>
                        <Button
                            buttonType="outline"
                            containerStyle={{ marginLeft: '1rem' }}
                        >
                            Cancelar
                        </Button>
                    </DialogClose>
                </Flex>
                <DialogClose asChild>
                    <CloseIcon />
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
