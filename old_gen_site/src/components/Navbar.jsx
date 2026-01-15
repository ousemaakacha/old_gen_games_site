import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { getTotalItems } = useCart();
    const itemCount = getTotalItems();

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <div className="d-flex align-items-center gap-2">
                    <a href="/">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        width="60"
                        height="60"
                        className="d-inline-block align-text-top"

                    />
                    </a>
                <Link className="navbar-brand" to="/">METAL GAMES SOLID SHOP</Link>

                </div>
                <Link className="cart-icon position-relative" to="/cart">
                    <i className="bi bi-cart3"></i>
                    {itemCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {itemCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
}