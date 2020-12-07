import styled from 'styled-components';

const DrawerDiv = styled.div`
  transition: width 500ms linear;
  min-height: 100vh;
  background-color: wheat;
  z-index: 1000;
  position: fixed;
  top: 0;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  width: ${(props) => (props.visible ? '70%' : '0px')};
`;

export const SideDrawer = ({ drawer: { isVisible } }) => {
  return (
    <DrawerDiv visible={isVisible}>
      <h1>Side drawer</h1>
    </DrawerDiv>
  );
};
