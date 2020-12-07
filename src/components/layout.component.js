import { useState } from 'react';
import { Footer } from './ui';
import { Header } from './ui';
import { SideDrawer } from './ui';
import { BackDrop } from './ui';

export const Layout = ({ children }) => {
  const [drawer, setDrawer] = useState({ isVisible: false });

  return (
    <>
      {drawer.isVisible ? <BackDrop toggleDrawer={setDrawer} /> : null}
      <SideDrawer drawer={drawer} />
      <Header toggleDrawer={setDrawer} drawer={drawer} />
      {children}
      <Footer />
    </>
  );
};
