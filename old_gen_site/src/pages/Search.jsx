import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Tutti i filtri vengono letti dall'URL (condivisibile)
  const search = searchParams.get("q") || "";
  const category = searchParams.get("categorie") || "";
  const sortBy = searchParams.get("sort") || "";

  const [searchInput, setSearchInput] = useState(search);
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(1);

  // Funzione helper per aggiornare i query params
  const updateParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  // Sincronizza searchInput quando cambia l'URL (es. navigazione indietro)
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Debounce per la ricerca - aspetta 500ms dopo l'ultimo carattere
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        updateParams({ q: searchInput });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    async function loadArticles() {
      try {
        setError("");
        setLoading(true);

        // Costruisco i query params per il backend
        const params = new URLSearchParams();
        if (category) params.append("categorie", category);
        if (search) params.append("name", search);
        // Mappa i valori del sort frontend ai valori accettati dal backend
        const sortMap = {
          "price-asc": "price_asc",
          "price-desc": "price_desc",
          "name-asc": "name_asc",
          "name-desc": "name_desc",
        };
        if (sortBy && sortMap[sortBy]) {
          params.append("sort", sortMap[sortBy]);
        }

        const url = `/api/articles${params.toString() ? `?${params.toString()}` : ""}`;
        const res = await fetch(url);
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
  }, [category, search, sortBy]);

  // Categorie valide dal backend
  const categories = ["Videogames", "Consoles", "Collectibles", "Accessories"];

  // Il backend gestisce l'ordinamento, quindi usiamo direttamente articles
  const visible = articles.slice(0, page * PAGE_SIZE);

  return (
    <main className="pb-4">
      <div className="container">
        <div className="row g-3 align-items-end mb-3">
          <div className="col-12 col-md-3">
            <h1 className="h3 mb-1">Articoli</h1>
          </div>
          <div className="col-12 col-md-9 d-flex gap-2 justify-content-md-end filters-row">
            <select
              className="form-select"
              value={category}
              onChange={(e) => {
                updateParams({ categorie: e.target.value });
                setPage(1);
              }}
            >
              <option value="">Tutte le categorie</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => {
                updateParams({ sort: e.target.value });
                setPage(1);
              }}
            >
              <option value="">Ordina per...</option>
              <option value="price-asc">Prezzo crescente</option>
              <option value="price-desc">Prezzo decrescente</option>
              <option value="name-asc">Nome A-Z</option>
              <option value="name-desc">Nome Z-A</option>
            </select>
            <input
              className="form-control"
              placeholder="Cerca per nome..."
              value={searchInput}
              onChange={(e) => { setSearchInput(e.target.value); setPage(1); }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Tab") {
                  updateParams({ q: searchInput.trim() });
                }
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          {loading && <div className="alert alert-info">LOADING...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
        </div>

        {!loading && !error && articles.length === 0 && (
          <div className="alert alert-warning">Nessun prodotto disponibile</div>
        )}

        <div className="row g-3">
          {!loading && !error && visible.map((a) => {
            const id = a.id ?? a.ID ?? a.article_id;
            const slug = a.slug;
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
                      {slug ? (
                        <Link className="btn btn-sm btn-outline-primary" to={`/articoli/${slug}`}>
                          Dettagli
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

        {visible.length < articles.length && (
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-outline-primary" onClick={() => setPage(page + 1)}>Carica più prodotti</button>
          </div>
        )}
      </div>
    </main>
  );
}
