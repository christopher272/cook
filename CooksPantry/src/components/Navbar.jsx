import { useState } from "react";
import { Link } from "react-router-dom";
import { KitchenInventoryContext } from "../components/KitchenInventoryContext";
import { useContext } from "react";
import "../styles/navbar.css"; // Make sure this file is correctly imported

function Navbar() {
    const { logout } = useContext(KitchenInventoryContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <ul className={menuOpen ? "nav-links open" : "nav-links"}>
                <li>
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                </li>
                <li>
                    <Link to="/fridge" onClick={() => setMenuOpen(false)}>Fridge</Link>
                </li>
                <li>
                    <Link to="/freezer" onClick={() => setMenuOpen(false)}>Freezer</Link>
                </li>
                <li>
                    <Link to="/pantry" onClick={() => setMenuOpen(false)}>Pantry</Link>
                </li>
                <li>
                    <Link to="/cupboard" onClick={() => setMenuOpen(false)}>Cupboard</Link>
                </li>
                <li>
                    <Link to="/total" onClick={() => setMenuOpen(false)}>Total Inventory</Link>
                </li>
                <li>
                    <Link to="/leftovers" onClick={() => setMenuOpen(false)}>Leftovers</Link>
                </li>
                <li>
                    <Link to="/" onClick={logout}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
