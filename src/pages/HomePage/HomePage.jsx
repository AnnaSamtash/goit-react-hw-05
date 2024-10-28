import css from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchMovies } from '../../movies-api';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import MovieListHomePage from '../../components/MovieListHomePage/MovieListHomePage';
import { useFetching } from '../../hooks/useFetching';
import usePagination from '../../hooks/usePagination';
import { useInView } from 'react-intersection-observer';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [fetchTrendingMovies, loading, error] = useFetching(getMovies);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setPage] = usePagination(1, totalPages);
  const { ref: lastElementRef, inView } = useInView({
    threshold: 0.1, // Настройка порога видимости
  });

  useEffect(() => {
    if (inView && currentPage < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, currentPage, totalPages]);

  useEffect(() => {
    (async () => {
      fetchTrendingMovies();
    })();
  }, [currentPage]);

  async function getMovies() {
    const data = await fetchMovies(currentPage);
    const { total_pages, results } = data;
    if (results.length === 0) {
      throw new Error('Sorry, no movies on this request!');
    }
    setMovies(prevMovies => [...prevMovies, ...results]);
    setTotalPages(total_pages);
  }

  return (
    <main className={css.container}>
      <h1 className={css.title}>Trending Today</h1>
      {loading && <Loader />}
      {error && !loading && <NotFoundPage>{error}</NotFoundPage>}
      {movies.length > 0 && (
        <>
          <MovieListHomePage items={movies} />
          <div
            ref={lastElementRef}
            style={{ height: 20, background: 'red' }}
          ></div>
        </>
      )}
    </main>
  );
}
