import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Login } from './pages/Login';
import Order from './pages/Order';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/oi" element={<Order />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}
