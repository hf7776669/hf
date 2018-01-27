/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*   - decoded HTML special chars in Cheerio o/p using he.js 
*/

import axios from 'axios';
import React from 'react';
import he from 'he';
import {A, Button, DivIgnore} from '../caption-styles';

class GalleryCaption extends React.Component {
  ignoreGallery(serialNo) {
    return axios.post(`/api/galleries/${serialNo}`, {ignore: true})
        .then(({data}) => {
          const {msg} = data;
          if (msg === 'Update successful') {
            console.log(`Gallery ${serialNo} Ignored`);
          } else {console.log(`Gallery ${serialNo} could not be ignored`);}
        });
  }

  render() {
    const {gallery}  = this.props;
    const {serialNo} = gallery;
    
    return (
        <div className="caption">
          <h6>
            <A href={gallery.link}>
              {he.decode(gallery.name)}
            </A>
          </h6>
          <div>
            <div>
              <span style={{float: 'left'}}>
                {gallery.pages} Pages
              </span>
              <span style={{float: 'right'}}>
                {gallery.author}
              </span>
            </div>
            <DivIgnore>
              <Button
                  onClick={() => this.ignoreGallery(serialNo)}>Ignore</Button>
            </DivIgnore></div>
        </div>
    );
  }
}

export default GalleryCaption;