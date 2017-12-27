import React, {Component} from 'react';
import styled from 'styled-components';
import Gallery from './gallery/gallery';
import axios from 'axios';

const Wrapper = styled.div`
  padding: 5px;
  position:relative;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: space-between;
`;

class Content extends React.Component {
  componentWillMount() {
    axios.get('/api/gallery')
        .then(results => console.log(`results: `, results) ||
            this.setState(() => ({galleries: results.data})))
        .catch(err => console.log('err: ', err));
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {galleries} = this.state;
    console.log(`this.state.galleries:- `, galleries);
    return (
        <Wrapper>
          {galleries ? galleries.map(
              gallery => <Gallery key={gallery} gallery={gallery}></Gallery>
          ) : 'Loading'
          }

        </Wrapper>
    );
  };
}

export default Content;