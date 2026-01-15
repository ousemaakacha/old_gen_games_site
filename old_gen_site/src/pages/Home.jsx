import { Link, useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate()

  function goToCategory(cat) {
    localStorage.setItem("category", cat)
    navigate("/search")
  }

  return (
    <main className="pb-4">
      <img className="my-img img-fluid" src="jumbo.png" alt="jumbo" />
      <div className="container">

        <div className="text-center py-5">
          <h1 className="display-4 mb-4">Benvenuto nel nostro store!</h1>
          <p className="lead mb-4">Visita il nostro store di videogiochi retro, console e accessori, e se anche tu sei nato nerd allora sei nel posto giusto, clicca su articoli e scopri la nostra collezione <Link to="/search" className="btn btn-primary btn-lg">
            Articoli
          </Link></p>

        </div>

        <div className="games d-flex">
          <div className="left-img">
            <img className="home-img img-fluid" src="LegendOfZeldaOcarinaOfTime.jpg" alt="jumbo" />
          </div>
          <div className="text-right">
            <Link to="/search" className="home-link" onClick={(e) => { e.preventDefault(); goToCategory("Videogames") }}>
              Videogames!
            </Link>
            <p>Nel nostro store troverai giochi per veri appassionati, rivivi quelle storie emozionanti.</p>
          </div>
        </div>

        <div className="games d-flex">
          <div className="text-right">
            <Link to="/search" className="home-link" onClick={(e) => { e.preventDefault(); goToCategory("Consoles") }}>
              Console!
            </Link>
            <p>riscopri le vecchie generazioni grazie alla nostra selezione di console old gen e retrò.</p>
          </div>
          <div className="left-img">
            <img className="home-img img-fluid" src="game_boy_color_1000x500.jpg" alt="jumbo" />
          </div>
        </div>

        <div className="games d-flex">
          <div className="left-img">
            <img className="home-img img-fluid" src="spettacolo_1000x500_fixed.jpg" alt="jumbo" />
          </div>
          <div className="text-right">
            <Link to="/search" className="home-link" onClick={(e) => { e.preventDefault(); goToCategory("Collectibles") }}>
              Collezionabili!
            </Link>
            <p>infine dà un'occhiata ai nostri colleziobabili per non perderti oggetti unici.</p>
          </div>
        </div>

        <div className="games d-flex">
          <div className="text-right">
            <Link to="/search" className="home-link" onClick={(e) => { e.preventDefault(); goToCategory("Collectibles") }}>
              Accessori!
            </Link>
            <p>infine dà un'occhiata ai nostri colleziobabili per non perderti oggetti unici.</p>
          </div>
          <div className="left-img">
            <img className="home-img img-fluid" src="controller_1000x500.jpg" alt="jumbo" />
          </div>
        </div>

      </div>
    </main>
  );
}

"Consoles", "Collectibles"