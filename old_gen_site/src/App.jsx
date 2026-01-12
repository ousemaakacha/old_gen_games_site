import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";


export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-semibold" to="/">Titano Shop</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articoli/:id" element={<ProductDetail />} />

      </Routes>
    </div>
  );
}
