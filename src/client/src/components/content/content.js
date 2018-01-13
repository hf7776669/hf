import React, {Component} from 'react';
import styled from 'styled-components';
import Gallery from './gallery/gallery';
import axios from 'axios';

const ContentBody = styled.div`
  padding: 5px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  //flex-grow: 1;
  justify-content: space-between;
`;

const sortGalleries = galleries =>
    galleries.sort((a, b) => (a.serialNo < b.serialNo) ? 1 : -1);

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.getArtistGalleries = this.getArtistGalleries.bind(this);
    this.filterGalleries    = this.filterGalleries.bind(this);
    this.state              = {};
  }

  componentWillMount() {

    return axios.get('/api/gallery')
        .then(({data}) =>
            this.setState(() => ({galleries: sortGalleries(data)})))
        .catch(err => console.log('err: ', err));
  }

  getArtistGalleries(name) {
    return axios.get(`/api/artist/${name}`)
        .then(axiosResult => {
          console.log('results: ', axiosResult);
          this.setState(() => ({galleries: sortGalleries(axiosResult.data)}));
        });
  }

  filterGalleries(event) {
    const {value} = event.target;
    this.setState(() => ({nameFilter: value}));
  }

  render() {
    const {galleries, nameFilter} = this.state;
    console.log(`this.state.galleries:- `, galleries);
    return (
        <div>
          <input onChange={(e) => this.filterGalleries(e)}/>

          <ContentBody>
            {galleries ? galleries.filter(
                (gallery) => {
                  if (!nameFilter) {return 1;}
                  return gallery.name.toLowerCase()
                      .includes(nameFilter.toLowerCase());
                })
                .map(
                    gallery => <Gallery key={gallery.serialNo}
                                        gallery={gallery}
                                        getArtistGalleries={this.getArtistGalleries}>

                    </Gallery>
                ) : 'Loading'
            }
          </ContentBody>
        </div> 
    );
  }
}

export default Content;