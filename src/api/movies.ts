import axios from 'axios';
import type { Movie, NewMovie } from '@/types/movie';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      const url = error.config?.url ?? '';
      if (url.includes('/movies/') && error.config?.method === 'delete') {
        return 'הסרט לא נמצא (404).';
      }
      return `ה-endpoint לא קיים בבאקאנד (404): ${url || 'unknown'}. וודאי ש-VITE_API_URL מצביע לשרת הנכון ושה-Backend רץ.`;
    }
    if (error.code === 'ERR_NETWORK') {
      return 'שגיאת רשת — לא ניתן להגיע לשרת. בדקי את VITE_API_URL, CORS, ושה-Backend רץ.';
    }
  }
  return fallback;
}

export async function getMovies(): Promise<Movie[]> {
  const response = await axios.get<Movie[]>(`${apiUrl}/movies`);
  return response.data;
}

export async function addMovie(movie: NewMovie): Promise<void> {
  await axios.post(`${apiUrl}/movies`, movie);
}

export async function deleteMovie(id: string | number): Promise<void> {
  await axios.delete(`${apiUrl}/movies/${id}`);
}

export async function searchMovies(name: string, signal?: AbortSignal): Promise<Movie[]> {
  const response = await axios.get<Movie[]>(`${apiUrl}/movies/search`, {
    params: { name },
    signal,
  });
  return response.data;
}

export async function generateMovieDescription(
  title: string,
  genre: string
): Promise<{ description: string }> {
  const response = await axios.post<{ description: string }>(`${apiUrl}/movies/generate`, {
    title,
    genre,
  });
  return response.data;
}

export { apiUrl };
