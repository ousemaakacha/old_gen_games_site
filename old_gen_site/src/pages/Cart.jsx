import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        via: "",
        civico: "",
        citta: "",
        cap: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const items = cart.map(item => ({ article_id: item.article.id, quantity: item.quantity }));
            // Combina i campi indirizzo in una singola stringa
            const address = `${form.via} ${form.civico}, ${form.cap} ${form.citta}`;
            const payload = {
                name: form.name,
                surname: form.surname,
                email: form.email,
                address,
                items
            };

            console.log("Invio checkout:", payload);

            const res = await fetch("/api/articles/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            console.log("Response status:", res.status);
            const contentType = res.headers.get("content-type");
            console.log("Content-Type:", contentType);

            // Leggi la risposta come testo prima
            const text = await res.text();
            console.log("Response text:", text);

            if (!res.ok) {
                throw new Error(text || "Errore checkout");
            }

            // Prova a parsare come JSON, altrimenti usa il testo
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = text;
            }

            console.log("Response data:", data);

            const totale = getTotalPrice().toFixed(2);
            clearCart();

            // Gestisce vari tipi di risposta dal backend
            if (data === true || data === "true" || data.success || text === "true") {
                alert(`Ordine completato con successo! Totale: €${totale}`);
            } else if (data.order_id) {
                alert(`Ordine #${data.order_id} completato! Totale: €${data.total || totale}`);
            } else {
                alert(`Ordine completato! Totale: €${totale}`);
            }
            navigate("/");
        } catch (err) {
            console.error("Errore checkout:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <main className="py-4">
                <div className="container">
                    <h1 className="h3 mb-4">Carrello</h1>
                    <div className="alert alert-info">Carrello vuoto</div>
                    <Link to="/search" className="btn btn-primary">Vai allo shop</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="cart-page">
            <div className="container">
                <h1 className="cart-title">Il tuo carrello</h1>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.article.id} className="cart-item">
                                <img src={item.article.image} alt={item.article.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <h3>{item.article.name}</h3>
                                    <p>{item.article.genres}</p>
                                </div>
                                <div className="cart-item-price">€ {item.article.price}</div>
                                <input
                                    type="number"
                                    min="1"
                                    max={item.article.quantity}
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.article.id, parseInt(e.target.value) || 1)}
                                    className="cart-item-qty"
                                />
                                <div className="cart-item-total">€ {(item.article.price * item.quantity).toFixed(2)}</div>
                                <button onClick={() => removeFromCart(item.article.id)} className="cart-item-remove">✕</button>
                            </div>
                        ))}

                        <div className="cart-actions">
                            <Link to="/search" className="btn btn-outline-secondary">Continua shopping</Link>
                            <button onClick={clearCart} className="btn btn-outline-secondary">Svuota carrello</button>
                        </div>
                    </div>

                    <div className="cart-summary">
                        <h2>Riepilogo</h2>
                        <div className="summary-row">
                            <span>Totale</span>
                            <span className="summary-total">€ {getTotalPrice().toFixed(2)}</span>
                        </div>

                        {!showForm ? (
                            <button onClick={() => setShowForm(true)} className="btn btn-primary w-100">
                                Procedi al checkout
                            </button>
                        ) : (
                            <form onSubmit={handleSubmit} className="checkout-form">
                                <h3>Dati spedizione</h3>
                                {error && <div className="form-error">{error}</div>}

                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Cognome"
                                    value={form.surname}
                                    onChange={(e) => setForm({ ...form, surname: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Via"
                                    value={form.via}
                                    onChange={(e) => setForm({ ...form, via: e.target.value })}
                                    required
                                />
                                <div className="address-row">
                                    <input
                                        type="text"
                                        placeholder="N. Civico"
                                        value={form.civico}
                                        onChange={(e) => setForm({ ...form, civico: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="CAP"
                                        value={form.cap}
                                        onChange={(e) => setForm({ ...form, cap: e.target.value })}
                                        required
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Città"
                                    value={form.citta}
                                    onChange={(e) => setForm({ ...form, citta: e.target.value })}
                                    required
                                />

                                <button type="submit" disabled={loading} className="btn btn-primary w-100">
                                    {loading ? "Elaborazione..." : "Completa ordine"}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline-secondary w-100">
                                    Annulla
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
