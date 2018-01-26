import styled from 'styled-components';

const DivStatus = styled.div`
  &&& {position: absolute;
  bottom:54px;
  right: 0;
  z-index: 100;}
`;

const StatusSpan = styled.span`
  &&& {padding:4px;
  background: red;
  border-radius: 2px;
  font-weight: bold;
  text-align: center;
  min-width: 38px;
  font-size: 12px;
  color: white;}
`;

const A = styled.a`
  &&& {text-decoration: none;
  color: white;
  &:hover {
    color: palevioletred;
  }}
`;

export {StatusSpan, A, DivStatus};