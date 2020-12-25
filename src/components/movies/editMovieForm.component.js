import { useState, useEffect } from 'react';
import {
  Form,
  H3,
  Div,
  Label,
  Input,
  Button,
  Textarea,
} from './movieStyledComponent';
import { GET, PUT } from '../../utils/httpClient';
import { notifyError, notifySuccess } from '../../utils/notifyError';
import { handleError } from '../../utils/handleError';
import { Loader } from '../ui';

const FormItems = [
  {
    type: 'text',
    name: 'title',
  },
  {
    type: 'date',
    name: 'releaseDate',
  },
  {
    type: 'number',
    name: 'duration',
  },
  {
    type: 'text',
    name: 'genre',
  },
  {
    type: 'text',
    name: 'trailerLink',
  },
  {
    type: 'text',
    name: 'tags',
  },
  {
    type: 'text',
    name: 'castCrew',
  },
  {
    type: 'text',
    name: 'directors',
  },
  {
    type: 'text',
    name: 'awards',
  },
  {
    type: 'text',
    name: 'songs',
  },
];

export const EditMovieForm = ({ formTitle, movieId, closeForm }) => {
  const [formState, setFormState] = useState({});
  const [editedFormState, setEditedFormState] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearForm = () => {
    const clearFormState = {};
    for (const keys of Object.keys(formState)) {
      clearFormState[keys] = '';
    }
    setFormState(clearFormState);
  };

  useEffect(() => {
    const fetchSingleMovie = async () => {
      const [movieError, movieRes] = await handleError(
        GET(`/movies/${movieId}`, {}, true)
      );
      if (movieError) {
        return notifyError('Movie cannot be fetched!');
      }
      if (movieRes && movieRes.data) {
        const newFormState = {};
        FormItems.forEach((item) => {
          if (typeof movieRes.data[item.name] === 'string') {
            newFormState[item.name] = movieRes.data[item.name];
            if (item.name === 'releaseDate') {
              newFormState[item.name] = movieRes.data[item.name].slice(0, 10);
            }
          }
          if (typeof movieRes.data[item.name] === 'object') {
            newFormState[item.name] = movieRes.data[item.name].join(', ');
          }
        });
        newFormState.description = movieRes.data.description;
        notifySuccess('movie fetched to edit');
        return setFormState((prevState) => ({ ...prevState, ...newFormState }));
      }
    };
    if (movieId) {
      fetchSingleMovie();
    }
  }, [movieId]);

  const handleChange = (e) => {
    let { name, value, files } = e.target;
    if (name === 'image') {
      value = files[0];
    }
    if (!value) {
      let formStateCopy = { ...formState };
      delete formStateCopy[name];
      setFormState(formStateCopy);
      return setEditedFormState(formStateCopy);
    }
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    return setEditedFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    for (const [key, value] of Object.entries(editedFormState)) {
      data.append(key, value);
    }

    const [editMovieError, editMovieRes] = await handleError(
      PUT(`/movies/${movieId}`, data, {}, true)
    );
    if (editMovieError) {
      setIsSubmitting(false);
      return notifyError('Movie editing failed!');
    }
    setIsSubmitting(false);
    clearForm();
    closeForm();
    return notifySuccess('movie edited successfully!');
  };

  const FormList = FormItems.map((item, idx) => (
    <Div key={idx}>
      <Label htmlFor={item.name.toUpperCase()}>{item.name.toUpperCase()}</Label>
      <Input
        type={item.type}
        placeholder={item.name}
        name={item.name}
        onChange={handleChange}
        value={formState[item.name]}
      />
    </Div>
  ));

  return (
    <Form type='submit' onSubmit={handleSubmit}>
      <H3>{formTitle}</H3>
      {FormList}
      <Div>
        <Label htmlFor='file'>IMAGE</Label>
        <Input name='image' type='file' onChange={handleChange} />
      </Div>
      <Div>
        <Label htmlFor='description'>DESCRIPTION</Label>
        <Textarea
          name='description'
          value={formState.description}
          onChange={handleChange}
        />
      </Div>
      <Div>
        <Button type='submit' isHidden={isSubmitting}>
          Submit
        </Button>
        <Loader width='50px' height='50px' isHidden={!isSubmitting} />
      </Div>
    </Form>
  );
};
