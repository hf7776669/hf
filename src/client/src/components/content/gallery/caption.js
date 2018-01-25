/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*   - decoded HTML special chars in Cheerio o/p using he.js 
*/

import React from 'react';
import he from 'he';
import {A, DivStatus, StatusSpan} from '../caption-styles';

class GalleryCaption extends React.Component {
  render() {
    const {gallery} = this.props;
    return (
        <div className="caption">
          <h6>
            <A href={gallery.link}>
              {he.decode(gallery.name)}
            </A>
          </h6>
          <div>
            <span style={{float: 'left'}}>
              {gallery.pages} Pages
            </span>
            <span style={{float: 'right'}}>
              {gallery.author}
            </span>
          </div>
          <DivStatus>
            <StatusSpan>hot</StatusSpan>
          </DivStatus>
        </div>
    );
  }
}

export default GalleryCaption;