import { useEffect, useState } from 'react';
import { deleteMovie, getApiErrorMessage, getMovies } from '@/api/movies';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/types/movie';

export function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleDelete = async (id: string | number) => {
    setDeletingId(id);
    setError(null);

    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => String(movie.id) !== String(id)));
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to delete movie. Try again.'));
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-muted-foreground animate-pulse">Loading movies...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">All Movies</h2>

      {error && (
        <p className="mb-4 text-destructive font-medium text-center bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          {error}
        </p>
      )}

      {movies.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 bg-card border border-border rounded-xl">
          No movies to display
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="aspect-square bg-card border border-border rounded-xl p-3 sm:p-4 shadow-sm flex flex-col"
            >
              <h3 className="text-sm sm:text-base font-bold text-foreground line-clamp-2 break-words">
                {movie.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">{movie.genre}</p>
              <p className="text-foreground text-xs sm:text-sm mt-2 flex-1 overflow-hidden line-clamp-4 break-words">
                {movie.description}
              </p>

              {movie.id != null && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full mt-3 shrink-0"
                  onClick={() => handleDelete(movie.id!)}
                  disabled={deletingId === movie.id}
                >
                  {deletingId === movie.id ? 'Deleting...' : 'Delete Movie'}
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
