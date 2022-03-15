import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { ReactNode, useEffect, useState } from 'react';
import { useSeller } from '../../hooks/useSeller';
import Button from '../Button';
import DialogAddSeller from '../DialogAddSeller';
import Input from '../Input';
import SellerSearchDiv from '../SellerSearchDiv';
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

type Seller = {
    id: string;
    name: string;
    whatsapp: string;
    cpf: string;
};

type JsonProps = {
    name: string;
    whatsapp: string;
    cpf: string;
};

function Content({ children, ...props }: ContentProps) {
    return (
        <DialogPrimitive.Portal>
            <StyledOverlay />
            <StyledContent {...props}>{children}</StyledContent>
        </DialogPrimitive.Portal>
    );
}

interface DialogSearchSellerProps {
    children: ReactNode;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
}

export default function DialogSearchSeller({
    children,
    modalOpen,
    setModalOpen,
}: DialogSearchSellerProps) {
    const { changeSeller } = useSeller();
    const Dialog = DialogPrimitive.Root;
    const DialogContent = Content;
    const DialogTitle = StyledTitle;
    const DialogDescription = StyledDescription;
    const [value, setValue] = useState('');
    const [result, setResult] = useState<Seller[]>([]);
    const [names, setNames] = useState<JsonProps[]>([]);
    const [addSellerModalOpen, setAddSellerModalOpen] = useState(false);

    useEffect(() => {
        fetch(
            'https://vilsantana-eventos-default-rtdb.firebaseio.com/sellers.json',
        )
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                setNames(responseData);
            })
            .catch(err => {
                alert(err.message);
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
                    const sellsman = {
                        id: key,
                        ...names[key],
                    };
                    setResult(prevResult => [...prevResult, sellsman]);
                }
            }
        } else {
            const namesEmpty: Seller[] = [];
            let index = 0;
            for (const key in names) {
                if (index > 9) {
                    continue;
                }
                const sellsman = {
                    id: key,
                    ...names[key],
                };
                namesEmpty.push(sellsman);
                index++;
            }
            setResult(namesEmpty);
        }
    }, [value, names]);

    return (
        <Dialog open={modalOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>Buscar um Vendedor</DialogTitle>
                <DialogDescription>
                    Selecione um vendedor na lista ou clique no botão para
                    adicionar um novo
                </DialogDescription>
                <Input
                    name="sellerSearch"
                    type="normal"
                    placeholder="Nome do vendedor"
                    onChange={event => setValue(event.target.value)}
                    value={value}
                />
                {result.map(resulta => (
                    <SellerSearchDiv
                        key={resulta.id}
                        seller={resulta}
                        onClick={() => {
                            changeSeller(resulta);
                            setModalOpen(false);
                        }}
                    />
                ))}
                <Flex
                    style={{
                        marginLeft: 'auto',
                        justifyContent: 'end',
                        marginTop: '1rem',
                    }}
                >
                    <DialogAddSeller
                        modalOpen={addSellerModalOpen}
                        setModalOpen={setAddSellerModalOpen}
                        setSearchModalOpen={setModalOpen}
                    >
                        <Button
                            buttonType="secundary"
                            onClick={() => setAddSellerModalOpen(true)}
                        >
                            Cadastrar novo vendedor
                        </Button>
                    </DialogAddSeller>
                    <Button
                        buttonType="outline"
                        containerStyle={{ marginLeft: '1rem' }}
                        onClick={() => setModalOpen(false)}
                    >
                        Cancelar
                    </Button>
                </Flex>
                <CloseIcon onClick={() => setModalOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
