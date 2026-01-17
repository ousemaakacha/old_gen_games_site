import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWish } from "../context/WishContext";

export default function ProductDetail() {
    const { slug } = useParams();
    const { addToCart, getCartQuantity } = useCart();
    const { addToWish, removeFromWish, isInWish } = useWish()
    const [article, setArticle] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [stockWarning, setStockWarning] = useState(false);

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

                // Carica prodotti correlati della stessa categoria
                if (item && item.categorie) {
                    const relatedRes = await fetch(`/api/articles?categorie=${encodeURIComponent(item.categorie)}`);
                    if (relatedRes.ok) {
                        const relatedData = await relatedRes.json();
                        const allRelated = Array.isArray(relatedData) ? relatedData : (relatedData.data || []);
                        const filtered = allRelated
                            .filter(p => p.slug !== slug)
                            .slice(0, 4);
                        setRelatedProducts(filtered);
                    }
                }
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
                <div className="d-flex gap-2 mb-4">
                    <Link to="/" className="btn btn-outline-secondary">Home</Link>
                    <Link to="/search" className="btn btn-outline-secondary">← Tutti i prodotti</Link>
                </div>
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

                                    <div className="detail-qty-wrapper">
                                        <label className="form-label mb-0">Quantità:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ maxWidth: "100px" }}
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => {
                                                const newQty = parseInt(e.target.value) || 1;
                                                if (newQty > article.quantity) {
                                                    setStockWarning(true);
                                                    setQuantity(article.quantity);
                                                    setTimeout(() => setStockWarning(false), 3000);
                                                } else {
                                                    setQuantity(Math.max(1, newQty));
                                                }
                                            }}
                                            disabled={article.quantity <= 0}
                                        />
                                        {stockWarning && (
                                            <div className="stock-warning">
                                                <i className="bi bi-exclamation-triangle"></i> Scorte esaurite! Max: {article.quantity} {getCartQuantity(article.id) > 0 && `(${getCartQuantity(article.id)} nel carrello)`}
                                            </div>
                                        )}
                                    </div>

                                    <div className="detail-buttons">
                                        <button
                                            className="btn btn-primary btn-lg"
                                            disabled={article.quantity <= 0}
                                            onClick={() => {
                                                const result = addToCart(article, quantity);
                                                if (!result.success) {
                                                    setStockWarning(true);
                                                    setTimeout(() => setStockWarning(false), 3000);
                                                    if (result.added === 0) {
                                                        return;
                                                    }
                                                }
                                                setAddedToCart(true);
                                                setTimeout(() => setAddedToCart(false), 3000);
                                            }}
                                        >
                                            Aggiungi al carrello
                                        </button>
                                        <button
                                            className={`btn-wish ${isInWish(article.id) ? "active" : ""}`}
                                            onClick={() => {
                                                isInWish(article.id)
                                                    ? removeFromWish(article.id)
                                                    : addToWish(article);
                                            }}>
                                            <i className={`bi ${isInWish(article.id) ? "bi-heart-fill" : "bi-heart"}`}></i>
                                        </button>
                                    </div>

                                    {addedToCart && (
                                        <div className="alert alert-success py-2 mt-3 mb-0">
                                            Articolo aggiunto al carrello!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Prodotti correlati */}
                {relatedProducts.length > 0 && (
                    <div className="related-products">
                        <h3 className="related-title">Prodotti correlati</h3>
                        <div className="related-grid">
                            {relatedProducts.map((product) => (
                                <Link
                                    key={product.id || product.slug}
                                    to={`/articoli/${product.slug}`}
                                    className="related-card"
                                >
                                    <div className="related-card-image">
                                        {product.image ? (
                                            <img src={product.image} alt={product.name} />
                                        ) : (
                                            <span className="related-no-image">Nessuna immagine</span>
                                        )}
                                    </div>
                                    <div className="related-card-info">
                                        <h4>{product.name}</h4>
                                        <span className="related-card-price">
                                            {product.price ? `€ ${product.price}` : "N/D"}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}