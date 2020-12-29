import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Layout } from '../components/layout.component';
import { UserContext } from '../context';
import { handleError } from '../utils/handleError';
import { GET } from '../utils/httpClient';
import { notifyError, notifySuccess } from '../utils/notifyError';
import { Loader } from '../components/ui/loader.component';

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
      <Div>
        <H2>
          {movieData.data && movieData.data[0].title && movieData.data[0].title}
        </H2>
        <Loader isHidden={hasFetched} width='100px' height='100px' />
      </Div>
    </Layout>
  );
};
