import css from './SearchBar.module.css';

export default function SearchBar({ value, onChange, handleSubmit }) {
  return (
    <header className={css.SearchBar_container}>
      <form
        onSubmit={e => handleSubmit(e, value)}
        className={css.SearchBar_form}
      >
        <input
          className={css.input}
          type="text"
          value={value}
          onChange={onChange}
          autoComplete="off"
          autoFocus
        />
        <button className={css.SearchBar_btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
