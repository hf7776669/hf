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

const Nav = styled.div`
  width: 15%;
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 10;
  background-color: orange;
  opacity: 0;
  &:hover {
    opacity: 0.5;
  }
`;

const PrevImage = Nav.extend`
  left:0;
`;

const NextImage = Nav.extend`
  right:0;
`;

export {Figure, Img, ItemCover, PrevImage, NextImage};