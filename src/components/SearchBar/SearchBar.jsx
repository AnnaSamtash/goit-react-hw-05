import css from './SearchBar.module.css';

export default function SearchBar({ value, onChange, handleSubmit }) {
  return (
    <form onSubmit={e => handleSubmit(e, value)} className={css.SearchBar_form}>
      <input
        className={css.SearchBar_input}
        type="text"
        value={value}
        onChange={onChange}
        autoComplete="off"
        autoFocus
        placeholder="Search movie..."
      />
      <button className={css.SearchBar_btn} type="submit">
        Search
      </button>
    </form>
  );
}
