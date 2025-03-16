import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Fridge from './pages/Fridge';
import Freezer from './pages/Freezer';
import Pantry from './pages/Pantry';
import Cupboard from './pages/Cupboard';
import TotalInventory from './pages/TotalInventory';
import Dishes from './pages/Dish';
import InventoryForm from './components/InventoryForm';
import AuthForm from './components/userLogicForm';
import { KitchenInventoryContext } from './components/KitchenInventoryContext';
import KitchenInventory from './components/KitchenInventory';
import "./app.css";


export default function App() {

    const { token, logout } = useContext(KitchenInventoryContext);
    return (
        <>
            <KitchenInventory>
                {token && <Navbar logout={logout} />}
                <h1 className='app-title'> Cooks Pantry</h1>
                <Routes>
                    <Route path="/" element={token ? <Navigate to="/inventory" /> : <AuthForm />} />
                    <Route path="/inventory" element={token ? <InventoryForm /> : <Navigate to="/" />} />
                    <Route path="/fridge" element={token ? <Fridge /> : <Navigate to="/" />} />
                    <Route path="/freezer" element={token ? <Freezer /> : <Navigate to="/" />} />
                    <Route path="/pantry" element={token ? <Pantry /> : <Navigate to="/" />} />
                    <Route path="/cupboard" element={token ? <Cupboard /> : <Navigate to="/" />} />
                    <Route path="/total" element={token ? <TotalInventory /> : <Navigate to="/" />} />
                    <Route path="/dish" element={token ? <Dishes /> : <Navigate to="/" />} />
                </Routes>
            </KitchenInventory>
        </>
    );
};