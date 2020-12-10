import { useState } from 'react';
import styled from 'styled-components';
import { POST } from '../../utils/httpClient';
import { validateForm } from './validateForm';

const Form = styled.form`
  width: 100%;
  max-width: 400px;
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

const CheckBoxDiv = styled(Div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Label = styled.label`
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  padding: 0 5px;
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
  background-color: black;
  padding: 10px 15px;
  border: 0;
  border-radius: 5px;
  outline: none;

  :hover {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
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

export const LoginForm = () => {
  const [formState, setFormState] = useState({ data: {}, error: {} });

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
    <Form onSubmit={handleSubmit}>
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
        <Button>Submit</Button>
      </Div>
    </Form>
  );
};
