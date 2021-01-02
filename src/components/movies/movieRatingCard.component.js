import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

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

export const MovieRatingCard = () => {
  return (
    <CardDiv>
      <CardHeader>
        <ImgDiv>
          <Img src='https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg' />
        </ImgDiv>
        <UserTitle>John Doe</UserTitle>
      </CardHeader>
      <CardBody>
        <StarContainer>
          <StarRatings
            rating={2}
            starRatedColor='orangered'
            numberOfStars={5}
            name='rating'
            starDimension='30px'
            starEmptyColor='rgba(0,0,0, 0.1)'
          />
        </StarContainer>
        <ReviewContainer>
          <P>This is some review for this movie.</P>
        </ReviewContainer>
      </CardBody>
    </CardDiv>
  );
};
