import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { useCallback, useRef } from 'react';
import Button from '../Button';
import InputOrder from '../InputOrder';
import {
    CloseIcon,
    Flex,
    StyledContent,
    StyledDescription,
    StyledOverlay,
    StyledTitle,
} from './style';
import { useOrder } from '../../hooks/useOrder';

type AddProductFormData = {
    name: string;
    price: number;
    quantity: number;
};

function Content({ children, ...props }) {
    return (
        <DialogPrimitive.Portal>
            <StyledOverlay />
            <StyledContent {...props}>{children}</StyledContent>
        </DialogPrimitive.Portal>
    );
}

export default function DialogAddProductOrder({ children, ...props }) {
    const formRef = useRef<FormHandles>(null);
    const { addItem } = useOrder();

    const Dialog = DialogPrimitive.Root;
    const DialogTrigger = DialogPrimitive.Trigger;
    const DialogContent = Content;
    const DialogTitle = StyledTitle;
    const DialogDescription = StyledDescription;
    const DialogClose = DialogPrimitive.Close;

    const schema = yup.object().shape({
        name: yup.string().required('Descrição Obrigatória'),
        price: yup
            .number()
            .positive('Preço não pode ser negativo')
            .required('Preço obrigatório'),
        quantity: yup
            .number()
            .positive('Quantidade deve ser positiva')
            .required('Quantidade obrigatória'),
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
        useForm({
            resolver: useYupValidationResolver(schema),
        });

    const { errors } = formState;

    const onSubmit = useCallback(
        async (data: AddProductFormData) => {
            const itemIsAdded = addItem(data);
            if (itemIsAdded) {
                setValue('name', '');
                setValue('price', '');
                setValue('quantity', '');
            }
        },
        [addItem, setValue],
    );

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>Adicionar Produto</DialogTitle>
                <DialogDescription>
                    Preencha os campos para adicionar um novo produto
                </DialogDescription>
                <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                    <Flex
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <InputOrder
                            name="name"
                            label="Descrição"
                            setFocus={setFocus}
                            register={register}
                            error={errors.name}
                            style={{ width: '24rem' }}
                        />
                    </Flex>
                    <Flex
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <InputOrder
                            name="price"
                            label="Preço"
                            type="currency"
                            error={errors.price}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '4rem' }}
                        />
                        <InputOrder
                            name="quantity"
                            label="Quantidade"
                            type="float"
                            error={errors.quantity}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '4rem' }}
                        />
                        <Flex
                            style={{
                                marginTop: 'auto',
                            }}
                        >
                            <DialogClose asChild>
                                <Button onClick={handleSubmit(onSubmit)}>
                                    Salvar
                                </Button>
                            </DialogClose>
                        </Flex>
                    </Flex>
                </Form>
                <DialogClose asChild>
                    <CloseIcon />
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
