import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from '../components/layout.component';
import { UserContext } from '../context';
import { handleError } from '../utils/handleError';
import { GET } from '../utils/httpClient';
import { notifyError, notifySuccess } from '../utils/notifyError';
import { MovieCard } from '../components/movies/movieCard.component';
import { Loader } from '../components/ui/loader.component';
import { Pagination } from '../components/ui/pagination.component';

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

export const MoviesScreen = () => {
  const userContext = useContext(UserContext);
  const [moviesData, setMoviesData] = useState({});
  const [hasFetched, setHasFetched] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    page: 1,
    totalPage: null,
    limit: 5,
  });

  const fetchMovies = async (page = 1, limit = 5) => {
    const [moviesErr, moviesRes] = await handleError(
      GET(`/search/movies?page=${page}&limit=${limit}`, {}, false)
    );
    if (moviesErr) {
      return notifyError('Movies could not be fetched!');
    }
    notifySuccess('Movies fetched successfully.');
    setHasFetched(true);
    setPageDetails({
      page: moviesRes.data.currentPage,
      totalPage: moviesRes.data.totalPages,
      limit: 5,
    });
    setMoviesData(moviesRes.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const moviesCards =
    moviesData.data &&
    moviesData.data.map((movie, idx) => {
      return (
        <Link to={`/movies/${movie._id}`} key={idx}>
          <MovieCard
            width='50%'
            hasAdminOptions={false}
            movieName={movie.title}
            movieImage={movie.images}
            movieDescription={movie.description}
          />
        </Link>
      );
    });

  return (
    <Layout>
      <MovieContainer bgColor='wheat'>
        <Loader
          isHidden={!hasFetched}
          width='50px'
          height='50px'
          position='absolute'
          top='50%'
          left='50%'
        />
        {moviesCards}
      </MovieContainer>
      <Pagination
        currentPage={pageDetails.page}
        totalPage={pageDetails.totalPage}
        fetchPage={fetchMovies}
      />
    </Layout>
  );
};
