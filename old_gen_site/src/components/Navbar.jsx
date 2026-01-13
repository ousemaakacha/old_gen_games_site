import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link className="navbar-brand" to="/">Metal Games Solid Shop</Link>
                <Link className="cart-icon" to="/cart">
                    <i className="bi bi-cart3"></i>
                </Link>
            </div>
        </nav>
    );
}