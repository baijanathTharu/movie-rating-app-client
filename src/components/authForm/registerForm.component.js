import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { POST } from '../../utils/httpClient';
import { validateForm } from './validateForm';

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  background-color: lightsalmon;
  border-radius: 10px;
`;

const H3 = styled.h3`
  text-align: center;
  font-size: 18px;
  margin: 10px 0;
`;

const Div = styled.div`
  padding: 10px;
  margin: 10px 0;
`;

const Label = styled.label`
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  font-size: 18px;
  padding: 15px;
  background-color: wheat;
  outline: none;
  border: 0;
  border-radius: 50px;
`;

const Button = styled.button`
  color: wheat;
  font-size: 18px;
  background-color: ${(props) =>
    props.disabled ? 'rgba(0,0,0, 0.25)' : 'black'};
  padding: 10px 15px;
  border: 0;
  border-radius: 5px;
  outline: none;
  :hover {
    background-color: ${(props) =>
      props.disabled ? null : 'rgba(0, 0, 0, 0.8)'};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

const ErrorSpan = styled.span`
  font-size: 12px;
  color: tomato;
  background-color: black;
  margin: 0 10px;
  padding: 0 10px;
  display: ${(props) => (props.active ? 'inline-block' : 'none')};
`;

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
    const res = await POST('/auth/register', formState.data);
    // TODO:: Error handling
    console.log('res: ', res);
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
      console.log('error: ', formState.error);
      return {
        data: { ...prevState.data, [name]: value },
        error: { ...errorObj },
      };
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        <Label htmlFor='username'>
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
