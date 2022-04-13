import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import {
    forwardRef,
    ForwardRefRenderFunction,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
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

export interface ModalDialogAddProductOrderDetailsHandles {
    openModal: () => void;
}

type AddProductFormData = {
    name: string;
    price: number;
    quantity: number;
};

type Item = {
    name: string;
    price: number;
    quantity: number;
};

type Address = {
    city: string;
    complement: string;
    district: string;
    number: string;
    postalcode: string;
    street: string;
};

type Client = {
    name: string;
    address: Address;
    cpf: string;
    id: string;
    whatsapp: string;
};

type Order = {
    id: string;
    card: boolean;
    check: boolean;
    client: Client;
    createdAt: Date;
    deliveryDate: string;
    deliveryprice: number;
    deliverytime: string;
    deliverytype: string;
    deliveryTypeFormatted: string;
    discount: number;
    items: Item[];
    money: boolean;
    pix: boolean;
    subTotal: number;
    total: number;
    status: 'pendente' | 'completo';
};

interface DialogAddProductOrderDetailsCustomProps {
    children: ReactNode;
    order: Order;
    setOrder: (order: Order) => void;
}

type DialogAddProductOrderDetailsProps = ForwardRefRenderFunction<
    ModalDialogAddProductOrderDetailsHandles,
    DialogAddProductOrderDetailsCustomProps
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

const DialogAddProductOrderDetailsBase: DialogAddProductOrderDetailsProps =
    function (
        {
            order: orderProps,
            children,
            setOrder,
            order,
        }: DialogAddProductOrderDetailsCustomProps,
        ref,
    ) {
        const formRef = useRef<FormHandles>(null);
        const [open, setOpen] = useState(false);

        const Dialog = DialogPrimitive.Root;
        const DialogTrigger = DialogPrimitive.Trigger;
        const DialogContent = Content;
        const DialogTitle = StyledTitle;
        const DialogDescription = StyledDescription;
        const DialogClose = DialogPrimitive.Close;

        useImperativeHandle(ref, () => {
            return {
                openModal: () => {
                    setOpen(true);
                },
            };
        });

        const handleCloseModal = useCallback(() => {
            setOpen(false);
        }, []);

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

        const {
            register,
            handleSubmit,
            formState,
            setError,
            setFocus,
            setValue,
        } = useForm({
            resolver: useYupValidationResolver(schema),
        });

        const { errors } = formState;

        const onSubmit = useCallback(
            async (data: AddProductFormData) => {
                const newItems = [
                    ...order.items,
                    {
                        name: data.name,
                        price: data.price,
                        quantity: data.quantity,
                    },
                ];
                setOrder({ ...order, items: newItems });
                setValue('name', '');
                setValue('price', '');
                setValue('quantity', '');
                handleCloseModal();
            },
            [setValue, order, setOrder, handleCloseModal],
        );

        return (
            <Dialog open={open}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent
                    onEscapeKeyDown={event => {
                        event.preventDefault();
                        handleCloseModal();
                    }}
                >
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
                    <CloseIcon
                        onClick={() => {
                            handleCloseModal();
                        }}
                    />
                </DialogContent>
            </Dialog>
        );
    };

export const DialogAddProductOrderDetails = forwardRef(
    DialogAddProductOrderDetailsBase,
);
