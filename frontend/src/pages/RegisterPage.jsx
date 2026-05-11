import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-3 glass-card">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <input
        required
        placeholder="Name"
        value={form.name}
        onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        className="w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 dark:border-zinc-700"
      />
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
        {loading ? 'Creating...' : 'Register'}
      </button>
      <p className="text-sm text-zinc-500">
        Already have an account?{' '}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterPage;
