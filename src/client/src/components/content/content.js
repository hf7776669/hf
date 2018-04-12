/* 
* NOTABLE FEATURES - 
*   - Better CSS Specificity in styled-components by wrapping all CSS Rules inside &&& {}
*   - Fixed Filter input box 
*/

import React from 'react';
import Gallery from './gallery/gallery';
import axios from 'axios';
import Pagination from '../pagination';
import {ContentBody, Search} from './content-styles';

const sortGalleries = (
    galleries,
    sortParameter = '_id',
    sortDirection = 'desc') => {
  let comparator;
  switch (sortDirection) {
    case 'asc':
      comparator = -1;
      break;
    case 'desc':
      comparator = 1;
      break;
    default:
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
    this.getGroupGalleries = this.getGroupGalleries.bind(this);
    this.filterGalleries    = this.filterGalleries.bind(this);
    this.filterCleanArtists = this.filterCleanArtists.bind(this);
    this.getPage            = this.getPage.bind(this);
    this.state              = {page: 1, hideCleanArtist: false, strFilter: ''};
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
          this.setState(() => ({
            galleries : data.length ? sortGalleries(data) : [],
            artistView: true,
            artistName,
            strFilter : ''
          }));
        });
  }

  getGroupGalleries(groupName) {
    return axios
        .get(`/api/groups/${groupName}`)
        .then((axiosResult) => {
          const {data} = axiosResult;
          this.setState(() => ({
            galleries : data.length ? sortGalleries(data) : [],
            artistView: false,
            groupView: true,
            groupName,
            strFilter : ''
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

  filterInput(event) {
    const {value} = event.target;
    this.filterGalleries(value);
  }

  filterGalleries(filterString) {
    this.setState(() => ({strFilter: filterString}));
  }

  getPage(page) {
    const {hideCleanArtist} = this.state;

    return axios.get(
        `/api/galleries?page=${page}${hideCleanArtist ? '&cleaned=hide' : ''}`)
        .then(axiosResult => {
          this.setState(() => ({
            galleries : sortGalleries(axiosResult.data),
            page      : page,
            artistView: false,
            strFilter : ''
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
    return (
        <div>
          <Search>
            <Pagination activePage={page} fetchPage={this.getPage}/>
            <input onChange={(e) => this.filterInput(e)}
                   style={{width: '20%', height: '40px'}}
                   value={this.state.strFilter}/>
            <button onClick={() => this.sortGalleries('name',
                'asc')}>By Name
            </button>
            <button onClick={() => this.sortGalleries('parodies',
                'desc')}>By Parodies
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
            {!(galleries && galleries.length)
                ? 'Loading'
                : galleries.filter(
                    (gallery) => {
                      if (!strFilter) {return 1;}

                      const nameFound = gallery.name.toLowerCase()
                          .includes(strFilter.toLowerCase());

                      if (nameFound) return 1;

                      const tagsMatched = gallery.tags.filter(
                          tag => tag.toLowerCase()
                              .includes(strFilter.toLowerCase()));

                      if (tagsMatched.length) return tagsMatched.length;

                      const parodiesMatched = gallery.parodies.filter(
                          parody => parody.toLowerCase()
                              .includes(strFilter.toLowerCase()));

                      if (parodiesMatched.length) return parodiesMatched.length;

                      return 0;
                    })
                    .map(
                        gallery => (
                            <Gallery key={gallery._id}
                                     gallery={gallery}
                                     getArtistGalleries={this.getArtistGalleries}
                                     getGroupGalleries={this.getGroupGalleries}
                                     filterGalleries={this.filterGalleries}>
                            </Gallery>
                        )
                    )
            }
          </ContentBody>

        </div>
    );
  }
}

export default Content;