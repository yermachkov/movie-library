import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/movies-api';
import { Box } from 'components/Box';

export const Cast = () => {
  const [movieCast, setMovieCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    api.fetchMovieCreditsById(movieId).then(data => setMovieCast(data.cast));
  }, [movieId]);

  return (
    <div>
      {movieCast && movieCast.length ? (
        <Box as="ul" display="flex" flexDirection="column" gridGap={15} mt={15}>
          {movieCast.map(({ id, character, name, profile_path }) => {
            const actorPhoto = profile_path
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : 'https://via.placeholder.com/395x574?text=No+photo';

            return (
              <li key={id}>
                <Box display="flex" gridGap={10}>
                  <img src={actorPhoto} alt={`${name}`} width={150} />
                  <div>
                    <p>{name}</p>
                    <p>Character: {character}</p>
                  </div>
                </Box>
              </li>
            );
          })}
        </Box>
      ) : (
        <h2>No data</h2>
      )}
    </div>
  );
};
