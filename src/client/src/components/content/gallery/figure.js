/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*/

import React from 'react';
import {Figure, Img, ItemCover, NextImage, PrevImage} from './figure-styles';
import LazyLoad from 'react-lazyload';

class GalleryFigure extends React.Component {

  state = {
    coverImage: '',
    picLink   : '',
    imageNo   : null
  };

  componentDidMount() {
    const {gallery}     = this.props;
    const {imageLink}   = gallery;
    const imageNo       = 1;
    const [, , picLink] = imageLink.match(/(.com)(\/[\S]+)\//);

    this.setState(() => ({
      picLink, imageNo
    }));
  }

  nextImage = () => {
    const {imageNo} = this.state;
    const {pages}   = this.props.gallery;
    this.setState(() => ({
      imageNo: imageNo % pages + 1
    }));
  };

  prevImage = () => {
    const {imageNo} = this.state;
    const {pages}   = this.props.gallery;

    this.setState(() => ({
      imageNo: (imageNo === 1) ? pages : imageNo - 1
    }));
  };

  render() {
    const {gallery}          = this.props;
    const {_id, name}        = gallery;
    const {imageNo, picLink} = this.state;
    const coverImage         = `https://i.hentaifox.com${picLink}/${imageNo}t.jpg`;

    return (
        <Figure>
          <ItemCover>
            <a href={`https://hentaifox.com/gallery/${_id}/`}>
              <LazyLoad once height={350}>
                <Img src={coverImage}
                    // src={'https://i.hentaifox.com/002/1139352/thumb.jpg'}
                     alt={name}/>
              </LazyLoad>
            </a>
          </ItemCover>
          <PrevImage onClick={() => {this.prevImage();}}></PrevImage>
          <NextImage onClick={() => {this.nextImage();}}></NextImage>
        </Figure>
    );
  }
}

export default GalleryFigure;