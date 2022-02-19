import { ThemeProvider } from 'styled-components';
import { GlobalStyle, themeStyled } from './styles/globalStyle';
import AppRoutes from './AppRoutes';
import { OrderProvider } from './hooks/useOrder';
import AuthContextProvider from './contexts/AuthContext';

function App() {
    return (
        <>
            <GlobalStyle />
            <AuthContextProvider>
                <OrderProvider>
                    <ThemeProvider theme={themeStyled}>
                        <AppRoutes />
                    </ThemeProvider>
                </OrderProvider>
            </AuthContextProvider>
        </>
    );
}

export default App;
