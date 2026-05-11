import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-3 glass-card">
      <h1 className="text-2xl font-semibold">Login</h1>
      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 dark:border-zinc-700"
      />
      <input
        required
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 dark:border-zinc-700"
      />
      <button className="button-primary" type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Login'}
      </button>
      <p className="text-sm text-zinc-500">
        New user?{' '}
        <Link to="/register" className="underline">
          Create an account
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
