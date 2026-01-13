import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(() => {
    return localStorage.getItem("category") || "";
  });
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadArticles() {
      try {
        setError("");
        setLoading(true);
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error("Errore fetch: " + res.status);
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.data || data.articles || []);
        setArticles(list);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const categories = [...new Set(articles.map(a => a.categorie).filter(Boolean))];

  const filtered = articles.filter((a) => {
    const matchSearch = !search || String(a.name ?? a.slug ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || a.categorie === category;
    return matchSearch && matchCategory;
  });

  const visible = filtered.slice(0, page * PAGE_SIZE);

  return (
    <main className="pb-4">
     <img className="my-img img-fluid" src="jumbo.png" alt="jumbo" />
      <div className="container">
        <div className="row g-3 align-items-end mb-3">
          <div className="col-12 col-md-4">
            <h1 className="h3 mb-1">Articoli</h1>
          </div>
          <div className="col-12 col-md-8 d-flex gap-2 justify-content-md-end filters-row">
            <select
              className="form-select"
              value={category}
              onChange={(e) => {
                const value = e.target.value;
                setCategory(value);
                localStorage.setItem("category", value)
              }}
            >
              <option value="">Tutte le categorie</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              className="form-control"
              placeholder="Cerca..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        {loading && <div className="alert alert-info">Caricamento...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-3">
          {!loading && !error && visible.map((a) => {
            const id = a.id ?? a.ID ?? a.article_id;
            const title = a.name ?? a.slug;
            const desc = a.genres;
            const price = a.price;
            const image = a.image;

            return (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={id ?? title}>
                <div className="card h-100 shadow-sm">
                  <div className="ratio ratio-4x3 bg-body-tertiary">
                    <img src={image} className="w-100 h-100 img-cover" alt={title} />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-secondary small">{desc}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <div className="fw-semibold">{price ? `€ ${price}` : "Prezzo N/D"}</div>
                      {id ? (
                        <Link className="btn btn-sm btn-outline-primary" to={`/articoli/${id}`}>
                          DETAILS
                        </Link>
                      ) : (
                        <button className="btn btn-sm btn-outline-secondary" disabled>Dettagli</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {visible.length < filtered.length && (
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-outline-primary" onClick={() => setPage(page + 1)}>Load more</button>
          </div>
        )}
      </div>
    </main>
  );
}