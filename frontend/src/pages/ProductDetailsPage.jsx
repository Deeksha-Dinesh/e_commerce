import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="glass-card h-80 animate-pulse bg-zinc-200 dark:bg-zinc-800" />;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <section className="grid gap-8 md:grid-cols-2">
      <img src={product.image} alt={product.name} className="h-[420px] w-full rounded-3xl object-cover" />
      <div>
        <p className="text-sm uppercase tracking-wide text-zinc-500">{product.category}</p>
        <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-300">{product.description}</p>
        <p className="mt-5 text-2xl font-bold">${product.price}</p>
        <p className="mt-2 text-sm text-zinc-500">In stock: {product.stock}</p>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={() => addToCart(product)} className="button-primary">
            Add to cart
          </button>
          <button type="button" onClick={() => toggleWishlist(product)} className="button-secondary">
            Add to wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
