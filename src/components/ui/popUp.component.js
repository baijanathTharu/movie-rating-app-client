import styled from 'styled-components';

const PopDiv = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: rgba(0, 0, 0, 0.9);
  opacity: 0.9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.isHidden ? 'none' : 'block')};
  z-index: 1000;
  overflow-y: auto;
`;

export const PopUp = ({ width, height, isHidden, children }) => {
  return (
    <PopDiv width={width} height={height} isHidden={isHidden}>
      {children}
    </PopDiv>
  );
};
