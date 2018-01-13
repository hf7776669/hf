import React from 'react';
import styled from 'styled-components';
import he from 'he';

const DivStatus = styled.div`
  position: absolute;
  bottom:54px;
  right: 0;
  z-index: 100;
`;

const StatusSpan = styled.span`
  padding:4px;
  background: red;
  border-radius: 2px;
  font-weight: bold;
  text-align: center;
  min-width: 38px;
  font-size: 12px;
  color: white;
`;

const A = styled.a`
  text-decoration: none;
  color: white;
  &:hover {
    color: palevioletred;
  }
`;

class GalleryCaption extends React.Component {
  render() {
    const {gallery} = this.props;
    return (
        <div className="caption">
          <h3>
            <A href={gallery.link}>
              {he.decode(gallery.name)}
            </A>
          </h3>
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