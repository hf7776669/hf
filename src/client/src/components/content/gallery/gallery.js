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
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    this.state       = {
      isHovering : false,
      showDetails: false
    };
  }

  showDetails() {
    this.setState(() => ({isHovering: true}));
  }

  hideDetails() {
    this.setState(() => ({isHovering: false}));
  }

  render() {
    const {gallery} = this.props;
    return (
        <Wrapper
            onMouseEnter={this.showDetails}
            onMouseLeave={this.hideDetails}>
          <div>

            <Figure gallery={gallery}/>
            <Caption gallery={gallery}/>
          </div>
          {this.state.isHovering && <Details gallery={gallery}/>}
        </Wrapper>
    );
  }
}

export default Gallery;