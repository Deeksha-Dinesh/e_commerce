import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'card',
  });

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const submitOrder = async (event) => {
    event.preventDefault();
    if (!items.length) {
      toast.error('Cart is empty');
      return;
    }

    setLoading(true);
    try {
      await api.post('/orders', {
        items: items.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: form,
        paymentMethod: form.paymentMethod,
      });
      clearCart();
      toast.success('Order placed successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <form onSubmit={submitOrder} className="glass-card space-y-3">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        {['fullName', 'email', 'address', 'city', 'postalCode', 'country'].map((field) => (
          <input
            key={field}
            name={field}
            required
            value={form[field]}
            onChange={onChange}
            placeholder={field}
            className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 outline-none dark:border-zinc-700"
          />
        ))}
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={onChange}
          className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 dark:border-zinc-700"
        >
          <option value="card">Card</option>
          <option value="upi">UPI</option>
          <option value="cod">Cash on delivery</option>
        </select>
        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? 'Placing order...' : 'Place order'}
        </button>
      </form>

      <aside className="glass-card h-fit">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Items: {items.length}</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Subtotal: ${total.toFixed(2)}</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Shipping: {total > 250 ? 'Free' : '$15.00'}</p>
      </aside>
    </section>
  );
};

export default CheckoutPage;
