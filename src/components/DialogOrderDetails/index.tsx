import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { forwardRef, ReactNode, useMemo, useState } from 'react';
import { formatPrice } from '../../util/format';
import Accordion from '../Accordion';
import ProductTable from '../ProductTable';
import {
    CloseIcon,
    Flex,
    Form,
    StyledContent,
    StyledDescription,
    StyledOverlay,
    StyledTitle,
    TrashIcon,
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
    deliveryDate: Date;
    deliveryprice: number;
    deliverytime: string;
    deliverytype: string;
    discount: number;
    items: Item[];
    money: boolean;
    pix: boolean;
    subTotal: number;
    total: number;
};

interface DialogOrderDetailsProps {
    children: ReactNode;
    order: Order;
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

export default function DialogOrderDetails({
    children,
    order,
}: DialogOrderDetailsProps) {
    const Dialog = DialogPrimitive.Root;
    const DialogTrigger = DialogPrimitive.Trigger;
    const DialogContent = Content;
    const DialogTitle = StyledTitle;
    const DialogDescription = StyledDescription;
    const DialogClose = DialogPrimitive.Close;

    const subTotalFormatted = useMemo(
        () => formatPrice(order.subTotal),
        [order.subTotal],
    );
    const totalFormatted = useMemo(
        () => formatPrice(order.total),
        [order.total],
    );
    const deliveryPriceFormatted = useMemo(
        () => formatPrice(order.deliveryprice),
        [order.deliveryprice],
    );
    const discountFormatted = useMemo(
        () => formatPrice(order.discount),
        [order.discount],
    );

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

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>Detalhes do pedido</DialogTitle>
                <DialogDescription>Veja aqui os detalhes</DialogDescription>
                <TrashIconOrder />
                <h3 style={{ marginTop: '1rem' }}>Cliente</h3>
                <p>Nome: {order.client.name} </p>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <p>Cpf: {order.client.cpf}</p>
                    <p>WhatsApp: {order.client.whatsapp}</p>
                </Flex>
                <h3 style={{ marginTop: '1rem' }}>Endereço de entrega</h3>
                <Flex style={{ justifyContent: 'space-between' }}>
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
                <Accordion>
                    <Flex style={{ marginTop: '1rem' }} />
                    <ProductTable items={itensFormatted} />
                </Accordion>

                <h3 style={{ marginTop: '1rem' }}>Totais</h3>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <p>Sub-Total:</p>
                    <p> {subTotalFormatted}</p>
                </Flex>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <p>Desconto:</p>
                    <p> {discountFormatted}</p>
                </Flex>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <p>Frete:</p>
                    <p> {deliveryPriceFormatted}</p>
                </Flex>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <h2>Total:</h2>
                    <h2> {totalFormatted}</h2>
                </Flex>
                <DialogClose asChild>
                    <CloseIcon />
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
