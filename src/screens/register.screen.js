import styled from 'styled-components';
import { Layout } from '../components';
import { RegisterForm } from '../components/authForm';
import banner from '../images/movie-rating-app-hero.webp';

const Hero = styled.div`
  width: 100%;
  height: 86vh;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 7vh;
  width: 100%;
  height: 86vh;
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

export const RegisterScreen = () => {
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
          <RegisterForm />
        </Div>
      </HeroContent>
    </Layout>
  );
};
