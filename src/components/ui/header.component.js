import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { MdMenu, MdClose } from 'react-icons/md';
import { UserContext } from '../../context';

const navLinksWhenNotLoggedIn = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/register',
    name: 'Register',
  },
];

const navLinksWhenLoggedIn = [
  {
    path: '/someRoute',
    name: 'SomeRoute',
  },
];

const navLinks = [
  {
    path: '/about',
    name: 'About',
  },

  {
    path: '/contact',
    name: 'Contact',
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

const Button = styled.button`
  background-color: black;
  color: wheat;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  border: 0;
  cursor: pointer;
`;

export const Header = ({ toggleDrawer, drawer: { isVisible } }) => {
  const history = useHistory();
  const userContext = useContext(UserContext);

  const generateListItem = (path, name, idx) => (
    <Link style={{ textDecoration: 'none' }} to={path} key={idx}>
      <Li active={history.location.pathname === path}>{name}</Li>
    </Link>
  );

  const navList = navLinks.map(({ path, name }, idx) =>
    generateListItem(path, name, idx)
  );

  const navListWhenNotLoggedIn = navLinksWhenNotLoggedIn.map(
    ({ path, name }, idx) =>
      userContext.userState.username ? null : generateListItem(path, name, idx)
  );
  const navListWhenLoggedIn = navLinksWhenLoggedIn.map(({ path, name }, idx) =>
    userContext.userState.username ? generateListItem(path, name, idx) : null
  );

  const logOutHandler = () => {
    userContext.setUserState({});
    history.push('/');
  };

  const LogOutBtn = userContext.userState.username ? (
    <Button onClick={logOutHandler}>LogOut</Button>
  ) : null;

  const DashboardLink =
    userContext.userState.username && userContext.userState.role === 0 ? (
      <Link style={{ textDecoration: 'none' }} to='/dashboard'>
        <Li>Dashboard</Li>
      </Link>
    ) : null;

  return (
    <Nav>
      <H1>Movie Rating App</H1>
      <Ul>
        {navList}
        {navListWhenLoggedIn}
        {navListWhenNotLoggedIn}
        {DashboardLink}
      </Ul>
      {LogOutBtn}
      <MenuBar onClick={() => toggleDrawer({ isVisible: !isVisible })}>
        {isVisible ? <MdClose /> : <MdMenu />}
      </MenuBar>
    </Nav>
  );
};
