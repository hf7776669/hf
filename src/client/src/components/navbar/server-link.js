/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*/

import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Li = styled.li`
 &&& {vertical-align: baseline;
  display: inline-block;
  padding: 0 10px;
  background: black;
  line-height: inherit;
  margin:0;
  border-left: 1px solid #333;
  font-size: 12px;
  flex-basis: 0; }
`;

const A = styled.a`
  &&& {display: block;
  //line-height: 50px;
  font-weight: 700;
  color: #ff9f08;
  cursor: pointer;
  text-decoration: none;
  text-shadow: 0 0 5px #c22b50;}
`;

class ServerLink extends Component {
  onClick = () => {
    console.log('hi');
    axios
        .get('/api/update')
        .then(() => {
          console.log('updated gallerieis');
        });
  };


  render() {
    const {children} = this.props;
    return (
        <Li>
          <A onClick={this.onClick}> {children} </A>
        </Li>
    );
  }
}

export default ServerLink;