import { useState } from 'react';
import styled from 'styled-components';
import { POST } from '../../utils/httpClient';

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

export const RegisterForm = () => {
  const [formState, setFormState] = useState({ data: {}, error: {} });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await POST('/auth/register', formState.data);
    // TODO:: Error handling
    console.log('res: ', res);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return {
        data: { ...prevState.data, [name]: value },
        error: { ...prevState.error },
      };
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <H3>Register Form</H3>
      <Div>
        <Label htmlFor='username'>Username</Label>
        <Input
          type='text'
          placeholder='username'
          name='username'
          onChange={handleChange}
        />
      </Div>
      <Div>
        <Label htmlFor='username'>Email</Label>
        <Input
          type='text'
          placeholder='email'
          name='email_address'
          onChange={handleChange}
        />
      </Div>
      <Div>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          placeholder='password'
          name='password'
          onChange={handleChange}
        />
      </Div>
      <Div>
        <Label htmlFor='confirm-password'>Confirm Password</Label>
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
        <Button type='submit'>Submit</Button>
      </Div>
    </Form>
  );
};
