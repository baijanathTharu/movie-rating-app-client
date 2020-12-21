import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context';
import { handleError } from '../utils/handleError';
import { GET } from '../utils/httpClient';
import { notifyError, notifySuccess } from '../utils/notifyError';
import { MovieCard } from '../components/movies/movieCard.component';
import { MovieBackDrop, PopUp } from '../components/ui';
import { MovieForm } from '../components/movies/addMovieForm.component';
import { EditMovieForm } from '../components/movies/editMovieForm.component';
import { DeleteMovieForm } from '../components/movies/deleteMovieForm.component';
import { Pagination } from '../components/ui/pagination.component';

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
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 20px;
`;

export const DashboardScreen = () => {
  const userContext = useContext(UserContext);
  const [editMoviePopUp, setEditMoviePopUp] = useState({
    isHidden: true,
    movieId: null,
  });
  const [addMoviePopUp, setAddMoviePopUp] = useState({ isHidden: true });
  const [deleteMoviePopUp, setDeleteMoviePopUp] = useState({
    isHidden: true,
    movieId: null,
    movieTitle: null,
  });
  const [movies, setMovies] = useState([]);
  const [pageDetails, setPageDetails] = useState({
    page: 1,
    totalPage: null,
    limit: 5,
  });

  const closeEditPopUp = () =>
    setEditMoviePopUp({
      isHidden: !editMoviePopUp.isHidden,
      movieId: null,
    });

  const closeAddMoviePopUp = () =>
    setAddMoviePopUp({
      isHidden: !addMoviePopUp.isHidden,
    });

  const closeDeleteMoviePopUP = () =>
    setDeleteMoviePopUp({
      isHidden: !deleteMoviePopUp.isHidden,
      movieId: null,
      movieTitle: null,
    });

  const fetchMovies = async (page, limit = pageDetails.limit) => {
    const [moviesFetchError, moviesRes] = await handleError(
      GET(`/movies?page=${page}&limit=${limit}`, {})
    );
    if (moviesFetchError) {
      return notifyError('Movies Fetching failed');
    }
    notifySuccess('Movies Fetched!');
    // console.log('res: ', moviesRes.data);
    setPageDetails((prevState) => ({
      ...prevState,
      page: +moviesRes.data.currentPage,
      totalPage: moviesRes.data.totalPages,
    }));

    setMovies(moviesRes.data.movie);
  };

  useEffect(() => {
    fetchMovies(1);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('currentpage: ', pageDetails.page);

  const MovieCards = movies.map((movie, idx) => {
    return (
      <MovieCard
        key={idx}
        width='250px'
        movieName={movie.title}
        movieImage={movie.images[0]}
        movieDescription={movie.description}
        movieGenre={movie.genre}
        triggerPopUp={() =>
          setEditMoviePopUp({ isHidden: false, movieId: movie._id })
        }
        triggerConfirmDeletePopUp={() =>
          setDeleteMoviePopUp({
            isHidden: false,
            movieId: movie._id,
            movieTitle: movie.title,
          })
        }
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
              <P onClick={() => setAddMoviePopUp({ isHidden: false })}>
                Add movie
              </P>
              <P>Add movie</P>
              <P>Add movie</P>
              <P>Add movie</P>
              <P>Add movie</P>
            </ItemsDiv>
          </MenuLI>
          <MenuLI>Users</MenuLI>
        </MenuUL>
      </SideDiv>
      <ContentContainerDiv>
        <MovieContainer>{MovieCards}</MovieContainer>
        <Pagination
          currentPage={pageDetails.page}
          totalPage={pageDetails.totalPage}
          fetchPage={(pageNo) => fetchMovies(pageNo)}
        />
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
      <PopUp
        isHidden={editMoviePopUp.isHidden}
        closePopUp={closeEditPopUp}
        width='70vw'
        height='80vh'
      >
        <EditMovieForm
          formTitle='Edit movie'
          movieId={editMoviePopUp.movieId}
        />
      </PopUp>
      <PopUp
        isHidden={addMoviePopUp.isHidden}
        closePopUp={closeAddMoviePopUp}
        width='70vw'
        height='80vh'
      >
        <MovieForm formTitle='Add a movie' />
      </PopUp>
      <PopUp
        isHidden={deleteMoviePopUp.isHidden}
        closePopUp={closeDeleteMoviePopUP}
        width='40vw'
        height='30vh'
      >
        <DeleteMovieForm
          movieId={deleteMoviePopUp.movieId}
          movieTitle={deleteMoviePopUp.movieTitle}
          cancelDelete={() =>
            setDeleteMoviePopUp({
              isHidden: !deleteMoviePopUp.isHidden,
              movieId: null,
              movieTitle: null,
            })
          }
        />
      </PopUp>
      <MovieBackDrop
        togglePopUp={closeEditPopUp}
        isHidden={editMoviePopUp.isHidden}
      />
      <MovieBackDrop
        togglePopUp={closeAddMoviePopUp}
        isHidden={addMoviePopUp.isHidden}
      />
      <MovieBackDrop
        togglePopUp={closeDeleteMoviePopUP}
        isHidden={deleteMoviePopUp.isHidden}
      />
    </>
  );
};
