import css from './ButtonList.module.css';
import Button from '../Button/Button';

export default function ButtonList({ items, handleClick, page }) {
  return (
    <ul className={css.list}>
      {items.map(number => (
        <li key={number} className={css.list_item}>
          <Button
            onClick={() => handleClick(number)}
            selected={number === page}
          >
            {number}
          </Button>
        </li>
      ))}
    </ul>
  );
}
