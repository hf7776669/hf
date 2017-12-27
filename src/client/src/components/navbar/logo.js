import React from 'react';
import styled from 'styled-components';
import logo from '../../logo.svg';

const Img = styled.div`
  min-width: 68px;
  min-height: 50px;
  background: url(${logo}) no-repeat;
`;

const A = styled.a`
  display: flex;
  align-items: center;
`;

export default () => <A href="/">
  <Img/>
</A>;