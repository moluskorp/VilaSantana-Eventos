import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/oi" element={<Order />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}
