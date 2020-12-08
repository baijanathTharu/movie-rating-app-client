import styled from 'styled-components';
import { MdCopyright } from 'react-icons/md';

const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 7vh;
  background-color: black;
`;

const P = styled.p`
  font-size: 18px;
  color: wheat;
`;

export const Footer = () => {
  return (
    <FooterDiv>
      <P>
        Copyright <MdCopyright /> {new Date().getFullYear()} Baijanath Tharu
      </P>
    </FooterDiv>
  );
};
