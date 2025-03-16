import { Link } from "react-router-dom";
import { KitchenInventoryContext } from "./KitchenInventoryContext";
import { useContext } from "react";
import '../styles/navbar.css'

function Navbar() {
    const { logout } = useContext(KitchenInventoryContext);

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/"><button className="nav-button">Home</button></Link>
                </li>
                <li className="nav-item">
                    <Link to="/fridge"><button className="nav-button">Fridge</button></Link>
                </li>
                <li className="nav-item">
                    <Link to="/freezer"><button className="nav-button">Freezer</button></Link>
                </li>
                <li className="nav-item">
                    <Link to="/pantry"><button className="nav-button">Pantry</button></Link>
                </li>
                <li className="nav-item">
                    <Link to="/cupboard"><button className="nav-button">Cupboard</button></Link>
                </li>
                <li className="nav-item">
                    <Link to="/total"><button className="nav-button">Total Inventory</button></Link>
                </li>
                <li className="nav-item">
                    <Link to="/dish"><button className="nav-button">Dishes</button></Link>
                </li>
                <li className="nav-item">
                    <Link to="/"><button className="nav-button logout-button" onClick={logout}>Logout</button></Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;