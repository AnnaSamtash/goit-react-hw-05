import { Link } from 'react-router-dom';
import css from './MovieList.module.css';
import { useLocation } from 'react-router-dom';

export default function MovieList({ items }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {items.map(({ id, title }) => {
        return (
          <li key={id} className={css.list_item}>
            <Link to={`/movies/${id}`} state={location}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
