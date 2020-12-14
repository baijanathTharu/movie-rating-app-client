import { useContext } from 'react';
import styled from 'styled-components';
import { Layout } from '../components/layout.component';
import banner from '../images/movie-rating-app-hero.webp';
import { UserContext } from '../context';

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

const H2 = styled.h2`
  color: wheat;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
`;

export const MoviesScreen = () => {
  const userContext = useContext(UserContext);
  console.log('user: ', userContext);
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
          <H2>Show all movies here</H2>
          <p>{userContext.userState.username}</p>
        </Div>
      </HeroContent>
    </Layout>
  );
};
