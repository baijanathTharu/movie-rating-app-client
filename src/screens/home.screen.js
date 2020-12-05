import styled from 'styled-components';
import { Layout } from '../components';
import banner from '../images/movie-rating-app-hero.jpg';

const Hero = styled.div`
  width: 100%;
  height: 85vh;
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
      ></Hero>
    </Layout>
  );
};
