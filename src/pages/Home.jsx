import { Box } from 'components/Box';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/movies-api';

const Home = () => {
  const [trendingList, setTrendingList] = useState(null);
  const location = useLocation();

  useEffect(() => {
    api.fetchTrendingMovies().then(movies => setTrendingList(movies));
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <Box as="ul" display="flex" flexDirection="column" gridGap={15} mt={15}>
        {trendingList &&
          trendingList.map(({ id, title, poster_path, release_date }) => {
            const imgUrl = poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://via.placeholder.com/395x574?text=No+poster';

            const release = release_date
              ? release_date.slice(0, 4)
              : 'No release date';

            return (
              <li key={id}>
                <Link to={`/movies/${id}`} state={{ from: location }}>
                  <Box display="flex" gridGap={10}>
                    <img
                      src={imgUrl}
                      alt={`Movie poster of ${title}`}
                      loading="lazy"
                      data-id={id}
                      width={200}
                    />
                    <div>
                      <h2>{title}</h2>
                      <p>{release}</p>
                    </div>
                  </Box>
                </Link>
              </li>
            );
          })}
      </Box>
    </div>
  );
};

export default Home;
