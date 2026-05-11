import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';

const blankProduct = {
  name: '',
  description: '',
  category: '',
  image: '',
  price: 0,
  stock: 0,
  rating: 4.5,
  featured: false,
};

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [draft, setDraft] = useState(blankProduct);

  const loadAll = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders'),
        api.get('/users'),
      ]);
      setProducts(productsRes.data.products);
      setOrders(ordersRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Admin data failed to load');
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const createProduct = async (event) => {
    event.preventDefault();
    try {
      await api.post('/products', {
        ...draft,
        price: Number(draft.price),
        stock: Number(draft.stock),
      });
      setDraft(blankProduct);
      toast.success('Product added');
      loadAll();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add product');
    }
  };

  const removeProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      loadAll();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not delete product');
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      toast.success('Order updated');
      loadAll();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update order');
    }
  };

  const setRole = async (id, role) => {
    try {
      await api.put(`/users/${id}/role`, { role });
      toast.success('User role updated');
      loadAll();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update user');
    }
  };

  return (
    <section className="space-y-8">
      <div className="glass-card">
        <h1 className="text-2xl font-semibold">Admin dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">Manage products, orders, and users.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={createProduct} className="glass-card space-y-2">
          <h2 className="text-xl font-semibold">Add product</h2>
          {['name', 'description', 'category', 'image', 'price', 'stock'].map((field) => (
            <input
              key={field}
              required
              value={draft[field]}
              onChange={(event) => setDraft((prev) => ({ ...prev, [field]: event.target.value }))}
              placeholder={field}
              className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 dark:border-zinc-700"
            />
          ))}
          <button type="submit" className="button-primary">
            Save product
          </button>
        </form>

        <div className="glass-card space-y-3">
          <h2 className="text-xl font-semibold">Product management</h2>
          {products.map((product) => (
            <div key={product._id} className="flex items-center justify-between rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
              <p className="text-sm">{product.name}</p>
              <button type="button" className="button-secondary" onClick={() => removeProduct(product._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card space-y-3">
        <h2 className="text-xl font-semibold">Manage orders</h2>
        {orders.map((order) => (
          <div key={order._id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
            <p className="text-sm">#{order._id.slice(-6).toUpperCase()} • {order.status}</p>
            <select
              value={order.status}
              onChange={(event) => updateOrderStatus(order._id, event.target.value)}
              className="rounded-lg border border-zinc-300 bg-transparent px-2 py-1 dark:border-zinc-700"
            >
              {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="glass-card space-y-3">
        <h2 className="text-xl font-semibold">Manage users</h2>
        {users.map((user) => (
          <div key={user._id} className="flex items-center justify-between rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
            <p className="text-sm">{user.name} • {user.email}</p>
            <select
              value={user.role}
              onChange={(event) => setRole(user._id, event.target.value)}
              className="rounded-lg border border-zinc-300 bg-transparent px-2 py-1 dark:border-zinc-700"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminDashboardPage;
