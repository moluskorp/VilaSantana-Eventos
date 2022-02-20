import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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

const addOrderFormSchema = yup.object().shape({});

export default function Order() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState, setError, setFocus, setValue } =
        useForm({
            resolver: yupResolver(addOrderFormSchema),
        });
    const { errors } = formState;

    useEffect(() => {
        if (!user) {
            navigate('/Login');
        }
    }, [user, navigate]);

    const {
        order: itens,
        total: totalNumber,
        setDiscount,
        setDelivery,
        delivery: deliveryTotal,
        discount: discountTotal,
    } = useOrder();

    const deliveryFormatted = useMemo(
        () => formatPrice(deliveryTotal),
        [deliveryTotal],
    );

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
                                <strong>Carlos Cesar Baratella Junior</strong>
                                <strong> / </strong>
                                <strong>399.075.378-96</strong>
                            </div>
                        </ContainerVendedor>
                        <DialogSearchClient>
                            <ChangeSeller>ALTERAR</ChangeSeller>
                        </DialogSearchClient>
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
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '21.25rem' }}
                        />
                        <InputOrder
                            name="whats"
                            label="Celular/WhatsApp"
                            type="telephone"
                            error={errors.whats}
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
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '21.25rem' }}
                        />
                        <InputOrder
                            name="number"
                            label="Número"
                            error={errors.number}
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
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '21.25rem' }}
                        />
                        <InputOrder
                            name="complement"
                            label="Complemento"
                            error={errors.complement}
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
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '21.25rem' }}
                        />
                        <InputOrder
                            name="postalcode"
                            label="CEP"
                            error={errors.postalcode}
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
                    <Button containerStyle={{ marginTop: '1rem' }}>
                        Finalizar Faturamento
                    </Button>
                    <Button
                        buttonType="secundary"
                        containerStyle={{
                            marginTop: '1rem',
                            marginLeft: '1rem',
                        }}
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
                            <strong>Marcia Donato</strong>
                        </ContainerVendedor>
                        <ChangeSeller>ALTERAR</ChangeSeller>
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
                        {itensFormatted.map(item => (
                            <React.Fragment key={item.name}>
                                <ProductOrder
                                    key={item.name}
                                    name={item.name}
                                    price={item.price}
                                    priceFormatted={item.priceFormatted}
                                    quantity={item.quantity}
                                />
                                <Divider
                                    style={{
                                        marginLeft: '1rem',
                                        marginRight: '1rem',
                                        width: '90%',
                                    }}
                                />
                            </React.Fragment>
                        ))}
                        <Divider
                            style={{
                                marginLeft: '1rem',
                                marginRight: '1rem',
                                width: '90%',
                                marginTop: 'auto',
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
