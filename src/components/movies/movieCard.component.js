import styled from 'styled-components';
import { MdDelete, MdEdit } from 'react-icons/md';

const IMG_URL = process.env.REACT_APP_IMG_URL;

const CardDiv = styled.div`
  width: ${(props) => props.width};
  height: fit-content;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 0 2px 3px black;
  background-color: tomato;
  transform: scale(1);
  :hover {
    transform: scale(1.01);
    box-shadow: 0 10px 10px black;
  }
`;

const MovieImage = styled.img`
  object-fit: contain;
  width: 100%;
  margin-bottom: 10px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
`;

const H3 = styled.h3`
  color: black;
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

const P = styled.p`
  color: black;
  padding: 10px;
  text-align: center;
`;

const ActionDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 24px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const MovieCard = ({
  width,
  movieName,
  movieImage,
  movieDescription,
  triggerPopUp,
}) => {
  const imageSrc = movieImage
    ? `${IMG_URL}/${movieImage}`
    : `https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg`;

  return (
    <CardDiv>
      <MovieImage src={imageSrc} />
      <H3>{movieName}</H3>
      <P>{movieDescription}</P>
      <ActionDiv>
        <MdEdit color='green' cursor='pointer' onClick={triggerPopUp} />
        <MdDelete color='red' cursor='pointer' />
      </ActionDiv>
    </CardDiv>
  );
};
