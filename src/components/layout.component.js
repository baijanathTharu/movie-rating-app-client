import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from './ui';
import { Header } from './ui';
import { SideDrawer } from './ui';
import { BackDrop } from './ui';

const ChildrenDiv = styled.div`
  min-height: 93vh;
  background-color: wheat;
`;

export const Layout = ({ children }) => {
  const [drawer, setDrawer] = useState({ isVisible: false });

  const [header, setHeader] = useState({
    isVisible: true,
    prevScrollPos: window.pageYOffset,
    atTop: true,
  });

  const toggleDrawer = (drawerState) => {
    setDrawer(drawerState);
  };

  useEffect(() => {
    const scrollHandler = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = currentScrollPos > header.prevScrollPos;
      if (currentScrollPos < 200) {
        return setHeader({
          isVisible: true,
          prevScrollPos: currentScrollPos,
          atTop: true,
        });
      }
      setHeader({
        isVisible: visible,
        prevScrollPos: currentScrollPos,
        atTop: false,
      });
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  });

  return (
    <>
      {drawer.isVisible ? <BackDrop toggleDrawer={toggleDrawer} /> : null}
      <SideDrawer drawer={drawer} />
      <Header
        visible={header.isVisible}
        top={header.atTop}
        toggleDrawer={setDrawer}
        drawer={drawer}
      />
      <ChildrenDiv>{children}</ChildrenDiv>
      <Footer />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
