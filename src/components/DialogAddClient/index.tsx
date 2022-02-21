import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FormHandles } from '@unform/core';
import { ReactNode, useCallback, useRef } from 'react';
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

type FormValues = {
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

interface DialogAddClientProps {
    children: ReactNode;
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

export default function DialogAddClient({
    children,
    ...props
}: DialogAddClientProps) {
    const { changeClient, client } = useClient();
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

    const useYupValidationResolver = schemaOn =>
        useCallback(
            async data => {
                try {
                    const values = await schemaOn.validate(data, {
                        abortEarly: false,
                    });
                    return {
                        values,
                        errors: {},
                    };
                } catch (err) {
                    return {
                        values: {},
                        errors: err.inner.reduce(
                            (allErrors, currentError) => ({
                                ...allErrors,
                                [currentError.path]: {
                                    type: currentError.type ?? 'validation',
                                    message: currentError.message,
                                },
                            }),
                            {},
                        ),
                    };
                }
            },
            [schemaOn],
        );

    const { register, handleSubmit, formState, setError, setFocus, setValue } =
        useForm<FormValues>({
            resolver: useYupValidationResolver(schema),
        });

    const { errors } = formState;

    async function handleAddClient() {
        handleSubmit(async data => {
            try {
                // Mandar pro firebase
                changeClient(data);
            } catch (err) {
                const error = errorResolverFirebase(err);
                alert(error);
            }
        })();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
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
}
