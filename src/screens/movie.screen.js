import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Layout } from '../components/layout.component';
import banner from '../images/movie-rating-app-hero.webp';
import { UserContext } from '../context';
import { handleError } from '../utils/handleError';
import { GET } from '../utils/httpClient';
import { notifyError, notifySuccess } from '../utils/notifyError';
import { MovieCard } from '../components/movies/movieCard.component';
import { Loader } from '../components/ui/loader.component';

const Hero = styled.div`
  width: 100%;
  height: 93vh;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 7vh;
  width: 100%;
  height: 86vh;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  align-items: center;

  @media (max-width: 320px) {
    padding: 10px 0;
    grid-gap: 20px;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
  color: ${(props) => props.color};
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
`;

const MovieContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 20px;
  background-color: ${(props) => props.bgColor};
`;

export const MovieScreen = ({ match }) => {
  const {
    params: { movieId },
  } = match;
  const userContext = useContext(UserContext);
  const [movieData, setMovieData] = useState({});
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const [moviesErr, movieRes] = await handleError(
        GET(`/search/movies?id=${movieId}`, {}, false)
      );
      if (moviesErr) {
        return notifyError('Movie could not be fetched!');
      }
      notifySuccess('Movie fetched successfully.');
      setHasFetched(true);
      setMovieData(movieRes.data);
      console.log('fetched: ', movieRes);
    };
    fetchMovie();
  }, [movieId]);

  return (
    <Layout>
      <Hero
        style={{
          backgroundImage: 'url(' + banner + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      />
      <HeroContent>
        <Div>
          <H2 color='green'>
            Hey{' '}
            {userContext.userState.username
              ? userContext.userState.username
              : 'Stranger'}
          </H2>
          <H2 color='wheat'>See Single Movie</H2>
        </Div>
      </HeroContent>
      <MovieContainer bgColor='wheat'>
        <Loader isHidden={hasFetched} width='100px' height='100px' />
        {movieData.data && movieData.data[0].title && movieData.data[0].title}
      </MovieContainer>
    </Layout>
  );
};
