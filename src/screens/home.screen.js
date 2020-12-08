import styled from 'styled-components';
import { Layout } from '../components';
import { LoginForm } from '../components/authForm';
import banner from '../images/movie-rating-app-hero.jpg';

const Hero = styled.div`
  width: 100%;
  height: 85vh;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 7vh;
  width: 100%;
  height: 85vh;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  align-items: center;

  @media (max-width: 320px) {
    padding: 10px 0;
    grid-gap: 20px;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
  color: wheat;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
`;

const P = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: wheat;
  margin: 0 0 10px 0;
`;

const Button = styled.button`
  background-color: rgb(152, 39, 209);
  color: wheat;
  padding: 10px 20px;
  font-size: 24px;
  border: 0;
  border-radius: 5px;
  outline: none;
  :hover {
    cursor: pointer;
    color: wheat;
    background-color: rgb(152, 39, 209, 0.9);
  }
`;

export const HomeScreen = () => {
  return (
    <Layout>
      <Hero
        style={{
          backgroundImage: 'url(' + banner + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      />
      <HeroContent>
        <Div>
          <H2>Find Quality Movies Here</H2>
          <P>To find out more</P>
          <Button>REGISTER NOW</Button>
        </Div>
        <Div>
          <LoginForm />
        </Div>
      </HeroContent>
    </Layout>
  );
};
