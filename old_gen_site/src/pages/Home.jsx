import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PRODUCTS_PER_PAGE = 4;
const TOTAL_PAGES = 4;

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) {
          console.log("API non raggiungibile, status:", res.status);
          return;
        }
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.data || []);

        // Raggruppa per categoria
        const byCategory = {};
        list.forEach(product => {
          const cat = product.categorie || "Altro";
          if (!byCategory[cat]) byCategory[cat] = [];
          byCategory[cat].push(product);
        });

        // Prendi le prime 4 categorie
        const categories = Object.keys(byCategory).slice(0, 4);

        // Per ogni pagina, prendi 1 prodotto da ogni categoria
        const selected = [];
        for (let page = 0; page < TOTAL_PAGES; page++) {
          for (const cat of categories) {
            if (byCategory[cat][page]) {
              selected.push(byCategory[cat][page]);
            }
          }
        }

        setFeatured(selected);
      } catch (e) {
        console.error("Errore caricamento prodotti:", e);
      }
    }
    loadFeatured();
  }, []);

  function goToCategory(cat) {
    navigate(`/search?categorie=${encodeURIComponent(cat)}`);
  }

  const totalPages = Math.ceil(featured.length / PRODUCTS_PER_PAGE);

  function nextPage() {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }

  function prevPage() {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }

  // Prodotti della pagina corrente
  const currentProducts = featured.slice(
    currentPage * PRODUCTS_PER_PAGE,
    (currentPage + 1) * PRODUCTS_PER_PAGE
  );

  return (
    <main className="pb-4">
      <img className="my-img img-fluid" src="jumbo.png" alt="jumbo" />
      <div className="container">

        <div className="text-center py-5">
          <h1 className="display-4 mb-4">Benvenuto nel nostro store!</h1>
          <p className="lead mb-4">Visita il nostro store di videogiochi retro, console e accessori, e se anche tu sei nato nerd allora sei nel posto giusto, clicca su articoli e scopri la nostra collezione</p>
          <Link to="/search" className="btn btn-primary btn-lg">Articoli</Link>
        </div>

        {featured.length > 0 && (
          <div className="carousel-section">
            <h2 className="carousel-title">In primo piano</h2>
            <div className="carousel">
              <button className="carousel-btn carousel-btn-prev" onClick={prevPage}>
                &#8249;
              </button>
              <div className="carousel-grid">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="carousel-item"
                    onClick={() => navigate(`/articoli/${product.slug}`)}
                  >
                    <div className="carousel-item-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="carousel-item-info">
                      <span className="carousel-item-category">{product.categorie}</span>
                      <h3>{product.name}</h3>
                      <p className="carousel-item-price">€ {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-btn carousel-btn-next" onClick={nextPage}>
                &#8250;
              </button>
            </div>
            <div className="carousel-dots">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="games d-flex" onClick={() => goToCategory("Videogames")}>
          <div className="left-img">
            <img className="home-img img-fluid" src="LegendOfZeldaOcarinaOfTime.jpg" alt="Videogames" />
          </div>
          <div className="text-right">
            <span className="home-link">Videogames!</span>
            <p>Nel nostro store troverai giochi per veri appassionati, rivivi quelle storie emozionanti.</p>
          </div>
        </div>

        <div className="games d-flex" onClick={() => goToCategory("Consoles")}>
          <div className="text-right">
            <span className="home-link">Console!</span>
            <p>Riscopri le vecchie generazioni grazie alla nostra selezione di console old gen e retrò.</p>
          </div>
          <div className="left-img">
            <img className="home-img img-fluid" src="game_boy_color_1000x500.jpg" alt="Console" />
          </div>
        </div>

        <div className="games d-flex" onClick={() => goToCategory("Collectibles")}>
          <div className="left-img">
            <img className="home-img img-fluid" src="spettacolo_1000x500_fixed.jpg" alt="Collezionabili" />
          </div>
          <div className="text-right">
            <span className="home-link">Collezionabili!</span>
            <p>Dà un'occhiata ai nostri collezionabili per non perderti oggetti unici.</p>
          </div>
        </div>

        <div className="games d-flex" onClick={() => goToCategory("Accessories")}>
          <div className="text-right">
            <span className="home-link">Accessori!</span>
            <p>Completa la tua collezione con i nostri accessori per veri gamer.</p>
          </div>
          <div className="left-img">
            <img className="home-img img-fluid" src="controller_1000x500.jpg" alt="Accessori" />
          </div>
        </div>

      </div>
    </main>
  );
}
