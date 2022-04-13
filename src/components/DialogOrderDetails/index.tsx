import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, {
    forwardRef,
    ForwardRefRenderFunction,
    ReactNode,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useOrder } from '../../hooks/useOrder';
import { formatPrice } from '../../util/format';
import Accordion from '../Accordion';
import Button from '../Button';
import {
    DialogAddProductOrderDetails,
    ModalDialogAddProductOrderDetailsHandles,
} from '../DialogAddProductOrderDetails';
import InputSimple from '../InputSimple';
import ProductTable from '../ProductTable';
import {
    AddButton,
    AddIcon,
    CloseIcon,
    Flex,
    StyledContent,
    StyledDescription,
    StyledOverlay,
    StyledTitle,
    TrashIconOrder,
} from './style';

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

type DialogOrderDetailsProps = ForwardRefRenderFunction<
    ModalHandles,
    DialogOrderDetailsCustomProps
>;

type DialogOrderDetailsCustomProps = {
    children: ReactNode;
    onDelete: (id: string) => void;
    order: Order;
};

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

export interface ModalHandles {
    openModal: (/* order: Order */) => void;
    setOrder: (order: Order) => void;
}

const DialogOrderDetailsBase: DialogOrderDetailsProps = function (
    { order: orderProps, children, onDelete }: DialogOrderDetailsCustomProps,
    ref,
) {
    const modalRef = useRef<ModalDialogAddProductOrderDetailsHandles>(null);
    const Dialog = DialogPrimitive.Root;
    const DialogTrigger = DialogPrimitive.Trigger;
    const DialogContent = Content;
    const DialogTitle = StyledTitle;
    const DialogDescription = StyledDescription;
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState<Order>(orderProps);
    const [discount, setDiscount] = useState(order.discount.toString());
    const [delivery, setDelivery] = useState(order.deliveryprice.toString());
    const { updateOrderOnDbWithOrder } = useOrder();

    const inputDisabled = useMemo(
        () => order.status !== 'pendente',
        [order.status],
    );

    const subTotal = useMemo(
        () =>
            order.items.reduce(
                (sumTotal, item) => sumTotal + item.quantity * item.price,
                0,
            ),
        [order.items],
    );

    const total = useMemo(() => {
        const discountTotal = Number(discount.replace(',', '.'));
        const deliveryTotal = Number(delivery.replace(',', '.'));
        return subTotal - discountTotal + deliveryTotal;
    }, [delivery, discount, subTotal]);

    useEffect(() => {
        // oie
    }, [subTotal, total]);

    const setItems = useCallback(
        async (items: Item[]) => {
            const newOrder = {
                ...order,
                items,
            };
            setOrder(newOrder);
        },
        [order],
    );

    useImperativeHandle(ref, () => {
        return {
            openModal: () => {
                setOpen(true);
            },
            setOrder: (newOrder: Order) => {
                setOrder(newOrder);
                setDiscount(newOrder.discount.toString());
                setDelivery(newOrder.deliveryprice.toString());
            },
        };
    });

    const closeModal = useCallback(() => {
        setOpen(false);
    }, []);

    const subTotalFormatted = useMemo(() => formatPrice(subTotal), [subTotal]);

    const totalFormatted = useMemo(() => formatPrice(total), [total]);

    const itensFormatted = useMemo(
        () =>
            order.items.map(item => {
                return {
                    priceFormatted: formatPrice(item.price),
                    total: formatPrice(item.price * item.quantity),
                    ...item,
                };
            }),
        [order.items],
    );

    const handleSaveOrder = useCallback(() => {
        const updateOrder = {
            ...order,
            discount: Number(discount),
            deliveryprice: Number(delivery),
            subTotal,
            total,
        };
        updateOrderOnDbWithOrder(updateOrder);
    }, [delivery, discount, order, updateOrderOnDbWithOrder, total, subTotal]);

    const handleFinishOrder = useCallback(() => {
        const updateOrder = {
            ...order,
            discount: Number(discount),
            deliveryprice: Number(delivery),
            subTotal,
            total,
            status: order.status === 'pendente' ? 'completo' : 'pendente',
        } as Order;
        updateOrderOnDbWithOrder(updateOrder);
        setOpen(false);
    }, [delivery, discount, subTotal, total, order, updateOrderOnDbWithOrder]);

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                onEscapeKeyDown={event => {
                    event.preventDefault();
                    closeModal();
                }}
            >
                <DialogTitle>{order.deliveryTypeFormatted}</DialogTitle>
                <DialogDescription>
                    Horário : {order.deliverytime}
                </DialogDescription>
                {order.status === 'pendente' && (
                    <TrashIconOrder
                        onClick={() => {
                            alert('Será excluido');
                            onDelete(order.id);
                            closeModal();
                        }}
                    />
                )}

                <h3 style={{ marginTop: '1rem' }}>Cliente</h3>
                <p style={{ marginTop: '0.5rem' }}>
                    Nome: {order.client.name}{' '}
                </p>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <p>Cpf: {order.client.cpf}</p>
                    <p>WhatsApp: {order.client.whatsapp}</p>
                </Flex>
                <h3 style={{ marginTop: '1rem' }}>Endereço de entrega</h3>
                <Flex
                    style={{
                        justifyContent: 'space-between',
                        marginTop: '0.5rem',
                    }}
                >
                    <p>Rua: {order.client.address.street}</p>
                    <p>Número: {order.client.address.number}</p>
                </Flex>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <p>Complemento: {order.client.address.complement}</p>
                    <p>Bairro: {order.client.address.district}</p>
                </Flex>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <p>Cidade: {order.client.address.city}</p>
                    <p>Cep: {order.client.address.postalcode}</p>
                </Flex>
                {order.status === 'pendente' && (
                    <Flex
                        style={{
                            justifyContent: 'flex-end',
                            marginTop: '1rem',
                        }}
                    >
                        <DialogAddProductOrderDetails
                            order={order}
                            setOrder={setOrder}
                            ref={modalRef}
                        >
                            <AddButton
                                onClick={() => {
                                    modalRef.current?.openModal();
                                }}
                            >
                                <AddIcon />
                            </AddButton>
                        </DialogAddProductOrderDetails>
                    </Flex>
                )}
                <Accordion>
                    <Flex style={{ marginTop: '1rem' }} />
                    <ProductTable
                        items={itensFormatted}
                        setItems={setItems}
                        status={order.status}
                    />
                </Accordion>

                <h3 style={{ marginTop: '1rem' }}>Totais</h3>
                <Flex
                    style={{
                        justifyContent: 'space-between',
                        marginTop: '0.5rem',
                    }}
                >
                    <p>Sub-Total:</p>
                    <p> {subTotalFormatted}</p>
                </Flex>
                <Flex
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '0.5rem',
                    }}
                >
                    <p>Desconto:</p>

                    <InputSimple
                        name="discount"
                        value={discount}
                        type="currency"
                        disabled={inputDisabled}
                        onChange={e => {
                            setDiscount(e.target.value);
                        }}
                    />
                </Flex>
                <Flex
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '0.5rem',
                    }}
                >
                    <p>Frete:</p>
                    <InputSimple
                        name="delivery"
                        value={delivery}
                        disabled={inputDisabled}
                        type="currency"
                        onChange={e => setDelivery(e.target.value)}
                    />
                </Flex>
                <Flex
                    style={{
                        justifyContent: 'space-between',
                        marginTop: '0.5rem',
                    }}
                >
                    <h2>Total:</h2>
                    <h2> {totalFormatted}</h2>
                </Flex>

                <CloseIcon onClick={() => closeModal()} />

                <Flex>
                    <Flex style={{ alignItems: 'center', marginTop: '2rem' }}>
                        <Button
                            buttonType="secundary"
                            onClick={handleFinishOrder}
                        >
                            {order.status === 'pendente'
                                ? 'Finalizar Pedido'
                                : 'Restaurar Pedido'}
                        </Button>
                    </Flex>

                    <Flex
                        style={{
                            justifyContent: 'flex-end',
                            marginTop: '2rem',
                        }}
                    >
                        <Button
                            buttonType="outline"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            Cancelar
                        </Button>
                        {order.status === 'pendente' && (
                            <Button
                                style={{ marginLeft: '2rem' }}
                                onClick={() => {
                                    alert('Será salvo!');
                                    handleSaveOrder();
                                    closeModal();
                                }}
                            >
                                Salvar
                            </Button>
                        )}
                    </Flex>
                </Flex>
            </DialogContent>
        </Dialog>
    );
};

export const DialogOrderDetails = forwardRef(DialogOrderDetailsBase);
