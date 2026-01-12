import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadArticle() {
            try {
                setError("");
                setLoading(true);

                const res = await fetch(`/api/articles/${id}`);
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
    }, [id]);

    if (loading) {
        return (
            <div className="container py-5">
                <div className="alert alert-info">Caricamento...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">{error}</div>
                <Link to="/" className="btn btn-primary">Torna alla Home</Link>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning">Prodotto non trovato</div>
                <Link to="/" className="btn btn-primary">Torna alla Home</Link>
            </div>
        );
    }

    return (
        <main className="py-4">
            <div className="container">
                <Link to="/" className="btn btn-outline-secondary mb-4">
                    ← Torna alla Home
                </Link>

                <div className="card detail-card shadow">
                    <div className="row g-0">
                        <div className="col-12 col-md-5">
                            <div className="detail-image-wrapper">
                                {article.image ? (
                                    <img
                                        src={article.image}
                                        alt={article.name}
                                        className="detail-image"
                                    />
                                ) : (
                                    <div className="detail-no-image">
                                        <span className="text-muted">Nessuna immagine</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-12 col-md-7">
                            <div className="card-body p-4">
                                {article.categorie && (
                                    <span className="badge bg-dark mb-2">{article.categorie.toUpperCase()}</span>
                                )}

                                <h1 className="h2 mb-2">{article.name || article.slug}</h1>

                                <div className="h3 text-success mb-4">
                                    € {article.price || "N/D"}
                                </div>

                                <hr />

                                <div className="detail-info">
                                    {article.production_house && (
                                        <p><strong>Produttore:</strong> {article.production_house}</p>
                                    )}
                                    {article.production_year && (
                                        <p><strong>Anno:</strong> {article.production_year}</p>
                                    )}
                                    {article.genres && (
                                        <p><strong>Generi:</strong> {article.genres}</p>
                                    )}
                                    {article.pegi && (
                                        <p><strong>PEGI:</strong> {article.pegi}</p>
                                    )}
                                    {article.pvp_pve && (
                                        <p><strong>Modalità:</strong> {article.pvp_pve}</p>
                                    )}
                                    {article.dimensions && (
                                        <p><strong>Dimensioni:</strong> {article.dimensions}</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    {article.quantity > 0 ? (
                                        <span className="badge bg-success-subtle text-success fs-6 px-3 py-2">
                                            Disponibile ({article.quantity} pz)
                                        </span>
                                    ) : (
                                        <span className="badge bg-danger-subtle text-danger fs-6 px-3 py-2">
                                            Non disponibile
                                        </span>
                                    )}
                                </div>

                                <button className="btn btn-primary btn-lg w-100 mt-4">
                                    Aggiungi al carrello
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}