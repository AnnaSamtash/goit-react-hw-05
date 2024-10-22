import css from './MovieCast.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCastById } from '../../movies-api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieCast() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const defaultImg = '/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg';

  useEffect(() => {
    if (!id) return;
    async function getMovieCast() {
      setError(null);
      setLoading(true);
      try {
        const data = await fetchMovieCastById(id);
        if (data.cast.length === 0) {
          throw new Error('Sorry, no actor available!');
        }
        const actorsByMovie = data.cast.filter(
          actor => actor.known_for_department === 'Acting'
        );
        setActors(actorsByMovie);
      } catch (error) {
        setError(`${error.message}. Please try again!`);
      } finally {
        setLoading(false);
      }
    }
    getMovieCast();
  }, [id]);

  return (
    <div>
      {loading && <Loader />}
      {error && !loading && <ErrorMessage>{error}</ErrorMessage>}
      {actors.length > 0 && !loading && (
        <ul className={css.list}>
          {actors.map(({ id, profile_path, name }) => (
            <li key={id}>
              <img
                className={css.img}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : defaultImg
                }
                alt={name}
                width="191px"
                height="285px"
              />
              <div>
                <p className={css.actorName}>{name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
