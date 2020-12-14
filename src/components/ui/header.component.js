import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { MdMenu, MdClose } from 'react-icons/md';
import { UserContext } from '../../context';

const navLinks = [
  {
    path: '/',
    name: 'Home',
    isFlagged: true,
    whenNotAuthenticated: true,
  },
  {
    path: '/about',
    name: 'About',
    isFlagged: false,
  },
  {
    path: '/register',
    name: 'Register',
    isFlagged: true,
    whenNotAuthenticated: true,
  },
  {
    path: '/contact',
    name: 'Contact',
    isFlagged: false,
  },
  {
    path: '/logout',
    name: 'Log Out',
    isFlagged: true,
    whenNotAuthenticated: false,
  },
];

const Nav = styled.nav`
  background-color: rgba(0, 0, 0, 0.9);
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
  font-weight: bold;
  color: ${(props) => (props.active ? 'orangered' : 'wheat')};
`;

const MenuBar = styled.div`
  font-size: 25px;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const Header = ({ toggleDrawer, drawer: { isVisible } }) => {
  const history = useHistory();
  const userContext = useContext(UserContext);

  const navList = navLinks.map(
    ({ path, name, isFlagged, whenNotAuthenticated }, idx) => {
      const ListItem = (
        <Link style={{ textDecoration: 'none' }} to={path} key={idx}>
          <Li active={history.location.pathname === path}>{name}</Li>
        </Link>
      );
      const renderItem = isFlagged
        ? whenNotAuthenticated
          ? userContext.user
            ? null
            : ListItem
          : userContext.user
          ? ListItem
          : null
        : ListItem;
      return renderItem;
    }
  );

  return (
    <Nav>
      <H1>Movie Rating App</H1>
      <Ul>{navList}</Ul>
      <MenuBar onClick={() => toggleDrawer({ isVisible: !isVisible })}>
        {isVisible ? <MdClose /> : <MdMenu />}
      </MenuBar>
    </Nav>
  );
};
