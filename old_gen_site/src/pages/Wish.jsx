import { useWish } from "../context/WishContext"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

export default function Wish() {

    const { wishlist, removeFromWish, clearWish } = useWish()
    const { addToCart } = useCart()

    if (wishlist.length === 0) {
        return (
            <div className="container">
                <h2>
                    La tua Wishlist è vuota
                </h2>
                <Link to="/" className="btn btn-primary">
                    Torna ai prodotti
                </Link>
            </div>
        )
    }

    return (
        <main className="wish-page">
            <div className="container">
                <h2>La tua Wishlist</h2>
                <div className="wish-layout">
                    {wishlist.map((item) => (
                        <div key={item.id} className="wish-col">
                            <div className="wish-card">
                                {item.image && (
                                    <img src={item.image} className="wish-card-img" />
                                )}
                                <div className="wish-card-body">
                                    <h5>{item.name}</h5>
                                    <div className="d-flex gap-2">
                                        <Link
                                            to={`/articoli/${item.slug}`}
                                            className="btn btn-primary">
                                            Dettagli
                                        </Link>
                                        <button className="btn btn-primary"
                                            onClick={() => {
                                                addToCart(item, 1)
                                                removeFromWish(item.id)
                                            }}>

                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeFromWish(item.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-actions">
                    <button className="btn btn-primary"
                        onClick={() => {
                            wishlist.forEach((item) => addToCart(item, 1))
                            clearWish()
                        }}>
                        <i></i>Aggiungi tutto al carrello
                    </button>

                    <Link to="/search" className="btn btn-outline-secondary">
                        Continua shopping
                    </Link>
                </div>
            </div>
        </main>
    )
}