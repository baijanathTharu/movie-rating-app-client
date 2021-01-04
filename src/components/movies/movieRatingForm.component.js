import { useState } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { Loader } from '../ui/loader.component';
import { handleError } from '../../utils/handleError';
import { PUT } from '../../utils/httpClient';

const RatingForm = styled.form`
  width: 100%;
  height: 100%;
`;

const H2 = styled.h2``;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Label = styled.label`
  font-size: 18px;
  margin: 5px 0;
`;

const ReviewText = styled.textarea`
  height: 200px;
  resize: none;
  padding: 10px;
  font-size: 18px;
`;

const SubmitBtn = styled.button`
  width: 100px;
  height: 50px;
  font-size: 18px;
  background-color: tomato;
  outline: none;
  border: 0;
  color: white;
  cursor: pointer;
  :hover {
    background-color: rgba(255, 99, 71, 0.5);
  }
`;

const ErrSpan = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 10px;
`;

export const MovieRatingForm = ({ movieId }) => {
  const [moviePoint, setMoviePoint] = useState(0);
  const [formData, setFormData] = useState({});
  const [formErr, setFormErr] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarRating = (point) => {
    setMoviePoint(point);
    setFormData({ ...formData, point: point });
  };

  const addReview = async (movieId, reviewData) => {
    const [reviewErr, reviewRes] = await handleError(
      PUT(`/rate/${movieId}`, reviewData, {}, true)
    );
    if (reviewErr) return setFormErr({ submitErr: 'Failed to submit review!' });
    console.log('reviewRes: ', reviewRes);
    return reviewRes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!formData.message) {
      err.message = 'Please add some review!';
    }
    if (!formData.point) {
      err.point = 'Please add your rating!';
    }
    if (err.message || err.point) return setFormErr({ ...err });
    setIsSubmitting(true);
    addReview(movieId, formData);
    // console.log('formData: ', formData);
  };

  const messageErr = formErr && formErr.message && (
    <ErrSpan>{formErr.message}</ErrSpan>
  );

  const pointErr = formErr && formErr.point && (
    <ErrSpan>{formErr.point}</ErrSpan>
  );

  return (
    <RatingForm type='sumbit' onSubmit={handleSubmit}>
      <H2>Add Your Review</H2>
      <FormItem>
        <Label>Review {messageErr}</Label>
        <ReviewText
          name='message'
          value={formData?.message}
          onChange={(e) => handleChange(e)}
        />
      </FormItem>
      <FormItem>
        <Label>Rating {pointErr}</Label>
        <StarRatings
          rating={moviePoint}
          changeRating={(point) => handleStarRating(point)}
          starRatedColor='orangered'
          numberOfStars={5}
          name='rating'
          starDimension='30px'
          starEmptyColor='rgba(0,0,0, 0.1)'
        />
      </FormItem>
      <FormItem>
        <SubmitBtn type='submit'>Submit</SubmitBtn>
        <Loader width='50px' height='50px' isHidden={!isSubmitting} />
      </FormItem>
    </RatingForm>
  );
};
