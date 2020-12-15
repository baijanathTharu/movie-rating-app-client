import styled from 'styled-components';

const IMG_URL = process.env.REACT_APP_IMG_URL;

const CardDiv = styled.div`
  width: ${(props) => props.width};
`;

const MovieImage = styled.img`
  object-fit: contain;
  width: 100%;
`;

const H3 = styled.h3``;

const P = styled.p``;

export const MovieCard = ({
  width,
  movieName,
  movieImage,
  movieDescription,
}) => {
  return (
    <CardDiv>
      <MovieImage src={`${IMG_URL}/${movieImage}`} />
      <H3>{movieName}</H3>
      <P>{movieDescription}</P>
    </CardDiv>
  );
};
