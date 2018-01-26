import styled from 'styled-components';

const ContentBody = styled.div`
 &&& {padding: 5px;
  position: relative;
  margin: 50px 0;
  display: flex;
  flex-wrap: wrap;
  //flex-grow: 1;
  justify-content: space-between;}
`;

const Search = styled.div`
  &&& {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    position: fixed;
    top: 0;
    background: black;
    width: 100%;
    z-index: 999;
  }
`;

export {ContentBody, Search};