import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import InputOrder from '../../components/InputOrder';
import {
    Container,
    Content,
    Flex,
    Label,
    LinkStyled,
    Paragraph,
    Title,
} from './styles';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';

type FormValues = {
    email: string;
    password: string;
};

export default function Login() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const formRef = useRef<FormHandles>(null);

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('E-mail obrigatório')
            .email('E-mail incorreto'),
        password: yup
            .string()
            .required('Senha obrigatória')
            .min(6, 'Mínimo de 6 caracteres'),
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

    function handleLogin() {
        // navigate('/oi');
        handleSubmit(async data => {
            const { email, password } = data;
            console.log(email);
            console.log(password);
        })();
    }

    useEffect(() => {
        if (user) {
            navigate('/oi');
        }
    }, [user, navigate]);

    return (
        <Container>
            <Content>
                <Title>Faça login na sua conta</Title>
                <Paragraph>Está na hora de investir no seu negócio</Paragraph>
                <Flex style={{ marginTop: '1rem' }} />
                <Form
                    ref={formRef}
                    onSubmit={handleLogin}
                    // onSubmitCapture={handleSubmit(onSubmit)}
                >
                    <InputOrder
                        name="email"
                        label="E-mail"
                        type="email"
                        error={errors.email}
                        setFocus={setFocus}
                        register={register}
                        style={{ width: '20rem' }}
                    />
                    <Flex style={{ marginTop: '0.5rem' }} />
                    <InputOrder
                        name="password"
                        label="Senha"
                        type="password"
                        error={errors.password}
                        setFocus={setFocus}
                        register={register}
                        style={{ width: '20rem' }}
                    />
                    <Button
                        containerStyle={{
                            marginTop: '1.5rem',
                            padding: '1rem 6rem',
                        }}
                        type="submit"
                    >
                        Logar na sua conta
                    </Button>
                </Form>
                <Flex style={{ marginTop: '1rem' }} />
                <LinkStyled to="/">
                    <Label>Esqueci minha senha</Label>
                </LinkStyled>
            </Content>
        </Container>
    );
}
