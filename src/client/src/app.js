import React from 'react';
import styled from 'styled-components';
import Content from './components/content/content';

const Wrapper = styled.div`
  &&& {font-family: Verdana,Geneva,sans-serif;
  background: #1E1E1E;
  color: #d2d2d2;
  font-size: 12px}
`;

const Break = styled.div`
  height:30px;
`;

const App = () => (
    <Wrapper>
      {/*<Navbar/>*/}
      <Content/>
    </Wrapper>
);

export default App;