import { useState } from 'react';
import { Footer } from '../components';
import { Header } from '../components';
import { SideDrawer } from '../components';
import { BackDrop } from '../components';

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
