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
import { handleError } from '../../utils/handleError';
import { notifyError, notifySuccess } from '../../utils/notifyError';

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
    const [loginError, res] = await handleError(
      POST('/auth/login', formState.data)
    );
    if (loginError) {
      notifyError(JSON.stringify(loginError.response.data.error.message));
      // console.log('loginError: ', { loginError });
    }
    if (res) {
      localStorage.setItem('token', res.data.token);
      notifySuccess('Login success');
      console.log('logindata: ', res);
    }
  };

  return (
    <Form onSubmit={handleSubmit} width='400px'>
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
        <Label htmlFor='email_address'>
          Email
          <ErrorSpan active={formState.error.email_address}>
            {formState.error.email_address}
          </ErrorSpan>
        </Label>

        <Input
          type='text'
          placeholder='email'
          name='email_address'
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
