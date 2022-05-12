import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FormHandles } from '@unform/core';
import {
    forwardRef,
    ForwardRefRenderFunction,
    ReactNode,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
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
import { useClient } from '../../hooks/useClient';
import { useYupValidationResolver } from '../../util/useYupValidationResolver';

type FormValues = {
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

export interface ModalDialogAddClientHandles {
    openModal: () => void;
    closeModal: () => void;
}

interface DialogAddClientCustomProps {
    children: ReactNode;
}

type DialogAddClientProps = ForwardRefRenderFunction<
    ModalDialogAddClientHandles,
    DialogAddClientCustomProps
>;

interface ContentProps extends DialogPrimitive.DialogContentProps {
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

const DialogAddClientBase: DialogAddClientProps = function (
    { children }: DialogAddClientCustomProps,
    ref,
) {
    const { changeClient, saveClientOnDb, selectClientOnDbByCpf } = useClient();
    const [openModal, setOpenModal] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            openModal: () => {
                setOpenModal(true);
            },
            closeModal: () => {
                setOpenModal(false);
            },
        };
    });

    const formRef = useRef<FormHandles>(null);
    const Dialog = DialogPrimitive.Root;
    const DialogTrigger = DialogPrimitive.Trigger;
    const DialogContent = Content;
    const DialogTitle = StyledTitle;
    const DialogDescription = StyledDescription;
    const DialogClose = DialogPrimitive.Close;

    const schema = yup.object().shape({
        name: yup.string().required('Nome Obrigatório'),
        address: yup.string().required('Favor preencher o endereço'),
        cpf: yup.string().required('Favor preencher o cpf'),
    });

    const { register, handleSubmit, formState, setFocus } = useForm<FormValues>(
        {
            resolver: useYupValidationResolver(schema),
        },
    );

    const { errors } = formState;
    const [isAdding, setIsAdding] = useState(false);

    async function handleAddClient() {
        handleSubmit(async data => {
            try {
                setIsAdding(true);
                const clientExists = await selectClientOnDbByCpf(data.cpf);
                if (clientExists) {
                    alert('Cpf já cadastrado');
                    return;
                }
                await changeClient(data);
                await saveClientOnDb();
                setOpenModal(false);
                // eslint-disable-next-line
            } catch (err: any) {
                const error = errorResolverFirebase(err);
                alert(error);
            } finally {
                setIsAdding(false);
            }
        })();
    }

    return (
        <Dialog open={openModal}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                onEscapeKeyDown={event => {
                    event.preventDefault();
                    setOpenModal(false);
                }}
            >
                <DialogTitle>Adicionar Cliente</DialogTitle>
                <DialogDescription>
                    Preencha os campos para adicionar um novo cliente
                </DialogDescription>

                <Form ref={formRef} onSubmit={handleAddClient}>
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
                    <Flex style={{}}>
                        <InputOrder
                            name="address"
                            label="Endereço"
                            error={errors.address}
                            setFocus={setFocus}
                            register={register}
                            containerStyle={{ width: '20rem' }}
                        />
                        <Flex style={{ width: '1rem' }} />
                        <InputOrder
                            name="number"
                            label="Número"
                            error={errors.number}
                            setFocus={setFocus}
                            register={register}
                        />
                    </Flex>
                    <Flex style={{}}>
                        <InputOrder
                            name="district"
                            label="Bairro"
                            error={errors.district}
                            setFocus={setFocus}
                            register={register}
                            containerStyle={{ width: '20rem' }}
                        />
                        <Flex style={{ width: '1rem' }} />
                        <InputOrder
                            name="complement"
                            label="Complemento"
                            error={errors.complement}
                            setFocus={setFocus}
                            register={register}
                        />
                    </Flex>
                    <Flex style={{}}>
                        <InputOrder
                            name="city"
                            label="Cidade"
                            error={errors.city}
                            setFocus={setFocus}
                            register={register}
                            containerStyle={{ width: '20rem' }}
                        />
                        <Flex style={{ width: '1rem' }} />
                        <InputOrder
                            name="postalcode"
                            label="CEP"
                            type="postalcode"
                            error={errors.postalcode}
                            setFocus={setFocus}
                            register={register}
                        />
                    </Flex>
                    <Flex>
                        <DialogClose asChild>
                            <Button
                                buttonType="outline"
                                style={{
                                    marginTop: '2rem',
                                    marginRight: 'auto',
                                }}
                            >
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button
                            style={{
                                marginTop: '2rem',
                                marginLeft: 'auto',
                            }}
                            type="submit"
                            loading={isAdding}
                            loadingContainer={{
                                width: '10rem',
                                height: '1.25rem',
                            }}
                        >
                            Adicionar novo cliente
                        </Button>
                    </Flex>
                </Form>

                <DialogClose asChild>
                    <CloseIcon />
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export const DialogAddClient = forwardRef(DialogAddClientBase);
