import {
  Form,
  H3,
  Div,
  Label,
  Input,
  Button,
  ErrorSpan,
  CheckBoxDiv,
  Strong,
  Textarea,
} from './movieStyledComponent';

const FormItems = [
  {
    type: 'text',
    name: 'title',
  },
  {
    type: 'file',
    name: 'images',
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

export const MovieForm = ({ formTitle }) => {
  const FormList = FormItems.map((item, idx) => (
    <Div key={idx}>
      <Label htmlFor={item.name.toUpperCase()}>{item.name.toUpperCase()}</Label>
      <Input type={item.type} placeholder={item.name} name={item.name} />
    </Div>
  ));

  return (
    <Form type='submit'>
      <H3>{formTitle}</H3>
      {FormList}
      <Div>
        <Label htmlFor='description'>DESCRIPTION</Label>
        <Textarea />
      </Div>

      <Div>
        <Button type='submit'>Submit</Button>
      </Div>
    </Form>
  );
};
