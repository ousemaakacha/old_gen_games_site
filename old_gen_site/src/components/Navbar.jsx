import { Link } from "react-router-dom";

export default function Navbar() {
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
                <Link className="cart-icon" to="/cart">
                    <i className="bi bi-cart3"></i>
                </Link>
            </div>
        </nav>
    );
}