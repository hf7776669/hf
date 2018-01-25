import styled from 'styled-components';

const Figure = styled.figure`
   &&& { margin: 0;
    position: relative;
    display: block;}
`;

const Img = styled.img`
 &&&{ max-width: 100%;
  display: inline-block;
  position: relative;
  z-index: 10;}
`;

const ItemCover = styled.div`
  &&&{box-shadow: 1px 3px 5px #131212;
  background: #1a1515;
  border-radius: 7px;}
`;

export {Figure, Img, ItemCover};