/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*/

import React, {Component} from 'react';
import styled from 'styled-components';

const Li = styled.li`
&&& {
  vertical-align: baseline;
  display: inline-block;
  padding: 0 10px;
  background: black;
  line-height: inherit;
  margin:0;
  border-left: 1px solid #333;
  font-size: 12px;
  flex-basis: 0;}
`;

const A = styled.a`
  &&& {font-weight: 700;
  color: #ff9f08;
  text-decoration: none;
  text-shadow: 0 0 5px #c22b50;}
`;

const NavbarLink = ({linkTo, name}) => {
  return (
      <Li>
        <A href={linkTo}>{name}
        </A>
      </Li>
  ); 
};

export default NavbarLink;