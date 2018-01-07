import React, {Component} from 'react';
import styled from 'styled-components';
import Figure from './figure';
import Caption from './caption';
import Details from './details';

const Wrapper = styled.div`
  text-align: left;
  width:18%;
  min-width: 200px;
  margin: 15px 7px;
  padding: 0;
  position: relative;
  vertical-align: top;
  display: inline-block;
`;

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
    console.log(`this.refs`, this.refs.targetDiv);
    const node = this.refs.targetDiv;
    var specs  = node.getBoundingClientRect();
    console.log('specs: ', specs);
    console.log('window: ', window.innerWidth + 'x' + window.innerHeight);
  }

  render() {
    const {gallery} = this.props;
    return (
        <div ref='targetDiv'>
          <Wrapper
              onMouseEnter={this.showDetails}
              onMouseLeave={this.hideDetails}>
            <div>

              <Figure gallery={gallery}/>
              <Caption gallery={gallery}/>
            </div>
            {this.state.isHovering && <Details gallery={gallery}/>}
          </Wrapper></div>
    );
  }
}

export default Gallery;