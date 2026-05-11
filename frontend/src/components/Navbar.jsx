import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-zinc-800'}`;

const Navbar = () => {
  const { items: cartItems } = useCart();
  const { items: wishItems } = useWishlist();
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/60 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="container-padded flex items-center justify-between py-3">
        <Link to="/" className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Shoplane
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/wishlist" className={linkClass}>
            Wishlist ({wishItems.length})
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart ({cartItems.length})
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleTheme} className="button-secondary">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          {user ? (
            <button type="button" onClick={logout} className="button-primary">
              Logout
            </button>
          ) : (
            <Link to="/login" className="button-primary">
              Login
            </Link>
          )}
        </div>
      </div>
      <nav className="container-padded flex gap-1 overflow-x-auto pb-3 md:hidden">
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/wishlist" className={linkClass}>
          Wishlist ({wishItems.length})
        </NavLink>
        <NavLink to="/cart" className={linkClass}>
          Cart ({cartItems.length})
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
