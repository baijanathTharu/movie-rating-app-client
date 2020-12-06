import styled from 'styled-components';

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 500;
  background-color: black;
  opacity: 0.8;
`;

export const BackDrop = ({ toggleDrawer }) => {
  return <Div onClick={() => toggleDrawer({ isVisible: false })}></Div>;
};
