import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CheckIcon } from '@radix-ui/react-icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import InputOrder from '../../components/InputOrder';
import {
    Container,
    Nav,
    TitleTotal,
    ContainerRight,
    ContainerMaior,
    ClientIcon,
    ContainerLeft,
    Avatar,
    ContainerVendedor,
    ChangeSeller,
    HomeIcon,
    ContainerLineInput,
    TipoEntrega,
    RadioGroupRadio,
    RadioGroupIndicator,
    Label,
    Flex,
    RadioGroup,
    Checkbox,
    CheckboxIndicator,
    AddButton,
    AddIcon,
} from './styles';
import Button from '../../components/Button';
import ProductOrder from '../../components/ProductOrder';
import Divider from '../../components/Divider';
import Footer from '../../components/Footer';
import { formatPrice } from '../../util/format';
import { useOrder } from '../../hooks/useOrder';
import DialogAddProductOrder from '../../components/DialogAddProductOrder';
import stringToNumber from '../../util/stringToNumber';
import DialogSearchClient from '../../components/DialogSearchClient';
import useAuth from '../../hooks/useAuth';
import { useClient } from '../../hooks/useClient';
import { useModal } from '../../hooks/useModal';
import OrderReport from '../../reports/OrderReport';
import { useYupValidationResolver } from '../../util/useYupValidationResolver';
import ScrollArea from '../../components/ScrollArea';
import DialogSearchSeller from '../../components/DialogSearchSeller';
import { useSeller } from '../../hooks/useSeller';

export default function Page() {
    const { user } = useAuth();
    const { client } = useClient();
    const navigate = useNavigate();
    const { open, setOpen } = useModal();
    const [modalSellerOpen, setModalSellerOpen] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().required('Nome obrigatório'),
        deliverydate: yup
            .date()
            .min(new Date(), 'Selecionar uma data posterior a hoje')
            .required('Campo obrigatório'),
        deliveryhour: yup.string().required('Hora obrigatória'),
    });

    const { register, handleSubmit, formState, setError, setFocus, setValue } =
        useForm({
            resolver: useYupValidationResolver(schema),
        });
    const { errors } = formState;

    const {
        order: itens,
        total: totalNumber,
        setDiscount,
        setDelivery,
        delivery: deliveryTotal,
        discount: discountTotal,
        subTotal,
    } = useOrder();

    const { seller } = useSeller();

    const deliveryFormatted = useMemo(
        () => formatPrice(deliveryTotal),
        [deliveryTotal],
    );
    const subTotalFormatted = useMemo(() => formatPrice(subTotal), [subTotal]);

    const discountFormatted = useMemo(
        () => formatPrice(discountTotal),
        [discountTotal],
    );

    const itensFormatted = useMemo(
        () =>
            itens.map(item => ({
                ...item,
                priceFormatted: formatPrice(item.price),
                subTotal: formatPrice(item.price * item.quantity),
            })),
        [itens],
    );

    const handleDiscountChange = useCallback(
        event => {
            event.preventDefault();
            const discount = stringToNumber(event.target.value);
            setDiscount(discount);
        },
        [setDiscount],
    );

    const handleDeliveryChange = useCallback(
        event => {
            event.preventDefault();
            const delivery = stringToNumber(event.target.value);
            setDelivery(delivery);
        },
        [setDelivery],
    );

    const total = useMemo(() => formatPrice(totalNumber), [totalNumber]);

    const handleFinish = useCallback(
        event => {
            const celular = `55${client?.whatsapp}`;
            const headerMessage = `Olá *${client?.name}* agradececemos o seu *pedido* segue a lista de produtos e o total\n\n`;
            let testProduct = '';
            itensFormatted.forEach(item => {
                testProduct += `Descrição: *${item.name}*\nPreço Unitário: ${item.priceFormatted} Quantidade: ${item.quantity}\nValor Total: *${item.subTotal}*\n\n`;
            });
            const totalMessage = `Sub-Total: ${subTotalFormatted} \nValor da entrega: ${deliveryFormatted}\nValor do desconto: ${discountFormatted}\nValor Total: *${total}*\n\n`;
            const finalMessage = `O vila santana agradece a sua preferência
        `;
            const textoEncode = window.encodeURIComponent(
                `${headerMessage}${testProduct}${totalMessage}${finalMessage}`,
            );
            window.open(
                `https://api.whatsapp.com/send?phone=${celular}&text=${textoEncode}`,
                '_blank',
            );
        },
        [
            client?.name,
            deliveryFormatted,
            discountFormatted,
            itensFormatted,
            total,
            client?.whatsapp,
            subTotalFormatted,
        ],
    );

    const handleBudget = useCallback(() => {
        const order = {
            client,
            products: itensFormatted,
            total,
            subTotal: 100,
            delivery: deliveryTotal,
            discount: discountTotal,
        };
        OrderReport(order);
    }, [client, deliveryTotal, itensFormatted, total, discountTotal]);

    return (
        <>
            <Header />
            <Nav>
                <ContainerLeft>
                    <h1>Faturamento</h1>
                    <ContainerMaior>
                        <ClientIcon />
                        <ContainerVendedor>
                            <p>Cliente</p>
                            <div>
                                <strong>{client?.name}</strong>
                                <strong> / </strong>
                                <strong>{client?.cpf}</strong>
                            </div>
                        </ContainerVendedor>
                        <DialogSearchClient />
                        <Flex
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            <ChangeSeller>ALTERAR</ChangeSeller>
                        </Flex>
                    </ContainerMaior>
                    <ContainerMaior>
                        <HomeIcon />
                        <strong>ENDEREÇO DE ENTREGA</strong>
                    </ContainerMaior>
                    <ContainerLineInput>
                        <InputOrder
                            name="name"
                            label="Nome"
                            error={errors.name}
                            value={client?.name}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '21.25rem' }}
                        />
                        <InputOrder
                            name="whats"
                            label="Celular/WhatsApp"
                            type="telephone"
                            error={errors.whats}
                            value={client?.whatsapp}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '15.625rem' }}
                        />
                    </ContainerLineInput>
                    <ContainerLineInput>
                        <InputOrder
                            name="address"
                            label="Endereço"
                            error={errors.address}
                            value={client?.address}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '21.25rem' }}
                        />
                        <InputOrder
                            name="number"
                            label="Número"
                            error={errors.number}
                            value={client?.number}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '15.625rem' }}
                        />
                    </ContainerLineInput>
                    <ContainerLineInput>
                        <InputOrder
                            name="district"
                            label="Bairro"
                            error={errors.district}
                            value={client?.district}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '21.25rem' }}
                        />
                        <InputOrder
                            name="complement"
                            label="Complemento"
                            error={errors.complement}
                            value={client?.complement}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '15.625rem' }}
                        />
                    </ContainerLineInput>
                    <ContainerLineInput>
                        <InputOrder
                            name="city"
                            label="Cidade"
                            error={errors.city}
                            value={client?.city}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '21.25rem' }}
                        />
                        <InputOrder
                            name="postalcode"
                            label="CEP"
                            error={errors.postalcode}
                            value={client?.cep}
                            type="postalcode"
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '15.625rem' }}
                        />
                    </ContainerLineInput>
                    <TipoEntrega>Tipo de Entrega</TipoEntrega>
                    <RadioGroup defaultValue="entrega">
                        <Flex
                            style={{
                                marginTop: '0.5rem',
                                alignItems: 'center',
                            }}
                        >
                            <RadioGroupRadio value="entrega" id="r1">
                                <RadioGroupIndicator />
                            </RadioGroupRadio>
                            <Label
                                style={{
                                    marginLeft: '1rem',
                                }}
                                htmlFor="r1"
                            >
                                Entrega
                            </Label>
                        </Flex>
                        <Flex
                            style={{
                                margin: '0.5rem 0 0 4rem',
                                alignItems: 'center',
                            }}
                        >
                            <RadioGroupRadio value="retirada" id="r2">
                                <RadioGroupIndicator />
                            </RadioGroupRadio>
                            <Label
                                style={{
                                    marginLeft: '1rem',
                                }}
                                htmlFor="r2"
                            >
                                Retirada
                            </Label>
                        </Flex>
                    </RadioGroup>
                    <ContainerLineInput>
                        <Flex>
                            <InputOrder
                                name="deliverydate"
                                label="Data de Entrega"
                                type="date"
                                error={errors.deliverydate}
                                setFocus={setFocus}
                                register={register}
                                style={{ width: '12.5rem' }}
                            />
                            <Flex style={{ marginLeft: '0.5rem' }} />
                            <InputOrder
                                name="deliveryhour"
                                label="Horário"
                                type="time"
                                error={errors.deliveryhour}
                                setFocus={setFocus}
                                register={register}
                                style={{ width: '3.25rem' }}
                            />
                        </Flex>
                        <InputOrder
                            name="deliveryprice"
                            label="Valor da Entrega"
                            type="currency"
                            error={errors.deliveryhour}
                            onChange={handleDeliveryChange}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '14.5rem' }}
                        />
                    </ContainerLineInput>
                    <Flex style={{ justifyContent: 'space-between' }}>
                        <div>
                            <TipoEntrega>Pagamento</TipoEntrega>
                            <Flex>
                                <Flex style={{ alignItems: 'center' }}>
                                    <Checkbox defaultChecked id="money">
                                        <CheckboxIndicator>
                                            <CheckIcon />
                                        </CheckboxIndicator>
                                    </Checkbox>
                                    <Label
                                        style={{
                                            paddingLeft: '0.725rem',
                                            marginTop: '0.5rem',
                                        }}
                                        htmlFor="money"
                                    >
                                        Dinheiro
                                    </Label>
                                </Flex>
                                <Flex
                                    style={{
                                        alignItems: 'center',
                                        marginLeft: '0.5rem',
                                    }}
                                >
                                    <Checkbox id="card">
                                        <CheckboxIndicator>
                                            <CheckIcon />
                                        </CheckboxIndicator>
                                    </Checkbox>
                                    <Label
                                        style={{
                                            paddingLeft: '0.725rem',
                                            marginTop: '0.5rem',
                                        }}
                                        htmlFor="card"
                                    >
                                        Cartão
                                    </Label>
                                </Flex>
                                <Flex
                                    style={{
                                        alignItems: 'center',
                                        marginLeft: '0.5rem',
                                    }}
                                >
                                    <Checkbox id="pix">
                                        <CheckboxIndicator>
                                            <CheckIcon />
                                        </CheckboxIndicator>
                                    </Checkbox>
                                    <Label
                                        style={{
                                            paddingLeft: '0.725rem',
                                            marginTop: '0.5rem',
                                        }}
                                        htmlFor="pix"
                                    >
                                        PIX
                                    </Label>
                                </Flex>
                                <Flex
                                    style={{
                                        alignItems: 'center',
                                        marginLeft: '0.5rem',
                                    }}
                                >
                                    <Checkbox id="cheque">
                                        <CheckboxIndicator>
                                            <CheckIcon />
                                        </CheckboxIndicator>
                                    </Checkbox>
                                    <Label
                                        style={{
                                            paddingLeft: '0.725rem',
                                            marginTop: '0.5rem',
                                        }}
                                        htmlFor="cheque"
                                    >
                                        Cheque
                                    </Label>
                                </Flex>
                            </Flex>
                        </div>
                        <InputOrder
                            name="discount"
                            label="Valor do Desconto"
                            type="currency"
                            error={errors.discount}
                            onChange={handleDiscountChange}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '14.5rem' }}
                        />
                    </Flex>
                    <Button
                        containerStyle={{ marginTop: '1rem' }}
                        onClick={handleFinish}
                    >
                        Finalizar Faturamento
                    </Button>
                    <Button
                        buttonType="secundary"
                        containerStyle={{
                            marginTop: '1rem',
                            marginLeft: '1rem',
                        }}
                        onClick={handleBudget}
                    >
                        Enviar Orçamento
                    </Button>
                    <Button
                        buttonType="outline"
                        containerStyle={{
                            marginTop: '1rem',
                            marginLeft: '4rem',
                        }}
                    >
                        Cancelar
                    </Button>
                </ContainerLeft>
                <ContainerRight>
                    <Container>
                        <Avatar />
                        <ContainerVendedor>
                            <p>Vendedor</p>
                            <strong>{seller?.name}</strong>
                        </ContainerVendedor>
                        <DialogSearchSeller
                            modalOpen={modalSellerOpen}
                            setModalOpen={setModalSellerOpen}
                        >
                            <ChangeSeller
                                onClick={() => {
                                    setModalSellerOpen(true);
                                }}
                            >
                                ALTERAR
                            </ChangeSeller>
                        </DialogSearchSeller>
                    </Container>
                    <Container
                        style={{
                            flexDirection: 'column',
                            alignItems: 'start',
                            justifyContent: 'space-between',
                            height: '85%',
                            boxSizing: 'border-box',
                            boxShadow: '3px 3px 3px 2px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        <Flex
                            style={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '95%',
                            }}
                        >
                            <TitleTotal>Seu Pedido</TitleTotal>
                            <DialogAddProductOrder>
                                <AddButton>
                                    <AddIcon />
                                </AddButton>
                            </DialogAddProductOrder>
                        </Flex>

                        <Divider
                            style={{
                                marginTop: '0.5rem',
                                marginLeft: '1rem',
                                marginRight: '1rem',
                                width: '90%',
                            }}
                        />
                        <ScrollArea>
                            {itensFormatted.map(item => (
                                <React.Fragment key={item.name}>
                                    <ProductOrder
                                        key={item.name}
                                        name={item.name}
                                        price={item.price}
                                        priceFormatted={item.priceFormatted}
                                        quantity={item.quantity}
                                    />
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </ScrollArea>

                        <Divider
                            style={{
                                marginLeft: '1rem',
                                marginRight: '1rem',
                                width: '90%',
                                marginTop: '0.5rem',
                            }}
                        />
                        <Flex
                            style={{
                                margin: '1rem 0 0 1rem',
                                width: '90%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <p>Entrega:</p>
                            <strong>{deliveryFormatted}</strong>
                        </Flex>
                        <Flex
                            style={{
                                margin: '1rem 0 0 1rem',
                                width: '90%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <p>Desconto:</p>
                            <strong>{discountFormatted}</strong>
                        </Flex>
                        <Divider
                            style={{
                                marginLeft: '1rem',
                                marginRight: '1rem',
                                width: '90%',
                                marginTop: '1rem',
                            }}
                        />
                        <Flex
                            style={{
                                margin: '1rem 0 1rem 1rem',
                                width: '90%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Label
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '500',
                                }}
                            >
                                Total:
                            </Label>
                            <Label
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                {total}
                            </Label>
                        </Flex>
                    </Container>
                </ContainerRight>
            </Nav>
            <Footer />
        </>
    );
}
