import React, {Component} from 'react';
import styled from 'styled-components';
import NavbarLink from './navbar-link';
import ServerLink from './server-link';
import Search from './search';
import Login from './login';
import Wrapper from './wrapper';
import Logo from './logo';

const Ul = styled.div`
  margin: 0;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  background: black;
  align-items: center;
`;

const NavbarParent = () => {
  return (
      <Wrapper>
        <Logo/>
        <Navigation>
          <Ul>
            <NavbarLink name='Artists' linkTo='/videos'/>
            <NavbarLink name='Groups' linkTo='/random'/>
            <ServerLink> Update </ServerLink>
            <NavbarLink name='Tags' linkTo='/tags'/>
            <NavbarLink name='Series' linkTo='/characters'/>
            <NavbarLink name='Search' linkTo='/haremhentai'/>
          </Ul>
        </Navigation>
        <Search/>
        <Login/>
      </Wrapper>
  );
};

export default NavbarParent;