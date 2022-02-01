import { ThemeProvider } from 'styled-components';
import { GlobalStyle, themeStyled } from './styles/globalStyle';
import AppRoutes from './AppRoutes';

function App() {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={themeStyled}>
                <AppRoutes />
            </ThemeProvider>
        </>
    );
}

export default App;
