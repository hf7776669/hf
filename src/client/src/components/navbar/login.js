import React from 'react';
import styled from 'styled-components';
import SignIn from 'react-icons/lib/fa/sign-in';

const DivRight = styled.div`   
  align-self: stretch;
  display: flex;
  align-items: center;
`;

const A = styled.a` 
  color: white;
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