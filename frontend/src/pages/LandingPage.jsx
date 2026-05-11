import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => (
  <section className="grid items-center gap-8 md:grid-cols-2">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">New Collection 2026</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Modern gear, curated with precision.</h1>
      <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-300">
        Discover premium electronics and lifestyle essentials with a clean, Apple-inspired shopping experience.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/products" className="button-primary">
          Shop now
        </Link>
        <Link to="/dashboard" className="button-secondary">
          View dashboard
        </Link>
      </div>
    </motion.div>
    <motion.img
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      src="https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
      alt="Modern tech products"
      className="h-[440px] w-full rounded-3xl object-cover shadow-2xl"
    />
  </section>
);

export default LandingPage;
