import { useEffect, useState } from 'react';
import axios from 'axios';
import { getApiErrorMessage, searchMovies } from '@/api/movies';
import { Input } from '@/components/ui/input';
import type { Movie } from '@/types/movie';

function isAborted(error: unknown): boolean {
  return axios.isAxiosError(error) && error.code === 'ERR_CANCELED';
}

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setMovies([]);
      setError(null);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    const timer = setTimeout(() => {
      void (async () => {
        if (cancelled) return;
        setError(null);

        try {
          const data = await searchMovies(trimmed, controller.signal);
          if (!cancelled) setMovies(data);
        } catch (err) {
          if (cancelled || controller.signal.aborted || isAborted(err)) return;
          setError(getApiErrorMessage(err, 'Search failed. Try again.'));
          setMovies([]);
        }
      })();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Search Movies</h2>

      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Movie title"
        className="mb-6"
      />

      {error && (
        <p className="mb-4 text-destructive font-medium text-center bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          {error}
        </p>
      )}

      <div className="space-y-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-bold text-foreground">{movie.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{movie.genre}</p>
            <p className="text-foreground text-sm mt-2">{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
