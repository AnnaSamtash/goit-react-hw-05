import css from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMoviesByQuery } from '../../movies-api';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const handleSubmit = (e, queryText) => {
    e.preventDefault();
    setMovies([]);
    if (!queryText.trim()) {
      setQuery('');
      return toast.error('Please enter the query text', {
        duration: 5000,
        position: 'top-right',
        style: {
          color: 'red',
          backgroundColor: 'white',
        },
      });
    }
    searchParams.set('movieName', queryText);
    setSearchParams(searchParams);
    setQuery('');
  };

  useEffect(() => {
    const movieName = searchParams.get('movieName') ?? '';
    if (movieName === '') return;
    async function getMovieByQuery() {
      setError(null);
      setLoading(true);
      try {
        const { results } = await fetchMoviesByQuery(movieName);
        if (results.length === 0) {
          throw new Error('Sorry, no movies on this request!');
        }
        setMovies(results);
      } catch (error) {
        setError(`Sorry, page no find!`);
      } finally {
        setLoading(false);
      }
    }
    getMovieByQuery();
  }, [searchParams]);

  return (
    <main className={css.container}>
      <SearchBar
        value={query}
        onChange={e => setQuery(e.target.value)}
        handleSubmit={handleSubmit}
      />
      {loading && <Loader />}
      {error && !loading && <NotFoundPage>{error}</NotFoundPage>}
      {movies.length > 0 && !loading && <MovieList items={movies} />}
      <Toaster />
    </main>
  );
}
