import { useState, useEffect } from 'react';
import {
  Form,
  H3,
  Div,
  Label,
  Input,
  Button,
  ErrorSpan,
  CheckBoxDiv,
} from './formStyledComponent';
import { POST } from '../../utils/httpClient';
import { validateForm } from './validateForm';

export const LoginForm = () => {
  const [formState, setFormState] = useState({
    data: {},
    error: {},
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      !Object.keys(formState.error).length &&
      Object.keys(formState.data).length === 3
    ) {
      return setIsValid(true);
    }
    setIsValid(false);
  }, [formState.error, formState.data]);

  const handleChange = (e) => {
    let { name, value, checked } = e.target;
    if (name === 'remember_me') {
      value = checked;
    }
    setFormState((prevState) => {
      const errorObj = { ...prevState.error };
      !validateForm(name, value)
        ? delete errorObj[name]
        : (errorObj[name] = validateForm(name, value));

      return {
        data: { ...prevState.data, [name]: value },
        error: { ...errorObj },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await POST('/auth/login', formState.data);
    // TODO:: Error handling
    console.log('login res: ', res);
  };

  return (
    <Form onSubmit={handleSubmit} width='login'>
      <H3>Please Login Here</H3>
      <Div>
        <Label htmlFor='username'>
          Username
          <ErrorSpan active={formState.error.username}>
            {formState.error.username}
          </ErrorSpan>
        </Label>

        <Input
          type='text'
          placeholder='username'
          name='username'
          onChange={handleChange}
        />
      </Div>
      <Div>
        <Label htmlFor='email'>
          Email
          <ErrorSpan active={formState.error.email}>
            {formState.error.email}
          </ErrorSpan>
        </Label>

        <Input
          type='text'
          placeholder='email'
          name='email'
          onChange={handleChange}
        />
      </Div>
      <Div>
        <Label htmlFor='password'>
          Password{' '}
          <ErrorSpan active={formState.error.password}>
            {formState.error.password}
          </ErrorSpan>
        </Label>

        <Input
          type='password'
          placeholder='password'
          name='password'
          onChange={handleChange}
        />
      </Div>
      <CheckBoxDiv>
        <Label htmlFor='remember_me'>Remember Me</Label>
        <input type='checkbox' name='remember_me' onChange={handleChange} />
      </CheckBoxDiv>
      <Div>
        <Button type='submit' disabled={!isValid}>
          Submit
        </Button>
      </Div>
    </Form>
  );
};
