import { createGlobalStyle } from 'styled-components';

import bgImg from '../assets/background.png';

export const themeStyled = {
    pink: '#CC3AB4',
    blue: '#5BB1CE',
};

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', 'sans-serif';
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }

        @media (max-width: 728px) {
            font-size: 87.5%;
        }

        body {

            background: url(${bgImg}) no-repeat;
            background-size: cover;
            -webkit-font-smoothing: antialiased;
        }

        body, input, textarea, button, label {
            font-family: 'Roboto', 'sans-serif';
            font-weight: 400;
            outline: 0;
            border: 0;
            font-size: 1rem;
        }

        h1,h2,h3,h4,h5,h6, strong {
            font-weight: 600;
        }

        button{
            cursor: pointer;
            transition: filter 0.2s;
        }

        button:hover {
            filter: brightness(0.8);
        }

        [disabled] {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
`;
