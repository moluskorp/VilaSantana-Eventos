import styled from 'styled-components';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import avatarImg from '../../assets/profile.jpg';

import clientIcon from '../../assets/client.svg';
import homeIcon from '../../assets/home.svg';
import addIcon from '../../assets/add-white.svg';

export const Nav = styled.div`
    flex: 1;
    width: 73rem;
    height: 830px;
    margin: auto;
    margin-top: 0.5rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1.25rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const ContainerRight = styled.div``;

export const ContainerLeft = styled.div`
    color: black;

    margin: 16px 0 0 16px;
`;

export const ContainerLineInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Container = styled.div`
    margin-top: 1rem;
    margin-right: 2rem;
    margin: 1rem;
    display: flex;
    width: 23.125rem;
    border: 1px solid ${props => props.theme.pink};
    box-sizing: border-box;
    border-radius: 1.25rem;
    align-items: center;
`;

export const ContainerMaior = styled.div`
    margin-top: 1rem;
    display: flex;
    width: 44rem;
    border: 1px solid ${props => props.theme.pink};
    box-sizing: border-box;
    border-radius: 1.25rem;
    align-items: center;
`;

export const ChangeSeller = styled.button`
    margin-left: auto;
    margin-right: 1rem;
    font-size: 1rem;
    font-weight: 500;
    background: transparent;

    color: ${props => props.theme.pink};
`;
export const TitleTotal = styled.strong`
    font-size: 1.5rem;
    margin: 1rem 0 0 1rem;
`;

export const Avatar = styled.div`
    background: url(${avatarImg}) no-repeat;
    background-size: cover;
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    margin: 1rem 0.5rem 1rem 1rem;
`;

export const ContainerVendedor = styled.div`
    p {
        margin-bottom: 0.5rem;
    }
    margin-right: auto;
    margin-left: 0.5rem;
`;

export const ClientIcon = styled.div`
    background: url(${clientIcon}) no-repeat center;
    width: 2.5rem;
    height: 2.5rem;

    margin: 16px 0 16px 0;

    margin-left: 1rem;
`;

export const AddIcon = styled.div`
    background: url(${addIcon}) no-repeat center;
    width: 2.5rem;
    height: 2.5rem;

    margin: 16px 0 16px 0;
`;

export const HomeIcon = styled.div`
    background: url(${homeIcon}) no-repeat center;
    width: 2.5rem;
    height: 2.5rem;

    margin: 16px 0 16px 0;

    margin-left: 1rem;
    margin-right: 0.5rem;
`;

export const TipoEntrega = styled.div`
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: bold;
`;

export const RadioGroup = styled(RadioGroupPrimitive.Root)`
    display: flex;
`;

export const RadioGroupRadio = styled(RadioGroupPrimitive.Item)`
    all: unset;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid ${props => props.theme.pink};
    border-radius: 100%;
    box-shadow: 0 2px 10px ${props => props.theme.pink};
`;

export const RadioGroupIndicator = styled(RadioGroupPrimitive.Indicator)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;

    &::after {
        content: '""';
        color: ${props => props.theme.pink};
        display: block;
        width: 50%;
        height: 50%;
        border-radius: 50%;
        background-color: ${props => props.theme.pink};
    }
`;

export const Label = styled(LabelPrimitive.Root)`
    font-size: 1rem;
    font-weight: 500;
`;

export const Flex = styled.div`
    display: flex;
`;

export const Checkbox = styled(CheckboxPrimitive.Root)`
    all: unset;
    background-color: white;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px ${props => props.theme.pink};
    border: 1px solid ${props => props.theme.pink};
    margin-top: 0.5rem;

    &:hover {
        background-color: ${props => props.theme.pink};
    }

    &:focus {
        box-shadow: 0 0 0 2px black;
    }
`;

export const CheckboxIndicator = styled(CheckboxPrimitive.Indicator)`
    color: black;
    margin-top: 0.25rem;
`;

export const AddButton = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    background-color: ${props => props.theme.blue};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    border-radius: 10px;
    box-shadow: 2px 2px 3px 1px rgba(92, 166, 191, 0.35);
`;
