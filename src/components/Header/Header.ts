import styled from 'styled-components';

import avatarImg from '../../assets/profile.jpg';

export const Nav = styled.div`
    display: flex;
    justify-content: center;
    height: 40px;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
    width: 1140px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const Logo = styled.img`
    width: 50px;
    height: 50px;
`;

export const Avatar = styled.div`
    background: url(${avatarImg}) no-repeat;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 9999px;
`;
