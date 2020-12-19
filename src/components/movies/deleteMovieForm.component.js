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

export const DeleteMovieForm = ({ movieId, movieTitle, cancelDelete }) => {
  const handleDelete = async () => {
    const [deleteError, deleteRes] = await handleError(
      Delete(`/movies/${movieId}`, {}, true)
    );
    if (deleteError) {
      return notifyError(`Deleting ${movieTitle} failed!`);
    }
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
        <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
      </ActionDiv>
    </>
  );
};
