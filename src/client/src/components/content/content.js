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

const sortGalleries = (
    galleries, sortParameter = 'serialNo', sortDirection = 'desc') => {
  let comparator;
  switch (sortDirection) {
    case 'asc':
      comparator = -1;
      break;
    case 'desc':
      comparator = 1;
      break;
    case 'default':
      return new Error('Incorrect Sort Parameter');
  }
  return galleries.sort(
      (a, b) => {
        let item1, item2;
        if (typeof a[sortParameter] === 'string') {
          item1 = a[sortParameter].toLowerCase();
          item2 = b[sortParameter].toLowerCase();
        }
        else {
          item1 = a[sortParameter];
          item2 = b[sortParameter];
        }
        return (item1 < item2) ? comparator : -1 * comparator;
      }
  );
};

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.getArtistGalleries = this.getArtistGalleries.bind(this);
    this.filterGalleries    = this.filterGalleries.bind(this);
    this.filterCleanArtists = this.filterCleanArtists.bind(this);
    this.getPage            = this.getPage.bind(this);
    this.state              = {page: 1, hideCleanArtist: false};
  }

  componentWillMount() {
    return axios.get('/api/galleries')
        .then(({data}) =>
            this.setState(() => ({galleries: sortGalleries(data)})))
        .catch(err => console.log('err: ', err));
  }

  getArtistGalleries(artistName) {
    return axios
        .get(`/api/artists/${artistName}`)
        .then((axiosResult) => {
          const {data} = axiosResult;
          console.log(axiosResult);
          this.setState(() => ({
            galleries : data.length ? sortGalleries(data) : [],
            artistView: true,
            artistName
          }));
        });
  }

  sortGalleries(parameter, sortDirection = 1) {
    const sortedGalleries = sortGalleries(this.state.galleries, parameter,
        sortDirection);
    this.setState({
      galleries: sortedGalleries
    });
  }

  ignoreArtist(name) {
    return axios.post(`/api/artists/${name}`, {ignore: true})
        .then(() => {
          console.log(`Ignored artist: ${name}`);
        });
  }

  filterGalleries(event) {
    const {value} = event.target;
    this.setState(() => ({strFilter: value}));
  }

  getPage(page) {
    const {hideCleanArtist} = this.state;

    return axios.get(
        `/api/galleries?page=${page}${hideCleanArtist ? '&cleaned=hide' : ''}`)
        .then(axiosResult => {
          this.setState(() => ({
            galleries : sortGalleries(axiosResult.data),
            page      : page,
            artistView: false
          }));
        });
  }

  artistClean(name) {
    return axios.post(`/api/artists/${name}`,
        {cleaned: true, cleanedBefore: true})
        .then(() => {
          console.log(`Updated artist ${name} as sorted`);
        });
  }

  filterCleanArtists() {
    const {page} = this.state;
    this.setState(() => ({
      hideCleanArtist: true
    }), () => this.getPage(page));
  }

  render() {
    const {galleries, strFilter, page, artistView, artistName, hideCleanArtist} = this.state;
    console.log(`this.state.galleries:- `, galleries);
    return (
        <div>

          <Search>
            <Pagination activePage={page} fetchPage={this.getPage}/>
            <input onChange={(e) => this.filterGalleries(e)}
                   style={{width: '20%', height: '40px'}}/>
            <button onClick={() => this.sortGalleries('name',
                'asc')}>By Name
            </button>
            <button onClick={() => this.sortGalleries('pages',
                'desc')}>By Pages
            </button>

            {artistView &&
            <button onClick={() => this.ignoreArtist(artistName)}>Ignore
              Artist</button>}
            {artistView &&
            <button onClick={() => this.artistClean(artistName)}>Artist
              Clean</button>}

            {(!artistView && !hideCleanArtist) &&
            <button onClick={() => this.filterCleanArtists()}>Hide
              Clean</button>}

          </Search>
          <ContentBody>
            {galleries ? galleries.filter(
                (gallery) => {
                  if (!strFilter) {return 1;}

                  const nameFound = gallery.name.toLowerCase()
                      .includes(strFilter.toLowerCase());

                  if (nameFound) return 1;

                  const tagsMatched = gallery.tags.filter(
                      tag => tag.toLowerCase()
                          .includes(strFilter.toLowerCase()));

                  return tagsMatched.length;
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