import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        via: "",
        civico: "",
        citta: "",
        cap: "",
        cardName: "",
        cardSurname: "",
        cardNumber: "",
        cardExpiryMonth: "",
        cardExpiryYear: "",
        cardCvv: "",
        terms: false
    });
    const [stockWarning, setStockWarning] = useState(null);

    const handleQuantityChange = (articleId, newQuantity, maxQuantity) => {
        if (newQuantity > maxQuantity) {
            setStockWarning({ articleId, maxQuantity });
            updateQuantity(articleId, maxQuantity);
            setTimeout(() => setStockWarning(null), 3000);
        } else {
            updateQuantity(articleId, newQuantity);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const items = cart.map(item => ({ article_id: item.article.id, quantity: item.quantity }));
            const payload = {
                name: form.name,
                surname: form.surname,
                email: form.email,
                via: form.via,
                numero_civico: form.civico,
                cap: form.cap,
                citta: form.citta,
                items,
                termsAccepted: form.terms
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

            // Prova a parsare come JSON
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = text;
            }

            if (!res.ok) {
                // Estrai il messaggio di errore dalla risposta
                const errorMessage = data?.error || data?.message || "Si è verificato un errore durante il checkout";
                throw new Error(errorMessage);
            }

            console.log("Response data:", data);

            const totale = getTotalPrice().toFixed(2);
            // Estrai l'ID ordine dalla risposta (può essere in diversi formati)
            const orderId = data?.order_id || data?.orderId || data?.id || data?.data?.id || null;
            clearCart();

            // Mostra messaggio di successo stilizzato con numero ordine
            setOrderSuccess({ totale, orderId });
        } catch (err) {
            console.error("Errore checkout:", err);
            // Mostra messaggi di errore più user-friendly
            const friendlyErrors = {
                // Validazione campi
                "Nome non valido. Sono ammesse solo lettere.": "Il nome inserito non è valido. Usa solo lettere.",
                "Cognome non valido. Sono ammesse solo lettere.": "Il cognome inserito non è valido. Usa solo lettere.",
                "Email non valida. Formato email errato.": "L'email inserita non è valida. Controlla il formato.",
                // Validazione indirizzo (da validateAddress.js)
                "La via può contenere solo lettere e spazi": "La via inserita non è valida. Usa solo lettere e spazi.",
                "Il numero civico deve contenere solo numeri ed eventualmente '/' o '\\' come separatore": "Il numero civico non è valido. Usa solo numeri (es. 15 o 15/A).",
                "Il CAP deve contenere solo numeri senza spazi": "Il CAP non è valido. Inserisci solo numeri senza spazi.",
                "La città può contenere solo lettere e spazi": "La città inserita non è valida. Usa solo lettere e spazi.",
                // Carrello e termini
                "Carrello vuoto o non valido": "Il carrello è vuoto o contiene dati non validi.",
                "Dati carrello non validi": "I dati del carrello non sono validi. Riprova.",
                "Accettare i termini e le condizioni": "Devi accettare i Termini e Condizioni per procedere.",
                // Stock e articoli
                "Stock insufficiente per uno o più articoli": "Uno o più articoli non sono più disponibili nella quantità richiesta.",
                "Articolo non trovato": "Uno degli articoli nel carrello non è più disponibile."
            };
            setError(friendlyErrors[err.message] || err.message);
        } finally {
            setLoading(false);
        }
    };

    // Mostra pagina di successo ordine
    if (orderSuccess) {
        return (
            <main className="cart-page">
                <div className="container">
                    <div className="order-success">
                        <div className="order-success-icon">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <h1>Ordine completato!</h1>
                        <p>Grazie per il tuo acquisto</p>
                        {orderSuccess.orderId && (
                            <div className="order-success-id">
                                Ordine N. <span>#{orderSuccess.orderId}</span>
                            </div>
                        )}
                        <div className="order-success-total">
                            Totale: <span>€ {orderSuccess.totale}</span>
                        </div>
                        <Link to="/" className="btn btn-primary">Torna alla Home</Link>
                    </div>
                </div>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="cart-page">
                <div className="container">
                    <h1 className="cart-title">Carrello</h1>
                    <div className="alert alert-info text-center">Il tuo carrello è vuoto</div>
                    <div className="text-center">
                        <Link to="/search" className="btn btn-primary">Vai allo shop</Link>
                    </div>
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
                                    <Link to={`/articoli/${item.article.slug || item.article.id}`} className="btn btn-sm btn-outline-secondary">
                                        Dettagli
                                    </Link>
                                </div>
                                <div className="cart-item-price">€ {item.article.price}</div>
                                <div className="cart-item-qty-wrapper">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.article.id, parseInt(e.target.value) || 1, item.article.quantity)}
                                        className="cart-item-qty"
                                    />
                                    {stockWarning && stockWarning.articleId === item.article.id && (
                                        <div className="stock-warning">
                                            <i className="bi bi-exclamation-triangle"></i> Scorte esaurite! Max: {stockWarning.maxQuantity}
                                        </div>
                                    )}
                                </div>
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

                                <div className="form-group">
                                    <label className="form-label">Nome <span className="required-asterisk">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Inserisci il tuo nome"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Cognome <span className="required-asterisk">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Inserisci il tuo cognome"
                                        value={form.surname}
                                        onChange={(e) => setForm({ ...form, surname: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email <span className="required-asterisk">*</span></label>
                                    <input
                                        type="email"
                                        placeholder="Inserisci la tua email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Via <span className="required-asterisk">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Inserisci la via"
                                        value={form.via}
                                        onChange={(e) => setForm({ ...form, via: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="address-row">
                                    <div className="form-group">
                                        <label className="form-label">N. Civico <span className="required-asterisk">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="N."
                                            value={form.civico}
                                            onChange={(e) => setForm({ ...form, civico: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">CAP <span className="required-asterisk">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="CAP"
                                            value={form.cap}
                                            onChange={(e) => setForm({ ...form, cap: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Città <span className="required-asterisk">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Inserisci la città"
                                        value={form.citta}
                                        onChange={(e) => setForm({ ...form, citta: e.target.value })}
                                        required
                                    />
                                </div>

                                <h3>Dati carta di credito</h3>
                                <div className="form-group">
                                    <label className="form-label">Nome intestatario <span className="required-asterisk">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Nome sulla carta"
                                        value={form.cardName}
                                        onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Cognome intestatario <span className="required-asterisk">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Cognome sulla carta"
                                        value={form.cardSurname}
                                        onChange={(e) => setForm({ ...form, cardSurname: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Numero carta <span className="required-asterisk">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={form.cardNumber}
                                        onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                                        maxLength="19"
                                        required
                                    />
                                </div>
                                <div className="address-row">
                                    <div className="form-group">
                                        <label className="form-label">Mese <span className="required-asterisk">*</span></label>
                                        <select
                                            value={form.cardExpiryMonth}
                                            onChange={(e) => setForm({ ...form, cardExpiryMonth: e.target.value })}
                                            required
                                        >
                                            <option value="">MM</option>
                                            <option value="01">01 - Gennaio</option>
                                            <option value="02">02 - Febbraio</option>
                                            <option value="03">03 - Marzo</option>
                                            <option value="04">04 - Aprile</option>
                                            <option value="05">05 - Maggio</option>
                                            <option value="06">06 - Giugno</option>
                                            <option value="07">07 - Luglio</option>
                                            <option value="08">08 - Agosto</option>
                                            <option value="09">09 - Settembre</option>
                                            <option value="10">10 - Ottobre</option>
                                            <option value="11">11 - Novembre</option>
                                            <option value="12">12 - Dicembre</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Anno <span className="required-asterisk">*</span></label>
                                        <select
                                            value={form.cardExpiryYear}
                                            onChange={(e) => setForm({ ...form, cardExpiryYear: e.target.value })}
                                            required
                                        >
                                            <option value="">AA</option>
                                            {Array.from({ length: 10 }, (_, i) => {
                                                const year = new Date().getFullYear() + i;
                                                return (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">CVV <span className="required-asterisk">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            value={form.cardCvv}
                                            onChange={(e) => setForm({ ...form, cardCvv: e.target.value })}
                                            maxLength="4"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="terms-group">
                                    <label className="terms-label">
                                        <input
                                            type="checkbox"
                                            checked={form.terms}
                                            onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                                            required
                                        />
                                        <span>Accetto i <a href="/termini-e-condizioni" target="_blank" rel="noopener noreferrer">Termini e Condizioni</a> <span className="required-asterisk">*</span></span>
                                    </label>
                                </div>

                                <p className="required-note"><span className="required-asterisk">*</span> Campi obbligatori</p>

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
