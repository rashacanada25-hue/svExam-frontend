import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { MoviesPage } from '@/pages/MoviesPage';
import { AddMoviePage } from '@/pages/AddMoviePage';
import { SearchPage } from '@/pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/all-movies" replace />} />
          <Route path="/all-movies" element={<MoviesPage />} />
          <Route path="/add-movie" element={<AddMoviePage />} />
          <Route path="/search-movies" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
