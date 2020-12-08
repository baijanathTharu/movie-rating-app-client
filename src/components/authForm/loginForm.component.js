import styled from 'styled-components';

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

export const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <H3>Please Login Here</H3>
      <Div>
        <Label htmlFor='username'>Username</Label>
        <Input type='text' placeholder='username' name='username' />
      </Div>
      <Div>
        <Label htmlFor='password'>Password</Label>
        <Input type='password' placeholder='password' name='password' />
      </Div>
      <CheckBoxDiv>
        <Label htmlFor='remember_me'>Remember Me</Label>
        <input type='checkbox' name='remember_me' />
      </CheckBoxDiv>
      <Div>
        <Button>Submit</Button>
      </Div>
    </Form>
  );
};
