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
  border-top: 10px solid black;
  border-left: 10px solid wheat;
  border-right: 10px solid wheat;
  border-bottom: 10px solid black;
  animation: ${Rotate} 1s infinite;
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
