import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="glass-card text-center">
    <h1 className="text-2xl font-semibold">Page not found</h1>
    <Link to="/" className="button-primary mt-4 inline-flex">
      Go home
    </Link>
  </div>
);

export default NotFoundPage;
