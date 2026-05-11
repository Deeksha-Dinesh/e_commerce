import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));

  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem('cart', JSON.stringify(nextItems));
  };

  const addToCart = (product) => {
    const existing = items.find((item) => item._id === product._id);

    if (existing) {
      persist(items.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      persist([...items, { ...product, quantity: 1 }]);
    }

    toast.success('Added to cart');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    persist(items.map((item) => (item._id === id ? { ...item, quantity } : item)));
  };

  const removeFromCart = (id) => {
    persist(items.filter((item) => item._id !== id));
    toast.success('Removed from cart');
  };

  const clearCart = () => persist([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
