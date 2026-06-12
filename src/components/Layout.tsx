import { Link, Outlet, useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `block text-center md:text-right px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 whitespace-nowrap ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col md:flex-row" dir="rtl">
      <nav className="w-full md:w-56 shrink-0 bg-white border-b md:border-b-0 md:border-l border-gray-200 shadow-sm p-3 md:p-4">
        <h1 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-6 px-2 text-center md:text-right">
          Movie Watchlist
        </h1>
        <ul className="flex md:flex-col gap-2 md:gap-0 md:space-y-2">
          <li className="flex-1 md:flex-none">
            <Link to="/all-movies" className={linkClass('/all-movies')}>
              All Movies
            </Link>
          </li>
          <li className="flex-1 md:flex-none">
            <Link to="/add-movie" className={linkClass('/add-movie')}>
              Add Movie
            </Link>
          </li>
          <li className="flex-1 md:flex-none">
            <Link to="/search-movies" className={linkClass('/search-movies')}>
              Search
            </Link>
          </li>
        </ul>
      </nav>

      <main className="flex-1 w-full p-4 sm:p-6 md:p-8 overflow-auto max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
}
