import { ThemeProvider } from 'styled-components';
import { GlobalStyle, themeStyled } from './styles/globalStyle';
import AppRoutes from './AppRoutes';
import { OrderProvider } from './hooks/useOrder';
import AuthContextProvider from './contexts/AuthContext';
import { ModalProvider } from './hooks/useModal';

function App() {
    return (
        <>
            <GlobalStyle />
            <AuthContextProvider>
                <OrderProvider>
                    <ModalProvider>
                        <ThemeProvider theme={themeStyled}>
                            <AppRoutes />
                        </ThemeProvider>
                    </ModalProvider>
                </OrderProvider>
            </AuthContextProvider>
        </>
    );
}

export default App;
