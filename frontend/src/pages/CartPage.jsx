import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (!items.length) {
    return (
      <div className="glass-card text-center">
        <p>Your cart is empty.</p>
        <Link className="button-primary mt-4 inline-flex" to="/products">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item._id} className="glass-card flex flex-col gap-4 sm:flex-row sm:items-center">
            <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-zinc-500">${item.price}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(event) => updateQuantity(item._id, Number(event.target.value))}
              className="w-20 rounded-lg border border-zinc-300 bg-transparent px-2 py-1 dark:border-zinc-700"
            />
            <button type="button" onClick={() => removeFromCart(item._id)} className="button-secondary">
              Remove
            </button>
          </article>
        ))}
      </div>

      <aside className="glass-card h-fit">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="mt-4 flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span>Shipping</span>
          <span>{total > 250 ? 'Free' : '$15.00'}</span>
        </div>
        <Link to="/checkout" className="button-primary mt-5 block text-center">
          Proceed to checkout
        </Link>
      </aside>
    </section>
  );
};

export default CartPage;
