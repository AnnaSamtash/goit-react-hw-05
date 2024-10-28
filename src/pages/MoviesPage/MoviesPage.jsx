import css from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMoviesByQuery } from '../../movies-api';
import Loader from '../../components/Loader/Loader';
import MovieListMoviePage from '../../components/MovieListMoviePage/MovieListMoviePage';
import SearchBar from '../../components/SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useFetching } from '../../hooks/useFetching';
import usePagination from '../../hooks/usePagination';
import Button from '../../components/Button/Button';
import { FaCaretLeft } from 'react-icons/fa';
import { FaCaretRight } from 'react-icons/fa';
import ButtonList from '../../components/ButtonList/ButtonList';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [
    currentPage,
    nextPage,
    prevPage,
    setPage,
    pagesArray,
    range,
    handleNextRange,
    handlePrevRange,
  ] = usePagination(1, totalPages);
  const [fetchMovies, loading, error] = useFetching(getMovieByQuery);

  useEffect(() => {
    (async () => {
      fetchMovies();
    })();
  }, [searchParams, currentPage]);

  async function getMovieByQuery() {
    const movieName = searchParams.get('movieName') ?? '';
    if (movieName === '') return;
    const data = await fetchMoviesByQuery(movieName, currentPage);
    const { total_pages, results } = data;
    if (results.length === 0) {
      throw new Error('Sorry, no movies on this request!');
    }
    setMovies(results);
    setTotalPages(total_pages);
  }

  const handleSubmit = (e, queryText) => {
    e.preventDefault();
    setMovies([]);
    if (!queryText.trim()) {
      setQuery('');
      setSearchParams({});
      return toast.error('Please enter the query text', {
        duration: 5000,
        position: 'top-right',
        style: {
          color: 'black',
          backgroundColor: 'white',
        },
      });
    }
    searchParams.set('movieName', queryText);
    setSearchParams(searchParams);
    setQuery('');
  };

  const displayedButtonList = pagesArray.slice(range.start, range.end);
  return (
    <main className={css.container}>
      <SearchBar
        value={query}
        onChange={e => setQuery(e.target.value)}
        handleSubmit={handleSubmit}
      />
      {loading && <Loader />}
      {error && !loading && <NotFoundPage>{error}</NotFoundPage>}
      {movies?.length > 0 && !loading && <MovieListMoviePage items={movies} />}
      {totalPages > 1 && (
        <div className={css.button_container}>
          <Button onClick={prevPage} disabled={currentPage === 1}>
            <FaCaretLeft size="32" />
          </Button>
          {range.start > 0 && <Button onClick={handlePrevRange}>...</Button>}
          <ButtonList
            items={displayedButtonList}
            handleClick={setPage}
            page={currentPage}
          />
          {range.end < pagesArray?.length && (
            <Button onClick={handleNextRange}>...</Button>
          )}
          <Button onClick={nextPage} disabled={currentPage === totalPages}>
            <FaCaretRight size="32" />
          </Button>
        </div>
      )}
      <Toaster />
    </main>
  );
}
