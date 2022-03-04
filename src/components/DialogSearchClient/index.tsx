import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ReactNode, useEffect, useState } from 'react';
import { useClient } from '../../hooks/useClient';
import { useModal } from '../../hooks/useModal';
import Button from '../Button';
import ClientSearchDiv from '../ClientSearchDiv';
import DialogAddClient from '../DialogAddClient';
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

export default function DialogSearchClient() {
    const { open, setOpen } = useModal();
    const { client } = useClient();
    const Dialog = DialogPrimitive.Root;
    // const DialogTrigger = DialogPrimitive.Trigger;
    const DialogContent = Content;
    const DialogTitle = StyledTitle;
    const DialogDescription = StyledDescription;
    const DialogClose = DialogPrimitive.Close;
    const [value, setValue] = useState('');
    const [result, setResult] = useState<Client[]>([]);
    const [names, setNames] = useState<JsonProps[]>([]);

    useEffect(() => {
        fetch(
            'https://vilsantana-eventos-default-rtdb.firebaseio.com/clients.json',
        )
            .then(response => response.json())
            .then(responseData => {
                setNames(responseData);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (value.length > 0) {
            setResult([]);
            const searchQuery = value.toLowerCase();
            for (const key in names) {
                const name = names[key].name.toLowerCase() as string;
                const searchSuccess = name.indexOf(searchQuery) !== -1;
                console.log(`Search Success: ${searchSuccess}`);

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
                <Input
                    name="clientSearch"
                    type="normal"
                    placeholder="Nome do cliente"
                    onChange={event => setValue(event.target.value)}
                    value={value}
                />
                {result.map(resulta => (
                    <ClientSearchDiv key={resulta.id} client={resulta} />
                ))}
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
