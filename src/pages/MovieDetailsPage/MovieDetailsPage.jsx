import css from './MovieDetailsPage.module.css';
import { NavLink, useParams, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieById } from '../../movies-api';
import { Suspense, useEffect, useState, useRef } from 'react';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import BackLink from '../../components/BackLink/BackLink';
import clsx from 'clsx';

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const backLinkHref = useRef();
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  useEffect(() => {
    if (!id) return;
    async function getMovieDetails() {
      setError(null);
      setLoading(true);
      try {
        const data = await fetchMovieById(id);
        if (Object.keys.length === 0) {
          setError('Sorry, page no find!');
        }
        setMovieDetails(data);
        backLinkHref.current =
          location.state?.pathname + location.state?.search ?? '/';
      } catch (error) {
        setError('Sorry, page no find!');
      } finally {
        setLoading(false);
      }
    }
    getMovieDetails();
  }, [id]);

  return (
    <main className={css.container}>
      <BackLink to={backLinkHref.current}>Go back</BackLink>
      {loading && <Loader />}
      {error && !loading && <NotFoundPage>{error}</NotFoundPage>}
      {movieDetails && !loading && (
        <section>
          <div className={css.info_wrapper}>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                  : defaultImg
              }
              alt={movieDetails.title}
              width={350}
            />
            <ul className={css.info_list}>
              <li className={css.info_list_item}>
                <h2 className={css.movie_name}>
                  {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
                </h2>
              </li>
              <li className={css.info_list_item}>
                <p className={css.title}>
                  User score: {Math.round(movieDetails.vote_average * 10)}%
                </p>
              </li>
              <li className={css.info_list_item}>
                <h3 className={css.title}>Overview</h3>
                <p className={css.text}>{movieDetails.overview}</p>
              </li>
              <li className={css.info_list_item}>
                <h3 className={css.title}>Genres</h3>
                <p className={css.text}>
                  {movieDetails.genres.map(genre => genre.name).join(', ')}
                </p>
              </li>
            </ul>
          </div>
          <div className={css.add}>
            <h3 className={css.title_add}>Additional information</h3>
            <ul className={css.links_list}>
              <li>
                <NavLink to="cast" className={buildLinkClass}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={buildLinkClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>
            <Suspense fallback={<div>Loading subpage...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </section>
      )}
    </main>
  );
}
