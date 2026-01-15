import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="pb-4">
      <img className="my-img img-fluid" src="jumbo.png" alt="jumbo" />
      <div className="container">
        <div className="text-center py-5">
          <h1 className="display-4 mb-4">Benvenuto nel nostro store!</h1>
          <p className="lead mb-4">Scopri la nostra collezione di videogiochi retro, console e accessori</p>
          <Link to="/search" className="btn btn-primary btn-lg">
            Cerca Articoli
          </Link>
        </div>
      </div>
    </main>
  );
}
