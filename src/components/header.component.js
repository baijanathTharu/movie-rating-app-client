import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { MdMenu } from 'react-icons/md';

const navLinks = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/about',
    name: 'About',
  },
  {
    path: '/services',
    name: 'Services',
  },
  {
    path: '/contact',
    name: 'Contact',
  },
];

const Nav = styled.nav`
  background-color: orangered;
  color: wheat;
  min-height: 7vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const H1 = styled.h1`
  font-weight: bold;
  font-size: 20px;
  color: wheat;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style-type: none;
  @media (max-width: 767px) {
    display: none;
  }
`;

const Li = styled.li`
  padding: 0 10px;
  font-size: 18px;
  color: ${(props) => (props.active ? 'black' : 'wheat')};
`;

const MenuBar = styled.div`
  font-size: 25px;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const Header = (props) => {
  const history = useHistory();

  const navList = navLinks.map(({ path, name }, idx) => {
    return (
      <Link style={{ textDecoration: 'none' }} to={path} key={idx}>
        <Li active={history.location.pathname === path}>{name}</Li>
      </Link>
    );
  });

  console.log('history: ', history);
  return (
    <Nav>
      <H1>Movie Rating App</H1>
      <Ul>{navList}</Ul>
      <MenuBar>
        <MdMenu />
      </MenuBar>
    </Nav>
  );
};
