import React, {Component, Fragment} from 'react';
import he from 'he';
import axios from 'axios';

import {
  Artists, Button, ContainerLeft, ContainerRight, Item, Li, LiBad, LiGood,
  LiItem, Name, P, Tags
} from './details-styles';

const badTags = [
  'shotacon', 'lolicon', 'guro', 'snuff', 'scat', 'bestiality', 'dog',
  'tentacles', 'smegma', 'vomit', 'crossdressing', 'diaper', 'infantilism',
  'pegging', 'tomgirl', 'dickgirl-on-male', 'giantess', 'giant', 'poor-grammar',
  'huge-breasts', 'human-on-furry', 'oppai-loli', 'phimosis', 'rape',
  'mind-break', 'males-only', 'guys-only', 'footjob', 'urination',
  'inflation', 'stomach-deformation', 'enema', 'prostate-massage',
  'big-areolae', 'urethra-insertion', 'cbt', 'torture', 'prolapse',
  'futanari-on-male', 'piss-drinking', 'eggs', 'parasite', 'orc',
  'amputee', 'insect', 'snake-girl', 'slime', 'horse', 'low-lolicon',
  'pig', 'centaur', 'squid-girl', 'coprophagia', 'insect-girl', 'slime-girl',
  'spider-girl', 'minotaur', 'cannibalism', 'pig-man', 'necrophilia',
  'octopus', 'furry', 'eye-penetration', 'frog', 'low-bestiality',
  'grandmother', 'monkey', 'pig-girl', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', ''
];

const goodTags = [
  'milf', 'strap-on', 'incest', 'inseki', 'webtoon', 'story-arc',
  'multi-work-series', 'mother', 'sister', 'cousin', 'aunt', 'yuri',
  'females-only', 'double-vaginal', 'uncensored', 'story-arc', 'netorare',
  'tankoubon', 'twins', 'chinese-dress', 'ttf-threesome', 'fft-threesome',
  '', '', '', '', '', ''
];

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
          <ul>
            <Name><a href={link}>{he.decode(name)}</a></Name>
            <P style={{fontSize: '10px'}}><b>{pages} pages</b></P>
            <Tags>
              {tags && tags.sort().map(tag => this.tagType(tag))}
            </Tags>

            {parodies.length ? (
                <Fragment>
                  <Item>Parodies:</Item>

                  {parodies.map(parody => (
                      <A filter={parody} key={parody}
                         filterGalleries={filterGalleries}>{parody}</A>
                  ))}

                </Fragment>
            ) : ''}
            <LiItem>Download</LiItem>
            <Button onClick={() => this.ignoreGallery(serialNo)}>Ignore</Button>
            <LiItem>Series</LiItem>

            {artists.length ? (
                <Fragment>
                  <Item>Artists:</Item>
                  <Artists>
                    {artists && artists.map(artist => (
                        <li style={{fontWeight: 'bold', margin: '0 10px 0 0'}}
                            key={artist}>
                          <a onClick={() => getArtistGalleries(
                              artist)}>{artist}</a></li>
                    ))}
                  </Artists>
                </Fragment>
            ) : ''}
            <LiItem>Priority</LiItem>
            <LiItem>Category</LiItem>

          </ul>
        </Container>
    );
  }
}

export default Details;


