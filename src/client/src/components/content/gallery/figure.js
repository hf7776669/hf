/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*/

import React from 'react';
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

class GalleryFigure extends React.Component {
  render() {
    const {imageLink, serialNo, name} = this.props.gallery;

    return (
        <Figure>
          <ItemCover>
            <a href={`https://hentaifox.com/gallery/${serialNo}/`}>
              <Img
                  src={'http://' + imageLink}
                  // src={'https://i.hentaifox.com/002/1139352/thumb.jpg'}
                  alt={name}/>
            </a>
          </ItemCover>
        </Figure>
    );
  }
}

export default GalleryFigure;