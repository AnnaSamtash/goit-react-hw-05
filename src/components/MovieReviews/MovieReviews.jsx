import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieReviewsById } from '../../movies-api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieCast() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    async function getMovieReviews() {
      setError(null);
      setLoading(true);
      try {
        const data = await fetchMovieReviewsById(id);
        if (data.results.length === 0) {
          throw new Error('Sorry, there is no reviews!');
        }
        setReviews(data.results);
      } catch (error) {
        setError(`${error.message} Please try again!`);
      } finally {
        setLoading(false);
      }
    }
    getMovieReviews();
  }, [id]);

  return (
    <div>
      {loading && <Loader />}
      {error && !loading && <ErrorMessage>{error}</ErrorMessage>}
      {reviews.length > 0 && !loading && (
        <ul className={css.reviews_list}>
          {reviews.map(({ id, author, content }) => (
            <li className={css.reviews_list_item} key={id}>
              <h3 className={css.author}>{author}</h3>
              <p className={css.review}>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
