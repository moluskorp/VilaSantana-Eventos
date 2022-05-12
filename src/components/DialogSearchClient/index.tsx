import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
    forwardRef,
    ForwardRefRenderFunction,
    ReactNode,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useClient } from '../../hooks/useClient';
import { ModalProvider } from '../../hooks/useModal';
import Button from '../Button';
import ClientSearchDiv from '../ClientSearchDiv';
import {
    DialogAddClient,
    ModalDialogAddClientHandles,
} from '../DialogAddClient';
import Input from '../Input';
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

type Client = {
    id: string;
    name: string;
    address: string;
    number: string;
    district: string;
    whatsapp: string;
    cpf: string;
    complement: string;
    city: string;
    postalcode: string;
};

type JsonProps = {
    name: string;
    address: string;
    number: string;
    district: string;
    whatsapp: string;
    cpf: string;
    complement: string;
    city: string;
    postalcode: string;
};

function Content({ children, ...props }: ContentProps) {
    return (
        <DialogPrimitive.Portal>
            <StyledOverlay />
            <StyledContent {...props}>{children}</StyledContent>
        </DialogPrimitive.Portal>
    );
}

export interface ModalDialogSearchClientHandles {
    openModal: () => void;
    closeModal: () => void;
}

interface DialogSearchClientCustomProps {
    canCancel: boolean;
}

type DialogSearchClientProps = ForwardRefRenderFunction<
    ModalDialogSearchClientHandles,
    DialogSearchClientCustomProps
>;

const DialogSearchClientBase: DialogSearchClientProps = function (
    { canCancel: cancel }: DialogSearchClientCustomProps,
    ref,
) {
    const modalAddClientRef = useRef<ModalDialogAddClientHandles>(null);
    const { client } = useClient();
    const Dialog = DialogPrimitive.Root;
    // const DialogTrigger = DialogPrimitive.Trigger;
    const DialogContent = Content;
    const DialogTitle = StyledTitle;
    const DialogDescription = StyledDescription;
    const [open, setOpen] = useState(false);
    const [canCancel, setCanCancel] = useState(cancel);
    const [value, setValue] = useState('');
    const [result, setResult] = useState<Client[]>([]);
    const [names, setNames] = useState<JsonProps[]>([]);

    useImperativeHandle(ref, () => {
        return {
            openModal: () => {
                setOpen(true);
            },
            closeModal: () => {
                setOpen(false);
            },
        };
    });

    useEffect(() => {
        fetch(
            'https://vilsantana-eventos-default-rtdb.firebaseio.com/clients.json',
        )
            .then(response => response.json())
            .then(responseData => {
                setNames(responseData);
            })
            .catch(err => {
                alert(err);
            });
    }, [client, setOpen]);

    useEffect(() => {
        if (value.length > 0) {
            setResult([]);
            const searchQuery = value.toLowerCase();
            // es-lint-disable-next-line
            for (const key in names) {
                const name = names[key].name.toLowerCase() as string;
                const searchSuccess = name.indexOf(searchQuery) !== -1;

                if (searchSuccess) {
                    const people = {
                        id: key,
                        ...names[key],
                    };
                    setResult(prevResult => [...prevResult, people]);
                }
            }
        } else {
            setResult([]);
        }
    }, [value, names]);

    const handleCloseModal = useCallback(() => {
        if (canCancel) {
            setOpen(false);
        } else if (!client) {
            alert('Primeiro selecione um cliente');
        }
    }, [canCancel, client]);

    return (
        <ModalProvider>
            <Dialog open={open}>
                <DialogContent>
                    <DialogTitle>Buscar um Cliente</DialogTitle>
                    <DialogDescription>
                        Selecione um cliente na lista ou clique no botão para
                        adicionar um novo
                    </DialogDescription>
                    <Input
                        name="clientSearch"
                        type="normal"
                        placeholder="Nome do cliente"
                        onChange={event => setValue(event.target.value)}
                        value={value}
                    />
                    {result.map(resulta => (
                        <ClientSearchDiv
                            key={resulta.id}
                            client={resulta}
                            setCanCancel={setCanCancel}
                            closeModal={setOpen}
                        />
                    ))}
                    <Flex
                        style={{
                            marginLeft: 'auto',
                            justifyContent: 'end',
                            marginTop: '1rem',
                        }}
                    >
                        <DialogAddClient ref={modalAddClientRef}>
                            <Button
                                buttonType="secundary"
                                onClick={() => {
                                    modalAddClientRef.current?.openModal();
                                }}
                            >
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
        </ModalProvider>
    );
};

export const DialogSearchClient = forwardRef(DialogSearchClientBase);
