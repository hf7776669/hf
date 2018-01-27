import styled from 'styled-components';

const DivIgnore = styled.div`
  &&& {position: absolute;
  
  right: 0;
  z-index: 100;}
`;

const Button = styled.span`
  &&& {padding:4px;
  background: red;
  border-radius: 2px;
  font-weight: bold;
  text-align: center;
  min-width: 38px;
  font-size: 12px;
  color: white;}
  cursor: pointer;
`;

const A = styled.a`
  &&& {text-decoration: none;
  color: white;
  &:hover {
    color: palevioletred;
  }}
`;

export {Button, A, DivIgnore};