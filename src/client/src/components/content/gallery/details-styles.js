import styled from 'styled-components';

const Container = styled.div` 
  z-index: 200;
  color: #a8a7a7;
  font-size: 2em;
  top:0;
  position: absolute;
  background: rgb(52,52,52);
  width: 280px;
`;

const ContainerRight = Container.extend`
  left:100%;
`;

const ContainerLeft = Container.extend`
  right: 100%;
`;

const hoverColor = `&:hover {color: #c3c1c7;}`;

const LiItem = styled.li`
  color: #c19bb0;
  font-size:14px;
  font-family: Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: bold;
  list-style-position: inside;
  ${hoverColor}
`;

const Name = styled.h4`
  font-size: 18px;
  ${hoverColor};
  cursor: pointer ;
  
  > a {
    color: #c3c1c7;
    text-decoration: none;
    &:hover {
      color: #ff97a3;
    }
  }
`;

const P = styled.p`
  color: palevioletred;
  font-size: 14px; 
  font-style: italic;
`;

const Ul = styled.ul`
  display: flex;
  list-style: square;
  justify-content: space-between;
  font-size: 14px;
  flex-wrap: wrap;
  padding: 0 0px 0 0px;
  margin: 0 5px;
`;

const Artists = Ul.extend`
  cursor: pointer;
`;

const Item = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

const Button = styled.button`
  background: orangered;
  color: whitesmoke;
  font-weight: 400;
  line-height: 2.5em;
  padding: 3px 15px;
  margin: 0 15px;
  border-radius: 8px;
  text-align: center;
  align-items: center;
  float: right; 
  font-size: medium;
`;

const Li = styled.li`
  margin: 0 0 0 10px;
  list-style-position: inside;
  cursor: pointer;
  font-size: 14px;
`;

const LiGood = Li.extend`
  color: green;
  font-weight: bold;
  font-style: italic;
`;

const LiBad = Li.extend`
  color: red; 
`; 

export {
  ContainerLeft, ContainerRight, LiItem, Name, P, Ul,
  Artists, Item, Button, Li, LiGood, LiBad
};