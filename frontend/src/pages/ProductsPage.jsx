import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products', { params: { search, category } });
        setProducts(data.products);
        setCategories(data.categories);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, search]);

  return (
    <section>
      <div className="mb-6 grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
          className="rounded-xl border border-zinc-300 bg-transparent px-4 py-2 outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-zinc-300 bg-transparent px-4 py-2 outline-none dark:border-zinc-700"
        >
          <option value="">All categories</option>
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type="button" className="button-secondary" onClick={() => { setCategory(''); setSearch(''); }}>
          Clear filters
        </button>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
