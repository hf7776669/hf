import React, {Component, Fragment} from 'react';
import he from 'he';
import axios from 'axios';
import {badTags, goodTags} from '../../../config';

import {
  Artists, Button, ContainerLeft, ContainerRight, Item, Li, LiBad, LiGood,
  LiItem, Name, P, Ul
} from './details-styles';

const A = ({filterGalleries, children, filter}) => (
    <a onClick={() => filterGalleries(filter)} style={{cursor: 'pointer'}}>
      {children}
    </a>
);

class Details extends Component {

  tagType(tag) {
    const {filterGalleries} = this.props;

    if (badTags.indexOf(tag.toLowerCase()) >= 0) {
      return (
          <LiBad key={tag}>
            <A filter={tag} filterGalleries={filterGalleries}>
              <s>{tag}</s>
            </A>
          </LiBad>
      );
    }
    else {
      if (goodTags.indexOf(tag.toLowerCase()) >= 0) {
        return (
            <LiGood key={tag}>
              <A filter={tag} filterGalleries={filterGalleries}>{tag}</A>
            </LiGood>
        );
      }

      return (
          <Li key={tag}>
            <A filter={tag} filterGalleries={filterGalleries}>{tag}</A>
          </Li>
      );
    }
  }

  ignoreGallery(serialNo) {
    return axios.post(`/api/galleries/${serialNo}`, {ignore: true})
        .then(({data}) => {
          const {msg} = data;
          if (msg === 'Update successful') {
            console.log(`Gallery ${serialNo} Ignored`);
          } else {console.log(`Gallery ${serialNo} could not be ignored`);}
        });
  }


  render() {
    const {name, link, tags, pages, serialNo, artists, parodies} = this.props.gallery;

    const {getArtistGalleries, filterGalleries, position} = this.props;

    const Container = position === 'left' ? ContainerLeft : ContainerRight;

    //TODO: Create separate actions for
//    3. Actions 
//    - Download
//    - Read
//    - Series

    return (
        <Container>
          <ul style={{padding: '10px'}}>
            <Name><a href={link}>{he.decode(name)}</a></Name>
            <P style={{fontSize: '10px'}}><b>{pages} pages</b></P>

            {!tags.length ? '' : (
                <Fragment>
                  <Item>Tags: </Item>
                  < Ul>{tags.sort().map(tag => this.tagType(tag))}</Ul>
                </Fragment>
            )}

            {!parodies.length ? '' : (
                <Fragment>
                  <Item>Parodies:</Item>
                  {parodies.map(parody => (
                      <Li key={parody}>
                        <A filter={parody}
                           filterGalleries={filterGalleries}>
                          {parody}
                        </A>
                      </Li>
                  ))}
                </Fragment>
            )}

            <LiItem>Download</LiItem>
            <Button onClick={() => this.ignoreGallery(serialNo)}>Ignore</Button>
            <LiItem>Series</LiItem>

            {!artists.length ? '' : (
                <Fragment>
                  <Item>Artists:</Item>
                  <Artists>
                    {artists && artists.map(artist => (
                        <Li key={artist}>
                          <a onClick={() => getArtistGalleries(
                              artist)}>{artist}</a></Li>
                    ))}
                  </Artists>
                </Fragment>
            )}
            
            <LiItem>Priority</LiItem>
            <LiItem>Category</LiItem>

          </ul>
        </Container>
    );
  }
}

export default Details;


