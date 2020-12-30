import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Layout } from '../components/layout.component';
import { UserContext } from '../context';
import { handleError } from '../utils/handleError';
import { GET } from '../utils/httpClient';
import { notifyError, notifySuccess } from '../utils/notifyError';
import { Loader } from '../components/ui/loader.component';
import dayjs from 'dayjs';

const MovieDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin: 0 auto;
  width: 80%;
  /* border: 1px solid red; */
`;

const H2 = styled.h2`
  color: ${(props) => props.color};
  font-size: 48px;
  font-weight: bold;
  text-align: left;
  margin: 10px 0;
`;

const ImgDiv = styled.div``;

const Div = styled.div``;

const Img = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const DetalDiv = styled.div`
  margin: 10px auto;
  display: flex;
  /* justify-content: space-between; */
`;

const P = styled.p`
  color: ${(props) => props.color || 'black'};
  font-size: 18px;
  margin: 0 5px;
`;

const IMG_URL = process.env.REACT_APP_IMG_URL;

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

  const imageSrc =
    movieData.data && movieData.data[0].images
      ? `${IMG_URL}/${movieData.data[0].images}`
      : `https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg`;

  const convertArrayToString = (arr) => {
    return arr.join(', ');
  };

  const relDate =
    movieData.data &&
    movieData.data[0].releaseDate &&
    new Date(movieData.data[0].releaseDate.slice(0, 10)).toUTCString();
  console.log(relDate);
  return (
    <Layout>
      <MovieDiv>
        <ImgDiv>
          <Img src={imageSrc} alt='image' />
        </ImgDiv>
        <Div>
          <H2>
            {movieData.data &&
              movieData.data[0].title &&
              movieData.data[0].title}
          </H2>
          <DetalDiv>
            <P>Genre: </P>
            <P color='orangered'>
              {movieData.data &&
                movieData.data[0].genre &&
                convertArrayToString(movieData.data[0].genre)}
            </P>
          </DetalDiv>
          <DetalDiv>
            <P>Directors: </P>
            <P color='orangered'>
              {movieData.data &&
                movieData.data[0].directors &&
                convertArrayToString(movieData.data[0].directors)}
            </P>
          </DetalDiv>
          <DetalDiv>
            <P>Length: </P>
            <P color='orangered'>
              {movieData.data &&
                movieData.data[0].duration &&
                movieData.data[0].duration}{' '}
              mins
            </P>
          </DetalDiv>
          <DetalDiv>
            <P>ReleaseDate: </P>
            <P color='orangered'>{dayjs(relDate).toString()}</P>
          </DetalDiv>
          <DetalDiv>
            <P>Casts: </P>
            <P color='orangered'>
              {movieData.data &&
                movieData.data[0].casts &&
                convertArrayToString(movieData.data[0].casts)}
            </P>
          </DetalDiv>
          <DetalDiv>
            <P>Description: </P>
            <P color='orangered'>
              {movieData.data &&
                movieData.data[0].description &&
                movieData.data[0].description}
            </P>
          </DetalDiv>

          {/* trailerLink: "https://www.youtube.com/watch?v=YoHD9XEInc0" */}
        </Div>
        <Loader isHidden={hasFetched} width='100px' height='100px' />
      </MovieDiv>
    </Layout>
  );
};
