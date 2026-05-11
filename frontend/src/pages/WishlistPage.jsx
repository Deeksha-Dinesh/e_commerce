import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

const WishlistPage = () => {
  const { items } = useWishlist();

  if (!items.length) {
    return (
      <div className="glass-card text-center">
        <p>Your wishlist is empty.</p>
        <Link to="/products" className="button-primary mt-4 inline-flex">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </section>
  );
};

export default WishlistPage;
