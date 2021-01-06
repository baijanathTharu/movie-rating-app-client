import styled, { keyframes } from 'styled-components';

const Rotate = keyframes`
  0% {
    transform: rotate(90deg)
  }
  25% {
    transform: rotate(180deg)
  }
  75% {
    transform: rotate(270deg)
  }
  100% {
    transform: rotate(360deg)
  }

`;

const LoaderDiv = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 50%;
  border-top: 5px solid tomato;
  border-left: 5px solid tomato;
  border-right: 5px solid tomato;
  border-bottom: 5px solid black;
  animation: ${Rotate} 0.7s infinite;
  display: ${(props) => (props.isHidden ? 'none' : 'inline-block')};
  position: ${(props) => props.position};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  transform: translate(-50%, -50%);
  z-index: 100;
`;

export const Loader = ({ isHidden, width, height, position, top, left }) => {
  const Load = (
    <LoaderDiv
      width={width}
      height={height}
      position={position}
      top={top}
      left={left}
      isHidden={isHidden}
    ></LoaderDiv>
  );
  return isHidden ? null : Load;
};
