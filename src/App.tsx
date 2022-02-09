import { ThemeProvider } from 'styled-components';
import { GlobalStyle, themeStyled } from './styles/globalStyle';
import AppRoutes from './AppRoutes';
import { OrderProvider } from './hooks/useOrder';

function App() {
    return (
        <>
            <GlobalStyle />
            <OrderProvider>
                <ThemeProvider theme={themeStyled}>
                    <AppRoutes />
                </ThemeProvider>
            </OrderProvider>
        </>
    );
}

export default App;
