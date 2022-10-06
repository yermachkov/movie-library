import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/movies-api';

const Reviews = () => {
  const [movieReviews, setMovieReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    api
      .fetchMovieReviewsById(movieId)
      .then(data => setMovieReviews(data.results));
  }, [movieId]);

  return (
    <div>
      {movieReviews && movieReviews.length ? (
        <ul>
          {movieReviews.map(({ id, name, content }) => {
            return (
              <li key={id}>
                <p>Author: {name ? name : 'Anonymus'}</p>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default Reviews;
