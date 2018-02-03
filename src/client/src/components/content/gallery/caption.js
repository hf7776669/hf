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
  ignoreGallery(_id) {
    return axios.post(`/api/galleries/${_id}`, {ignore: true})
        .then(({data}) => {
          const {msg} = data;
          if (msg === 'Update successful') {
            console.log(`Gallery ${_id} Ignored`);
          } else {console.log(`Gallery ${_id} could not be ignored`);}
        });
  }

  render() {
    const {_id, link, name, pages, author} = this.props.gallery;

    return (
        <div className="caption">
          <h6><A href={link}>{he.decode(name)}</A></h6>
          <div>
            <div>
              <span style={{float: 'left'}}>{pages} Pages</span>
              <span style={{float: 'right'}}>{author}</span>
            </div>
            <DivIgnore>
              <Button onClick={() => this.ignoreGallery(_id)}>
                Ignore
              </Button>
            </DivIgnore></div>
        </div>
    );
  }
}

export default GalleryCaption;