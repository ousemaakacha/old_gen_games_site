import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Footer from "./components/Footer.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import WelcomeModal from "./components/WelcomeModal";
import { WishProvider } from "./context/WishContext.jsx";
import Wish from "./pages/Wish.jsx";


export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <WishProvider>
      <CartProvider>
        <div className="app-wrapper">
          <Navbar />
          <WelcomeModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/articoli/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wish" element={<Wish />} />
          </Routes>
          <Footer />
          <button
            className={`scroll-top-btn ${showScrollTop ? "visible" : ""}`}
            onClick={scrollToTop}
            aria-label="Torna su"
          >
            ↑
          </button>
        </div>
      </CartProvider>
    </WishProvider>
  );
}