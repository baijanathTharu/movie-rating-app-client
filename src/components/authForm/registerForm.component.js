import { useState, useEffect } from 'react';
import {
  Form,
  H3,
  Div,
  Label,
  Input,
  Button,
  ErrorSpan,
} from './formStyledComponent';
import { POST } from '../../utils/httpClient';
import { validateForm } from './validateForm';
import { handleError } from '../../utils/handleError';
import { notifyError, notifySuccess } from '../../utils/notifyError';

export const RegisterForm = () => {
  const [formState, setFormState] = useState({
    data: {},
    error: {},
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      !Object.keys(formState.error).length &&
      Object.keys(formState.data).length === 5
    ) {
      return setIsValid(true);
    }
    setIsValid(false);
  }, [formState.error, formState.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [regError, data] = await handleError(
      POST('/auth/register', formState.data)
    );
    if (regError) {
      notifyError(JSON.stringify(regError.response.data.error.message));
      console.log('regError: ', { regError });
    }
    if (data) {
      // TODO:: save token and redirect to correct destination
      notifySuccess('registration success');
      console.log('data: ', data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      const errorObj = { ...prevState.error };
      !validateForm(name, value)
        ? delete errorObj[name]
        : (errorObj[name] = validateForm(name, value));
      if (name === 'confirm-password') {
        !validateForm('confirm-password-match', value, formState.data.password)
          ? delete errorObj['confirm-password-match']
          : (errorObj['confirm-password-match'] = validateForm(
              'confirm-password-match',
              value,
              formState.data.password
            ));
      }
      return {
        data: { ...prevState.data, [name]: value },
        error: { ...errorObj },
      };
    });
  };

  return (
    <Form onSubmit={handleSubmit} width='600px'>
      <H3>Register Form</H3>
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
          <ErrorSpan active={formState.error.email}>
            {formState.error.email}
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
          Password
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
      <Div>
        <Label htmlFor='confirm-password'>
          Confirm Password
          <ErrorSpan active={formState.error['confirm-password']}>
            {formState.error['confirm-password']}
          </ErrorSpan>
          <ErrorSpan active={formState.error['confirm-password-match']}>
            {formState.error['confirm-password-match']}
          </ErrorSpan>
        </Label>
        <Input
          type='password'
          placeholder='confirm password'
          name='confirm-password'
          onChange={handleChange}
        />
      </Div>
      <Div>
        <Label htmlFor='dob'>Date of Birth</Label>
        <Input
          type='date'
          placeholder='dob'
          name='dob'
          onChange={handleChange}
        />
      </Div>
      <Div>
        <Button type='submit' disabled={!isValid}>
          Submit
        </Button>
      </Div>
    </Form>
  );
};
