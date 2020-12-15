import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context';
import { handleError } from '../utils/handleError';
import { GET } from '../utils/httpClient';
import { notifyError, notifySuccess } from '../utils/notifyError';
import { MovieCard } from '../components/movies/movieCard.component';

const SideDiv = styled.div`
  width: 300px;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  position: fixed;
  left: 0;
  color: wheat;
  padding: 20px;
`;

const ContentContainerDiv = styled.div`
  margin-left: 300px;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
`;

const H1 = styled.h1`
  font-size: 32px;
  color: wheat;
  text-align: center;
`;

const MenuUL = styled.ul`
  list-style: none;
  margin: 20px 0;
`;

const MenuLI = styled.li`
  margin: 10px 0;
`;

const H3 = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const ItemsDiv = styled.div`
  margin: 20px;
`;

const P = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  color: wheat;
`;

const MovieContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export const DashboardScreen = () => {
  const userContext = useContext(UserContext);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const [moviesFetchError, moviesRes] = await handleError(
        GET(`/movies`, {})
      );

      if (moviesFetchError) {
        console.log({ moviesFetchError });
        return notifyError('Movies Fetching failed');
      }
      console.log('movies: ', moviesRes);
      notifySuccess('Movies Fetched!');
      setMovies(moviesRes.data);
    };
    fetchMovies();
    return () => {};
  }, []);

  const MovieCards = movies.map((movie, idx) => {
    return (
      <MovieCard
        key={idx}
        width='200px'
        movieName={movie.title}
        movieImage={movie.images[0]}
        movieDescription={movie.description}
        movieGenre={movie.genre}
      />
    );
  });

  return (
    <>
      <SideDiv>
        <H1>Movie Rating APP</H1>
        <MenuUL>
          <MenuLI>
            <H3>Movies</H3>
            <ItemsDiv>
              <Link>
                <P>Add movie</P>
              </Link>
              <Link>
                <P>Add movie</P>
              </Link>
              <Link>
                <P>Add movie</P>
              </Link>
              <Link>
                <P>Add movie</P>
              </Link>
              <Link>
                <P>Add movie</P>
              </Link>
            </ItemsDiv>
          </MenuLI>
          <MenuLI>Users</MenuLI>
        </MenuUL>
      </SideDiv>
      <ContentContainerDiv>
        <h1>{userContext.userState.username}</h1>
        <MovieContainer>{MovieCards}</MovieContainer>
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ContentContainerDiv>
    </>
  );
};
