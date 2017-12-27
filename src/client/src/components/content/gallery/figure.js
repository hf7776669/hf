import React from 'react';
import styled from 'styled-components';

const Figure = styled.figure`
    margin: 0;
    position: relative;
    display: block;
`;

const Img = styled.img`
  max-width: 100%;
  display: inline-block;
  position: relative;
  z-index: 10;
`;

const ItemCover = styled.div`
  //height: 288px;
  //overflow: hidden;
  box-shadow: 1px 3px 5px #131212;
  background: #1a1515;
  border-radius: 7px;
`;

class GalleryFigure extends React.Component {
  render() {
    const {link, imageLink} = this.props.gallery;

    return (
        <Figure>
          <ItemCover>
            <a href={link}>
              <Img
                  //                  src={'http://' + imageLink}
                  src={'https://i.hentaifox.com/002/1139352/thumb.jpg'}
                  alt={this.props.gallery.name}/>
            </a>
          </ItemCover>
        </Figure>
    );
  }
}

export default GalleryFigure;