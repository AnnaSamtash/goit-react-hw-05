import css from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovies() {
      setError(null);
      setLoading(true);
      try {
        const { results } = await fetchMovies();
        if (results.length === 0) {
          setError('Sorry, no movies on this request!');
        }
        setMovies(results);
      } catch (error) {
        setError(`Sorry, page no find!`);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Trending Today</h1>
      {loading && <Loader />}
      {error && !loading && <NotFoundPage>{error}</NotFoundPage>}
      {movies.length > 0 && <MovieList items={movies} />}
    </main>
  );
}
