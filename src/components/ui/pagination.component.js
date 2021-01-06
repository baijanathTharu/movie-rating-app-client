import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  height: 50px;
`;

const DivItems = styled.div`
  background-color: ${(props) => (props.isActive ? 'orangered' : 'tomato')};
  color: black;
  padding: 15px;
  font-size: 16px;
  :hover {
    background-color: ${(props) => (props.isActive ? 'orangered' : 'black')};
    color: ${(props) => (props.isActive ? 'black' : 'wheat')};
    cursor: ${(props) => (props.isActive ? 'not-allowed' : 'pointer')};
  }
`;

export const Pagination = ({ currentPage, totalPage, fetchPage }) => {
  const pagesArr = [];
  for (let i = 1; i <= totalPage; i++) {
    pagesArr[i] = { isActive: false, number: i };
    if (+currentPage === i) {
      pagesArr[i].isActive = true;
    }
  }
  const pageList = pagesArr.map((pageNo, idx) => (
    <DivItems
      key={idx}
      isActive={pageNo.isActive}
      onClick={pageNo.isActive ? null : () => fetchPage(pageNo.number)}
    >
      {pageNo.number}
    </DivItems>
  ));
  return <Div>{pageList}</Div>;
};
