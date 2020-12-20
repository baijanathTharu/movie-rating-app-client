import { useState } from 'react';
import {
  Form,
  H3,
  Div,
  Label,
  Input,
  Button,
  Textarea,
} from './movieStyledComponent';
import { POST } from '../../utils/httpClient';
import { notifyError, notifySuccess } from '../../utils/notifyError';
import { handleError } from '../../utils/handleError';
import { Loader } from '../ui';

const FormItems = [
  {
    type: 'text',
    name: 'title',
  },
  {
    type: 'file',
    name: 'image',
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

export const MovieForm = ({ formTitle, movieId }) => {
  const [formState, setFormState] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    let { name, value, files } = e.target;
    if (name === 'image') {
      value = files[0];
    }
    if (!value) {
      let formStateCopy = { ...formState };
      delete formStateCopy[name];
      return setFormState(formStateCopy);
    }
    return setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    FormItems.forEach((item) => {
      data.append(item.name, formState[item.name]);
    });
    data.append('description', formState.description);
    const [movieError, movieRes] = await handleError(
      POST('/movies', data, {}, true)
    );
    if (movieError) {
      setIsSubmitting(false);
      return notifyError('Movie adding failed!');
    }
    setIsSubmitting(false);
    // TODO:: show added movie and clear the form
    return notifySuccess('movie added successfully!');
  };

  const FormList = FormItems.map((item, idx) => (
    <Div key={idx}>
      <Label htmlFor={item.name.toUpperCase()}>{item.name.toUpperCase()}</Label>
      <Input
        type={item.type}
        placeholder={item.name}
        name={item.name}
        onChange={handleChange}
      />
    </Div>
  ));

  return (
    <Form type='submit' onSubmit={handleSubmit}>
      <H3>{formTitle}</H3>
      {FormList}
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
