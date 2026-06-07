import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteMovie, getApiErrorMessage, getMovies } from '@/api/movies';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/types/movie';

export function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load movies. Make sure the Backend is running.'));
      if (!isRefresh) setMovies([]);
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    setDeletingId(id);
    setError(null);
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch {
      setError('Failed to delete movie. Try again.');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    let ignore = false;

    void (async () => {
      try {
        const data = await getMovies();
        if (!ignore) setMovies(data);
      } catch (err) {
        if (!ignore) {
          setError(getApiErrorMessage(err, 'Failed to load movies. Make sure the Backend is running.'));
          setMovies([]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-muted-foreground animate-pulse">Loading movies...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">All Movies</h2>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/add-movie">Add Movie</Link>
          </Button>
          <Button variant="secondary" onClick={() => loadMovies(true)} disabled={refreshing}>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {error && (
        <p className="mb-4 text-destructive font-medium text-center bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          {error}
        </p>
      )}

      {movies.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl space-y-4">
          <p className="text-muted-foreground">No movies to display</p>
          <Button asChild>
            <Link to="/add-movie">Add your first movie</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{movie.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{movie.genre}</p>
                  <p className="text-foreground text-sm mt-2">{movie.description}</p>
                </div>

                {movie.id != null && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(movie.id!)}
                    disabled={deletingId === movie.id}
                  >
                    {deletingId === movie.id ? 'Deleting...' : 'Delete Movie'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
