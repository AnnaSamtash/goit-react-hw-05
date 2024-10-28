import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage.jsx')
);
const MovieCast = lazy(() =>
  import('../../components/MovieCast/MovieCast.jsx')
);
const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews.jsx')
);
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:id" element={<MovieDetailsPage />}>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
