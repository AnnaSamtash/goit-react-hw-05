import { Link } from 'react-router-dom';
import css from './MovieList.module.css';
import { useLocation } from 'react-router-dom';

export default function MovieList({ items }) {
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
  const location = useLocation();
  return (
    <ul className={css.list}>
      {items.map(({ id, title, poster_path, release_date }) => {
        return (
          <li key={id} className={css.list_item}>
            <Link to={`/movies/${id}`} state={location}>
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
