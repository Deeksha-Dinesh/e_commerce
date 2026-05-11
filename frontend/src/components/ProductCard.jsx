import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { items, toggleWishlist } = useWishlist();
  const liked = items.some((item) => item._id === product._id);

  return (
    <motion.article whileHover={{ y: -5 }} className="glass-card flex flex-col">
      <img src={product.image} alt={product.name} className="h-52 w-full rounded-xl object-cover" />
      <div className="mt-4 flex-1">
        <p className="mb-1 text-xs uppercase tracking-wider text-zinc-500">{product.category}</p>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{product.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold">${product.price}</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => toggleWishlist(product)} className="button-secondary">
            {liked ? '♥' : '♡'}
          </button>
          <button type="button" onClick={() => addToCart(product)} className="button-primary">
            Add
          </button>
        </div>
      </div>
      <Link to={`/products/${product._id}`} className="mt-3 text-sm text-zinc-600 underline dark:text-zinc-300">
        View details
      </Link>
    </motion.article>
  );
};

export default ProductCard;
