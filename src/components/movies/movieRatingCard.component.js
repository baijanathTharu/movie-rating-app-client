import { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { handleError } from '../../utils/handleError';
import { GET } from '../../utils/httpClient';

const CardDiv = styled.div`
  margin: 20px 0;
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
`;

const CardBody = styled.div`
  margin: 10px 0;
`;

const ImgDiv = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid black;
  border-radius: 50%;
  margin-right: 15px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const UserTitle = styled.h3``;

const StarContainer = styled.div`
  margin: 10px 0;
`;

const ReviewContainer = styled.div``;

const P = styled.p``;

const IMG_URL = process.env.REACT_APP_IMG_URL;

export const MovieRatingCard = ({
  imageName,
  userId,
  ratingPoint,
  comment,
}) => {
  const [reviewUser, setReviewUser] = useState({});

  const imgSrc = imageName
    ? `${IMG_URL}/${imageName}`
    : 'https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg';

  useEffect(() => {
    const fetchUser = async () => {
      const [userErr, userRes] = await handleError(
        GET(`/users/${userId}`, {}, false)
      );
      if (userErr) {
        console.log('err: ', userErr);
        return;
      }
      setReviewUser({ username: userRes.data.username });
    };
    fetchUser();
  }, [userId]);

  return (
    <CardDiv>
      <CardHeader>
        <ImgDiv>
          <Img src={imgSrc} />
        </ImgDiv>
        <UserTitle>{reviewUser?.username}</UserTitle>
      </CardHeader>
      <CardBody>
        <StarContainer>
          <StarRatings
            rating={ratingPoint}
            starRatedColor='orangered'
            numberOfStars={5}
            name='rating'
            starDimension='30px'
            starEmptyColor='rgba(0,0,0, 0.1)'
          />
        </StarContainer>
        <ReviewContainer>
          <P>{comment}</P>
        </ReviewContainer>
      </CardBody>
    </CardDiv>
  );
};
