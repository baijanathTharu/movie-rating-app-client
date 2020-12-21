import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;
  height: 50px;
`;

const DivItems = styled.div`
  background-color: ${(props) => (props.isActive ? 'red' : 'white')};
  color: black;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
`;

export const Pagination = ({ currentPage, totalPage, fetchPage }) => {
  const pagesArr = [];
  for (let i = 1; i <= totalPage; i++) {
    pagesArr[i] = { isActive: false, number: i };
    if (currentPage === i) {
      pagesArr[i].isActive = true;
    }
  }
  const pageList = pagesArr.map((pageNo, idx) => (
    <DivItems
      key={idx}
      isActive={pageNo.isActive}
      onClick={() => fetchPage(pageNo.number)}
    >
      {pageNo.number}
    </DivItems>
  ));
  return <Div>{pageList}</Div>;
};
