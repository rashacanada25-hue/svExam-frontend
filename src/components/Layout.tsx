import { Link, Outlet, useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex" dir="rtl">
      <nav className="w-56 shrink-0 bg-white border-l border-gray-200 shadow-sm p-4">
        <h1 className="text-lg font-bold text-gray-800 mb-6 px-2">Movie Watchlist</h1>
        <ul className="space-y-2">
          <li>
            <Link to="/all-movies" className={linkClass('/all-movies')}>
              All Movies
            </Link>
          </li>
          <li>
            <Link to="/add-movie" className={linkClass('/add-movie')}>
              Add Movie
            </Link>
          </li>
          <li>
            <Link to="/search-movies" className={linkClass('/search-movies')}>
              Search Movies
            </Link>
          </li>
        </ul>
      </nav>

      <main className="flex-1 p-6 sm:p-8 overflow-auto max-w-3xl">
        <Outlet />
      </main>
    </div>
  );
}
