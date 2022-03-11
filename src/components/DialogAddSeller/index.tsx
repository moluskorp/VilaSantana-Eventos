import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FormHandles } from '@unform/core';
import { ReactNode, useRef } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {
    CloseIcon,
    Flex,
    Form,
    StyledContent,
    StyledDescription,
    StyledOverlay,
    StyledTitle,
} from './style';
import Button from '../Button';
import InputOrder from '../InputOrder';
import errorResolverFirebase from '../../util/errorResolverFirebase';
import { useSeller } from '../../hooks/useSeller';
import { useYupValidationResolver } from '../../util/useYupValidationResolver';

type FormValues = {
    id: string;
    cpf: string;
    name: string;
    whatsapp: string;
};

interface DialogAddSellerProps {
    children: ReactNode;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    setSearchModalOpen: (open: boolean) => void;
}

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

export default function DialogAddSeller({
    children,
    modalOpen,
    setModalOpen,
    setSearchModalOpen,
    ...props
}: DialogAddSellerProps) {
    const { seller, changeSeller, saveSellerOnDb, selectSellerOnDb } =
        useSeller();

    const formRef = useRef<FormHandles>(null);
    const Dialog = DialogPrimitive.Root;
    const DialogTrigger = DialogPrimitive.Trigger;
    const DialogContent = Content;
    const DialogTitle = StyledTitle;
    const DialogDescription = StyledDescription;
    const DialogClose = DialogPrimitive.Close;

    const schema = yup.object().shape({
        name: yup.string().required('Nome Obrigatório'),
        cpf: yup.string().required('Favor preencher o cpf'),
    });

    const { register, handleSubmit, formState, setError, setFocus, setValue } =
        useForm<FormValues>({
            resolver: useYupValidationResolver(schema),
        });

    const { errors } = formState;

    async function handleAddSeller() {
        handleSubmit(async data => {
            try {
                changeSeller(data);
                await saveSellerOnDb();
                setSearchModalOpen(false);
                setModalOpen(false);
                // Mandar pro firebase
            } catch (err) {
                const error = errorResolverFirebase(err);
                alert(error);
            }
        })();
    }

    return (
        <Dialog open={modalOpen}>
            {children}
            <DialogContent>
                <DialogTitle>Adicionar Vendedor</DialogTitle>
                <DialogDescription>
                    Preencha os campos para adicionar um novo vendedor
                </DialogDescription>

                <Form ref={formRef} onSubmit={handleAddSeller}>
                    <Flex>
                        <InputOrder
                            name="cpf"
                            label="Cpf / CNPJ"
                            type="integer"
                            error={errors.cpf}
                            setFocus={setFocus}
                            register={register}
                        />
                    </Flex>
                    <Flex style={{}}>
                        <InputOrder
                            name="name"
                            label="Nome"
                            type="normal"
                            error={errors.name}
                            setFocus={setFocus}
                            register={register}
                            containerStyle={{ width: '20rem' }}
                        />
                        <Flex style={{ width: '1rem' }} />
                        <InputOrder
                            name="whatsapp"
                            label="Whatsapp"
                            type="telephone"
                            error={errors.whatsapp}
                            setFocus={setFocus}
                            register={register}
                        />
                    </Flex>
                    <Flex>
                        <Button
                            buttonType="outline"
                            onClick={() => {
                                setModalOpen(false);
                            }}
                            style={{
                                marginTop: '2rem',
                                marginRight: 'auto',
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            style={{
                                marginTop: '2rem',
                                marginLeft: 'auto',
                            }}
                            type="submit"
                        >
                            Adicionar novo vendedor
                        </Button>
                    </Flex>
                </Form>
                <CloseIcon onClick={() => setModalOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
