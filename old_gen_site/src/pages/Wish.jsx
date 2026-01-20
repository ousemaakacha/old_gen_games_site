import { useState } from "react"
import { useWish } from "../context/WishContext"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

export default function Wish() {

    const { wishlist, removeFromWish } = useWish()
    const { addToCart, getCartQuantity } = useCart()
    const [stockWarning, setStockWarning] = useState(null)

    if (wishlist.length === 0) {
        return (
            <main className="wish-page">
                <div className="container">
                    <h2>La tua Wishlist è vuota</h2>
                    <div className="text-center">
                        <Link to="/search" className="btn btn-primary">
                            Torna ai prodotti
                        </Link>
                    </div>
                </div>
            </main>
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
                                    <div className="wish-card-info">
                                        <h5>{item.name}</h5>
                                        <div className="wish-card-meta">
                                            {item.categorie && <span className="badge bg-dark">{item.categorie}</span>}
                                            <span className="wish-card-price">{item.price ? `€ ${item.price}` : "N/D"}</span>
                                        </div>
                                    </div>
                                    <div className="wish-card-actions">
                                        <Link
                                            to={`/articoli/${item.slug}`}
                                            className="btn btn-primary">
                                            Dettagli
                                        </Link>
                                        <div className="wish-btn-wrapper">
                                            <button type="button" className="btn btn-primary"
                                                onClick={() => {
                                                    const currentInCart = getCartQuantity(item.id)
                                                    const result = addToCart(item, 1)
                                                    if (!result.success) {
                                                        setStockWarning({ itemId: item.id, max: result.max, inCart: currentInCart })
                                                        setTimeout(() => setStockWarning(null), 3000)
                                                        if (result.added === 0) {
                                                            return
                                                        }
                                                    }
                                                    removeFromWish(item.id)
                                                }}>
                                                <i className="bi bi-cart-plus"></i>
                                            </button>
                                            {stockWarning && stockWarning.itemId === item.id && (
                                                <div className="stock-warning">
                                                    <i className="bi bi-exclamation-triangle"></i> Scorte esaurite! Max: {stockWarning.max} ({stockWarning.inCart} nel carrello)
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className="btn btn-outline-danger"
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
                            const failedItems = []
                            const addedItems = []
                            wishlist.forEach((item) => {
                                const result = addToCart(item, 1)
                                if (result.added > 0) {
                                    addedItems.push(item.id)
                                }
                                if (!result.success && result.added === 0) {
                                    failedItems.push(item.name)
                                }
                            })
                            if (failedItems.length > 0) {
                                alert(`Scorte esaurite per: ${failedItems.join(", ")}`)
                            }
                            // Rimuovi solo i prodotti effettivamente aggiunti
                            addedItems.forEach((id) => removeFromWish(id))
                        }}>
                        Aggiungi tutto al carrello
                    </button>

                    <Link to="/search" className="btn btn-outline-secondary">
                        Continua shopping
                    </Link>
                </div>
            </div>
        </main>
    )
}