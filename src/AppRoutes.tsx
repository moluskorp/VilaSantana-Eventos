import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import Reports from './pages/Reports';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/oi" element={<Order />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </Router>
    );
}
