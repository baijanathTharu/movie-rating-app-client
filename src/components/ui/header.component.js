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
    path: '/movies',
    name: 'Movies',
  },
];

const Nav = styled.nav`
  background-color: ${(props) =>
    props.top ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.5)'};
  color: wheat;
  min-height: 7vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transform: ${(props) =>
    props.visible ? 'translateY(0)' : 'translateY(-7vh)'};
  transition: transform 0.3s ease-in-out;
  position: ${(props) => (props.visible && props.top ? null : 'fixed')};
  width: 100%;
  z-index: 100;
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

export const Header = ({
  visible,
  top,
  toggleDrawer,
  drawer: { isVisible },
}) => {
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
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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
    <Nav visible={visible} top={top}>
      <H1>Movie Rating App</H1>
      <Ul>
        {navListWhenNotLoggedIn}
        {navList}
        {navListWhenLoggedIn}
        {DashboardLink}
      </Ul>
      {LogOutBtn}
      <MenuBar onClick={() => toggleDrawer({ isVisible: !isVisible })}>
        {isVisible ? <MdClose /> : <MdMenu />}
      </MenuBar>
    </Nav>
  );
};
