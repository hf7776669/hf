/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*/

import React from 'react';
import {Figure, Img, ItemCover} from './figure-styles';

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