/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*/

import React from 'react';
import styled from 'styled-components';
import FaSearch from 'react-icons/lib/fa/search';

const Wrapper = styled.div`
  &&& {float: left;
  padding: 9px 0 0 10px;
  position: relative;
  vertical-align: baseline;}
`;

const TextInput = styled.input`
  &&& {background: #fff;
  color: #6d6d6d;
  font-size: 15px;
  line-height: 20px;
  padding: .35em .3em;
  width: 12em;
  border: none;
  outline: 0;
  border-radius: 0}
`;

const ButtonInput = styled.button`
  &&& {box-shadow: 1px 1px 1px rgba(0,0,0,.1) inset;
  font-size: 19px;
  height: 31px;
  cursor: pointer;
  outline: 0}
`;

const Form = () => {
  return (

      <Wrapper>
        <form action="search">
          <div style={{float: 'left'}}>
            <TextInput type="text" name='q' value placeholder='Search...'/>
          </div>
          <div style={{float: 'left'}}>
            <ButtonInput type="submit" className='fa' value>
              <FaSearch/>
            </ButtonInput>
          </div>
          <div className="clear"></div>
        </form>
      </Wrapper>
  );
};

export default Form;