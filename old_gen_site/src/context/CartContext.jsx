import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getCartQuantity = (articleId) => {
    const item = cart.find((item) => item.article.id === articleId);
    return item ? item.quantity : 0;
  };

  const addToCart = (article, quantity = 1) => {
    const currentInCart = getCartQuantity(article.id);
    const maxAvailable = article.quantity || 0;
    const newTotal = currentInCart + quantity;

    if (newTotal > maxAvailable) {
      const canAdd = maxAvailable - currentInCart;
      if (canAdd <= 0) {
        return { success: false, added: 0, max: maxAvailable };
      }
      setCart((prev) => {
        const existing = prev.find((item) => item.article.id === article.id);
        if (existing) {
          return prev.map((item) =>
            item.article.id === article.id
              ? { ...item, quantity: maxAvailable }
              : item
          );
        }
        return [...prev, { article, quantity: canAdd }];
      });
      return { success: false, added: canAdd, max: maxAvailable };
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.article.id === article.id);
      if (existing) {
        return prev.map((item) =>
          item.article.id === article.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { article, quantity }];
    });
    return { success: true, added: quantity, max: maxAvailable };
  };

  const removeFromCart = (articleId) => {
    setCart((prev) => prev.filter((item) => item.article.id !== articleId));
  };

  const updateQuantity = (articleId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(articleId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.article.id === articleId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => setCart([]);

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () => cart.reduce((sum, item) => sum + parseFloat(item.article.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice, getCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
