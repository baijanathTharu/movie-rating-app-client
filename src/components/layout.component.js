import { useState } from 'react';
import styled from 'styled-components';
import { Footer } from './ui';
import { Header } from './ui';
import { SideDrawer } from './ui';
import { BackDrop } from './ui';

const ChildrenDiv = styled.div`
  min-height: 86vh;
`;

export const Layout = ({ children }) => {
  const [drawer, setDrawer] = useState({ isVisible: false });

  const toggleDrawer = (drawerState) => {
    setDrawer(drawerState);
  };

  return (
    <>
      {drawer.isVisible ? <BackDrop toggleDrawer={toggleDrawer} /> : null}
      <SideDrawer drawer={drawer} />
      <Header toggleDrawer={setDrawer} drawer={drawer} />
      <ChildrenDiv>{children}</ChildrenDiv>
      <Footer />
    </>
  );
};
