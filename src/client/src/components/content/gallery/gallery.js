/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*/

import React, {Component} from 'react';
import Figure from './figure';
import Caption from './caption';
import Details from './details';

import {Wrapper} from './gallery-styles';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.showDetails    = this.showDetails.bind(this);
    this.hideDetails    = this.hideDetails.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.state          = {
      isHovering : false,
      showDetails: false
    };
  }

  showDetails() {
    this.getCoordinates();
    this.setState(() => ({isHovering: true}));
  }

  hideDetails() {
    this.setState(() => ({isHovering: false}));
  }

  getCoordinates() {
//    console.log(`this.refs`, this.refs.targetDiv);
//    const node = this.refs.targetDiv;
//    var specs  = node.getBoundingClientRect();
//    console.log('specs: ', specs);
//    console.log('window: ', window.innerWidth + 'x' + window.innerHeight);
  }

  render() {
    const {gallery, getArtistGalleries, filterGalleries} = this.props;

    return (
        <Wrapper>
          <div ref='targetDiv' onMouseEnter={this.showDetails}
               onMouseLeave={this.hideDetails}>
            <Figure gallery={gallery}/>
            {this.state.isHovering &&
            <Details gallery={gallery}
                     getArtistGalleries={getArtistGalleries}
                     filterGalleries={filterGalleries}
            />}
          </div>
          <Caption gallery={gallery}/>
        </Wrapper>
    );
  }
}

export default Gallery;