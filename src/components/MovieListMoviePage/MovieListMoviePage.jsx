import { Link } from 'react-router-dom';
import css from './MovieListMoviePage.module.css';
import { useLocation } from 'react-router-dom';

export default function MovieListMoviePage({ items }) {
  const defaultImg = '/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg';
  const location = useLocation();
  return (
    <ul className={css.list}>
      {items.map(({ id, title, poster_path, release_date }) => {
        return (
          <li key={id}>
            <Link
              to={`/movies/${id}`}
              state={location}
              className={css.list_item}
            >
              <img
                className={css.img}
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : defaultImg
                }
                alt={title}
              />
              <h2 className={css.title}>
                {title} ({release_date.slice(0, 4)})
              </h2>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
