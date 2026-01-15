import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
    const { slug } = useParams();
    const { addToCart } = useCart();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        async function loadArticle() {
            try {
                setError("");
                setLoading(true);
                const res = await fetch(`/api/articles/${slug}`);
                if (!res.ok) throw new Error("Prodotto non trovato");
                const data = await res.json();
                const item = Array.isArray(data) ? data[0] : (data.data || data);
                setArticle(item);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        loadArticle();
    }, [slug]);

    if (loading) {
        return (
            <main className="py-4">
                <div className="container">
                    <div className="alert alert-info">Caricamento...</div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="py-4">
                <div className="container">
                    <div className="alert alert-danger">{error}</div>
                    <Link to="/search" className="btn btn-primary">Tutti i prodotti</Link>
                </div>
            </main>
        );
    }

    if (!article) {
        return (
            <main className="py-4">
                <div className="container">
                    <div className="alert alert-warning">Prodotto non trovato</div>
                    <Link to="/search" className="btn btn-primary">Tutti i prodotti</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="py-4">
            <div className="container">
                <Link to="/search" className="btn btn-outline-secondary mb-4">← Tutti i prodotti</Link>
                <div className="detail-card">
                    <div className="row g-0">
                        <div className="col-12 col-md-5">
                            <div className="detail-image-wrapper">
                                {article.image ? (
                                    <img src={article.image} alt={article.name} className="detail-image" />
                                ) : (
                                    <span className="detail-no-image">Nessuna immagine</span>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-7">
                            <div className="detail-body">
                                <div className="detail-header">
                                    <div className="detail-badges">
                                        {article.categorie && <span className="badge bg-dark">{article.categorie}</span>}
                                        {article.pegi && <span className="badge badge-pegi">PEGI {article.pegi}</span>}
                                        {article.pvp_pve && <span className="badge badge-mode">{article.pvp_pve}</span>}
                                    </div>
                                    <h1 className="detail-title">{article.name}</h1>
                                    {article.genres && <p className="detail-genres"><i className="bi bi-tags"></i> {article.genres}</p>}
                                </div>

                                <div className="detail-info">
                                    <div className="detail-info-grid">
                                        {article.production_house && (
                                            <div className="detail-info-item">
                                                <i className="bi bi-building"></i>
                                                <div>
                                                    <span className="detail-label">Produttore</span>
                                                    <span className="detail-value">{article.production_house}</span>
                                                </div>
                                            </div>
                                        )}
                                        {article.production_year && (
                                            <div className="detail-info-item">
                                                <i className="bi bi-calendar"></i>
                                                <div>
                                                    <span className="detail-label">Anno</span>
                                                    <span className="detail-value">{article.production_year}</span>
                                                </div>
                                            </div>
                                        )}
                                        {article.dimensions && (
                                            <div className="detail-info-item">
                                                <i className="bi bi-box"></i>
                                                <div>
                                                    <span className="detail-label">Dimensioni</span>
                                                    <span className="detail-value">{article.dimensions}</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="detail-info-item">
                                            <i className="bi bi-box-seam"></i>
                                            <div>
                                                <span className="detail-label">Disponibilità</span>
                                                {article.quantity > 0 ? (
                                                    <span className="detail-value stock-ok">{article.quantity} in magazzino</span>
                                                ) : (
                                                    <span className="detail-value stock-no">Esaurito</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-bottom">
                                    <div className="detail-price-box">
                                        <span className="detail-price-label">Prezzo</span>
                                        <span className="detail-price">{article.price ? `€ ${article.price}` : "N/D"}</span>
                                    </div>

                                    <div className="d-flex gap-2 align-items-center mb-3">
                                        <label className="form-label mb-0">Quantità:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ maxWidth: "100px" }}
                                            min="1"
                                            max={article.quantity}
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, Math.min(article.quantity, parseInt(e.target.value) || 1)))}
                                            disabled={article.quantity <= 0}
                                        />
                                    </div>

                                    {addedToCart && (
                                        <div className="alert alert-success py-2 mb-2">
                                            Articolo aggiunto al carrello!
                                        </div>
                                    )}

                                    <div>
                                        <button
                                            className="btn btn-primary btn-lg w-100"
                                            disabled={article.quantity <= 0}
                                            onClick={() => {
                                                addToCart(article, quantity);
                                                setAddedToCart(true);
                                                setTimeout(() => setAddedToCart(false), 3000);
                                            }}
                                        >
                                            <i className="bi bi-cart-plus"></i> Aggiungi al carrello
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}