import { useEffect, useState } from "react";

const STORAGE_KEY = "mgs_welcome_shown_v1";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // si apre solo se  prima visita
  useEffect(() => {
    const already = localStorage.getItem(STORAGE_KEY);
    if (!already) setOpen(true);
  }, []);

  // chiusura popup e memorizza 
  const close = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  // invia email al backend
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.message || "Errore");

      setDone(true);
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (err) {
      setError(err.message || "Errore");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 999,
        }}
      />

      
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          width: "min(420px, 92vw)",
          borderRadius: 14,
          padding: 18,
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>Benvenuto 👾</h3>
          <button onClick={close} style={{ border: 0, background: "transparent", fontSize: 18 }}>
            ✕
          </button>
        </div>

        {!done ? (
          <>
            <p style={{ marginTop: 10 }}>
              Lasciaci la tua email e ti mandiamo un messaggio di ringraziamento + novità sui retro drop.
            </p>

            <form onSubmit={onSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@email.com"
                required
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  marginTop: 8,
                }}
              />

              {error && (
                <div style={{ marginTop: 10, color: "crimson" }}>
                  {error}
                </div>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: 0,
                    cursor: "pointer",
                  }}
                >
                  {loading ? "Invio..." : "Iscrivimi"}
                </button>

                <button
                  type="button"
                  onClick={close}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                >
                  No grazie
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p style={{ marginTop: 12 }}>Perfetto ✅ Email inviata!</p>
            <button onClick={close} style={{ padding: "10px 14px", borderRadius: 10 }}>
              Chiudi
            </button>
          </>
        )}
      </div>
    </>
  );
}
