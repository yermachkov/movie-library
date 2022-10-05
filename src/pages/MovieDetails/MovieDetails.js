import { useEffect, useState } from 'react';
import { Box } from 'components/Box';
import { Link, Outlet, useParams } from 'react-router-dom';

import api from 'services/movies-api';

export const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  // const location = useLocation();

  useEffect(() => {
    api.fetchMovieById(movieId).then(movie => setMovie(movie));
  }, [movieId]);

  if (!movie) return;

  const { poster_path, title, release_date, vote_average, genres, overview } =
    movie;

  const imgUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/395x574?text=No+poster';

  const release = release_date ? release_date.slice(0, 4) : 'No release date';

  const score = (vote_average * 10).toFixed(0);

  return (
    <main>
      <div>
        <button>Go back</button>
        <Box display="flex" gridGap={15}>
          <img src={imgUrl} alt={`The poster of ${title}`} width={300} />
          <div>
            <h2>
              {title} ({release})
            </h2>
            <p>User Score: {score}%</p>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h4>Genres</h4>
            <p>{genres.map(genre => genre.name).join(', ')}</p>
          </div>
        </Box>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </main>
  );
};

//     <>
//       <Link to={location?.state?.from ?? '/'}>
//         <BtnGoBack type="button">
//           <AiOutlineArrowLeft size={28} />
//         </BtnGoBack>
//       </Link>
//
//       <AdditionalList>
//         <Item>
//           <NavItem to="cast" state={location.state}>
//             <BiUser size={20} />
//             CAST
//           </NavItem>
//         </Item>
//         <Item>
//           <NavItem to="reviews" state={location.state}>
//             <BsListNested size={20} />
//             REVIEWS
//           </NavItem>
//         </Item>
//       </AdditionalList>
//       <Outlet />
//     </>
//   );
// };
