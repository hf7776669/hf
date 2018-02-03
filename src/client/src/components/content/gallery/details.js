import React, {Component, Fragment} from 'react';
import he from 'he';
import {badTags, goodTags} from '../../../config/tags';

import {
  Artists, ContainerLeft, ContainerRight, Item, Li, LiBad, LiGood, LiItem,
  Name, P, Ul
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
              {tag}
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

  render() {
    const {name, link, tags, pages, _id, artists, parodies, groups} = this.props.gallery;

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

            {!groups.length ? '' : (
                <Fragment>
                  <Item>Groups:</Item>
                  {groups.map(group => (
                      <Li key={group}>
                        <A filter={group}
                           filterGalleries={filterGalleries}>
                          {group}
                        </A>
                      </Li>
                  ))}
                </Fragment>
            )}

            <LiItem>Download</LiItem>
            <LiItem>Series</LiItem>


            <LiItem>Priority</LiItem>
            <LiItem>Category</LiItem>

          </ul>
        </Container>
    );
  }
}

export default Details;


