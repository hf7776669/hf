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
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.state       = {
      isHovering : false,
      showDetails: false,
      window     : {
        width : null,
        height: null
      }
    };
  }

  showDetails() {
    this.getPosition();
    this.setState(() => ({isHovering: true}));
  }

  hideDetails() {
    this.setState(() => ({isHovering: false}));
  }

  getPosition() {
    const node = this.refs.targetDiv;
    var specs  = node.getBoundingClientRect();

    this.setState(() => ({
      window: {
        width : window.innerWidth,
        height: window.innerHeight
      },
      xPos  : Math.floor(specs.x)
    }));
  }

  render() {
    const {gallery, getArtistGalleries,getGroupGalleries, filterGalleries} = this.props;

    const {window, xPos} = this.state;

    const detailsPosition = (window.width - xPos - 240 - 280) > 0
        ? 'right'
        : 'left';

    return (
        <Wrapper>
          <div ref='targetDiv' onMouseEnter={this.showDetails}
               onMouseLeave={this.hideDetails}>
            <Figure gallery={gallery}/>
            {this.state.isHovering &&
            <Details gallery={gallery}
                     getArtistGalleries={getArtistGalleries}
                     getGroupGalleries={getGroupGalleries}
                     filterGalleries={filterGalleries}
                     position={detailsPosition}
            />}
          </div>
          <Caption gallery={gallery}/>
        </Wrapper>
    );
  }
}

export default Gallery;