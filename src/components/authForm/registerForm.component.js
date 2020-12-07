import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  background-color: wheat;
`;

const Div = styled.div`
  padding: 10px;
  margin: 10px 0;
`;

const Label = styled.label`
  color: orangered;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
`;

const Button = styled.button`
  color: wheat;
  background-color: black;
  padding: 5px;
`;

export const RegisterForm = () => {
  const handleSubmit = () => {};

  return (
    <Form onSubmit={handleSubmit}>
      <Div>
        <Label htmlFor='username'>Username</Label>
        <Input type='text' placeholder='username' name='username' />
      </Div>
      <Div>
        <Label htmlFor='username'>Username</Label>
        <Input type='text' placeholder='username' name='username' />
      </Div>
      <Div>
        <Label htmlFor='username'>Username</Label>
        <Input type='text' placeholder='username' name='username' />
      </Div>
      <Button>Submit</Button>
    </Form>
  );
};
