import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 500;
  background-color: black;
  opacity: 0.8;
  display: ${(props) => (props.isHidden ? 'none' : 'block')};
`;

export const BackDrop = ({ toggleDrawer }) => {
  return <Div onClick={() => toggleDrawer({ isVisible: false })}></Div>;
};

export const MovieBackDrop = ({ togglePopUp, isHidden }) => {
  return <Div onClick={togglePopUp} isHidden={isHidden}></Div>;
};
