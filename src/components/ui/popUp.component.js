import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { cloneElement } from 'react';

const PopDiv = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: rgba(0, 0, 0, 0.9);
  opacity: 0.9;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.isHidden ? 'none' : 'grid')};
  grid-template-columns: 1fr;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
`;

const ChildrenContainer = styled.div`
  position: relative;
`;

const CloseDiv = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
`;

export const PopUp = ({ width, height, isHidden, closePopUp, children }) => {
  const updateChildrenWithProps = cloneElement(children, {
    closeForm: closePopUp,
  });
  return (
    <PopDiv width={width} height={height} isHidden={isHidden}>
      <ChildrenContainer>
        {updateChildrenWithProps}
        <CloseDiv>
          <MdClose
            color='red'
            size='36px'
            cursor='pointer'
            onClick={closePopUp}
          />
        </CloseDiv>
      </ChildrenContainer>
    </PopDiv>
  );
};
