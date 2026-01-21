import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWish } from "../context/WishContext";

export default function Navbar() {
    const { getTotalItems } = useCart();
    const { wishlist } = useWish();
    const itemCount = getTotalItems();
    const wishCount = wishlist.length;

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
                <div className="navbar-icons">
                    <Link className="wish-icon" to={"/wish"}>
                        <i className="bi bi-heart"></i>
                        {wishCount > 0 && (
                            <span className="badge rounded-pill bg-danger">
                                {wishCount}
                            </span>
                        )}
                    </Link>
                    <Link className="cart-icon" to="/cart">
                        <i className="bi bi-cart-plus"></i>
                        {itemCount > 0 && (
                            <span className="badge rounded-pill bg-danger">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}