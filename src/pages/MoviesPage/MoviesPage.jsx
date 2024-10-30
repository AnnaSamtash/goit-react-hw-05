import css from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { fetchMoviesByQuery, fetchSortedMovies } from '../../movies-api';
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
import SelectSortedBar, {
  filterOptions,
} from '../../components/SelectSortedBar/SelectSortedBar';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
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
  const [fetchMoviesData, loading, error] = useFetching(getMovie);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState(
    filterOptions[0].options[0]
  );
  const { movieName, sortedBy } = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  useEffect(() => {
    (async () => {
      fetchMoviesData();
    })();
  }, [searchParams, currentPage]);

  async function getMovie() {
    let data;
    if (movieName) {
      data = await fetchMoviesByQuery(movieName, currentPage);
    } else if (sortedBy) {
      data = await fetchSortedMovies(sortedBy, currentPage);
    }
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
    setSearchParams({ movieName: queryText });
    setQuery('');
  };

  const handleSelectChange = selectedOption => {
    setSelectedOption(selectedOption);
    setSearchParams({ sortedBy: selectedOption.value });
  };

  const displayedButtonList = pagesArray.slice(range.start, range.end);

  return (
    <main className={css.container}>
      <div className={css.filters_container}>
        <SearchBar
          value={query}
          onChange={e => setQuery(e.target.value)}
          handleSubmit={handleSubmit}
        />
        <SelectSortedBar value={selectedOption} onChange={handleSelectChange} />
      </div>
      {loading && <Loader />}
      {error && !loading && <NotFoundPage>{error}</NotFoundPage>}
      {movies?.length > 0 && !loading && <MovieListMoviePage items={movies} />}
      {movies?.length > 0 && (
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
