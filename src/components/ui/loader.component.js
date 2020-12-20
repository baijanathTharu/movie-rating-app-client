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
`;

export const Loader = ({ isHidden, width, height }) => {
  const Load = (
    <LoaderDiv width={width} height={height} isHidden={isHidden}></LoaderDiv>
  );
  return isHidden ? null : Load;
};
