import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('wishlist') || '[]'));

  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem('wishlist', JSON.stringify(nextItems));
  };

  const toggleWishlist = (product) => {
    const exists = items.some((item) => item._id === product._id);

    if (exists) {
      persist(items.filter((item) => item._id !== product._id));
      toast.success('Removed from wishlist');
      return;
    }

    persist([...items, product]);
    toast.success('Added to wishlist');
  };

  const value = { items, toggleWishlist };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);
