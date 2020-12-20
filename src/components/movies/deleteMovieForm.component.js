import { useState } from 'react';
import { handleError } from '../../utils/handleError';
import { Delete } from '../../utils/httpClient';
import { notifyError, notifySuccess } from '../../utils/notifyError';
import {
  H3,
  P,
  ActionDiv,
  TitleSpan,
  CancelBtn,
  DeleteBtn,
} from './movieStyledComponent';
import { Loader } from '../ui';

export const DeleteMovieForm = ({ movieId, movieTitle, cancelDelete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    const [deleteError, deleteRes] = await handleError(
      Delete(`/movies/${movieId}`, {}, true)
    );
    if (deleteError) {
      setIsSubmitting(false);
      return notifyError(`Deleting ${movieTitle} failed!`);
    }
    setIsSubmitting(false);
    notifySuccess(`Deleting ${movieTitle} success`);
    // TODO:: update movies list
  };
  return (
    <>
      <H3>Delete Movie</H3>
      <P>
        Are you sure you want to delete <TitleSpan>{movieTitle}</TitleSpan> ?
      </P>
      <ActionDiv width='50%'>
        <CancelBtn onClick={cancelDelete}>Cancel</CancelBtn>
        <DeleteBtn onClick={handleDelete} isHidden={isSubmitting}>
          Delete
        </DeleteBtn>
        <Loader width='50px' height='50px' isHidden={!isSubmitting} />
      </ActionDiv>
    </>
  );
};
