/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*   - Fixed Filter input box 
*/

import React from 'react';
import styled from 'styled-components';
import Gallery from './gallery/gallery';
import axios from 'axios';
import Pagination from '../pagination';

const ContentBody = styled.div`
 &&& {padding: 5px;
  position: relative;
  margin: 50px 0;
  display: flex;
  flex-wrap: wrap;
  //flex-grow: 1;
  justify-content: space-between;}
`;

const Search = styled.div`
  &&& {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    position: fixed;
    top: 0;
    background: black;
    width: 100%;
    z-index: 100;
  }
`;

const sortGalleries = galleries =>
    galleries.sort((a, b) => (a.serialNo < b.serialNo) ? 1 : -1);

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.getArtistGalleries = this.getArtistGalleries.bind(this);
    this.filterGalleries    = this.filterGalleries.bind(this);
    this.getPage            = this.getPage.bind(this);
    this.state              = {page: 1};
  }

  componentWillMount() {
    return axios.get('/api/gallery')
        .then(({data}) =>
            this.setState(() => ({galleries: sortGalleries(data)})))
        .catch(err => console.log('err: ', err));
  }

  getArtistGalleries(name) {
    return axios
        .get(`/api/artist/${name}`)
        .then(axiosResult => {
          console.log('results: ', axiosResult);
          this.setState(() => ({galleries: sortGalleries(axiosResult.data)}));
        });
  }

  filterGalleries(event) {
    const {value} = event.target;
    this.setState(() => ({nameFilter: value}));
  }

  getPage(page) {
    return axios.get(`/api/gallery/${page}`)
        .then(axiosResult => {
          this.setState(() => ({
            galleries: sortGalleries(axiosResult.data),
            page     : page
          }));
        });
  }


  render() {
    const {galleries, nameFilter, page} = this.state;
    console.log(`this.state.galleries:- `, galleries);
    return (
        <div>
          <Search>
            <input onChange={(e) => this.filterGalleries(e)}
                   style={{width: '35%', height: '40px'}}/>
          </Search>
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
          <Pagination activePage={page} fetchPage={this.getPage}/>
        </div>
    );
  }
}

export default Content;