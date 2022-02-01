import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Header } from '../../components/Header';
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
} from './styles';
import Button from '../../components/Button';
import ProductOrder from '../../components/ProductOrder';

const addOrderFormSchema = yup.object().shape({});

interface Item {
    name: string;
    price: number;
    quantity: number;
}

export default function Order() {
    const { register, handleSubmit, formState, setError, setFocus, setValue } =
        useForm({
            resolver: yupResolver(addOrderFormSchema),
        });
    const { errors } = formState;
    const [itens, setItens] = useState<Item[]>([
        {
            name: 'Cento de Salgado',
            price: 10.9,
            quantity: 2,
        },
        {
            name: 'Coca Cola',
            price: 7,
            quantity: 5,
        },
    ]);

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
                        <ChangeSeller>ALTERAR</ChangeSeller>
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
                                error={errors.deliverydate}
                                setFocus={setFocus}
                                register={register}
                                style={{ width: '12.5rem' }}
                            />
                            <Flex style={{ marginLeft: '0.5rem' }} />
                            <InputOrder
                                name="deliveryhour"
                                label="Horário"
                                error={errors.deliveryhour}
                                setFocus={setFocus}
                                register={register}
                                style={{ width: '3.25rem' }}
                            />
                        </Flex>
                        <InputOrder
                            name="deliveryprice"
                            label="Valor da Entrega"
                            error={errors.deliveryhour}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '15.625rem' }}
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
                            error={errors.deliveryhour}
                            setFocus={setFocus}
                            register={register}
                            style={{ width: '15.625rem' }}
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
                        style={{ flexDirection: 'column', alignItems: 'start' }}
                    >
                        <TitleTotal>Seu Pedido</TitleTotal>
                        {itens.map(item => (
                            <ProductOrder
                                key={item.name}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                itens={itens}
                                setItens={setItens}
                            />
                        ))}
                    </Container>
                </ContainerRight>
            </Nav>
        </>
    );
}
