import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => (
  <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-50 text-zinc-900 dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
    <Navbar />
    <main className="container-padded py-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
