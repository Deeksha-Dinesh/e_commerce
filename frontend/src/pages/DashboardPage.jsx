import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/orders/mine');
        setOrders(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Could not load dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <section className="space-y-6">
      <div className="glass-card">
        <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">Track your latest orders and account activity.</p>
      </div>

      <div className="glass-card">
        <h2 className="text-xl font-semibold">Recent orders</h2>
        {loading ? (
          <p className="mt-3 text-sm text-zinc-500">Loading...</p>
        ) : orders.length ? (
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <div key={order._id} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
                <p className="text-sm">Order #{order._id.slice(-6).toUpperCase()}</p>
                <p className="text-sm text-zinc-500">{order.items.length} items • ${order.totalPrice.toFixed(2)} • {order.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">No orders yet.</p>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
