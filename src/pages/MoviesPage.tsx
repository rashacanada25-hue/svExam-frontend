import { useEffect, useState } from 'react';
import { getMovies, deleteMovie, getApiErrorMessage } from '@/api/movies';
import { Button } from '@/components/ui/button';
import { type Movie } from '@/types/movie';
import "../App.css";

export function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  useEffect(() => {
    getMovies().then(data => setMovies(data));
  }, []);

  const handleDelete = async (id: string | number) => {
    setDeletingId(id);
    try {
      await deleteMovie(id);
      setMovies(movies.filter(m => m.id !== id));
    } catch (err) {
      console.error(getApiErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  const generateAIDescription = async (movie: Movie) => {
    try {
      const response = await fetch('http://localhost:3000/movies/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: movie.title, genre: movie.genre }),
      });
      const data = await response.json();
      setMovies(prev => prev.map(m => 
        m.id === movie.id ? { ...m, description: data.description } : m
      ));
    } catch (error) {
      console.error("AI Error:", error);
    }
  };

  return (
    <div className="movies-container" style={{ padding: '20px' }}>
      <h1>All Movies</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {movies.map(movie => (
          <div key={movie.id} style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>{movie.title}</h3>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p>{movie.description || "No description yet."}</p>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <Button variant="destructive" onClick={() => handleDelete(movie.id)} disabled={deletingId === movie.id}>
                {deletingId === movie.id ? 'Deleting...' : 'Delete Movie'}
              </Button>
              {!movie.description && (
                <Button onClick={() => generateAIDescription(movie)}>
                  AI Description
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}