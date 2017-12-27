import React from 'react';
import styled from 'styled-components';
import SignIn from 'react-icons/lib/fa/sign-in';

const DivRight = styled.div`   
  align-self: flex-end;
  display: flex;
  align-items: center;
`;

const A = styled.a` 
  color: black;
  text-shadow: none;
  cursor: pointer;
  text-decoration: none;
  vertical-align: baseline;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;

const Login = () => {
  return (
      <DivRight>
        <A href="/login/">
          <SignIn/> Login
        </A>
      </DivRight>
  );
};

export default Login;