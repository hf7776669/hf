import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import he from 'he';
import axios from 'axios';

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

const Wrapper = styled.div`
  left: 100%;
  z-index: 200;
  color: #a8a7a7;
  font-size: 2em;
  top:0;
  position: absolute;
  background: rgb(52,52,52);
  width: 353px;
`;

const hoverColor = `&:hover {color: #c3c1c7;}`;

const LiItem = styled.li`
  color: #c19bb0;
  font-size:14px;
  font-family: Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: bold;
  ${hoverColor}
`;

const Name = styled.h4`
  font-size: 18px;
  ${hoverColor};
  cursor: pointer ;
  
  > a {
    color: #c3c1c7;
    text-decoration: none;
    &:hover {
      color: #ff97a3;
    }
  }
`;

const P = styled.p`
  color: palevioletred;
  font-size: 14px; 
  font-style: italic;
`;

const Tags = styled.ul`
  display: flex;
  list-style: square;
  justify-content: space-between;
  font-size: 14px;
  flex-wrap: wrap;
  padding: 0 0px 0 0px;
  margin: 0 5px;
`;

const Artists = Tags.extend`
  cursor: pointer;
`;

const Item = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

const Li = styled.li`
  margin: 0 0 0 10px;
`;

const LiBad = Li.extend`
  color: red; 
`;

const LiGood = styled.li`
  color: green;
  font-weight: bold;
`;

const Button = styled.button`
  background: orangered;
  color: whitesmoke;
  font-weight: 400;
  line-height: 2.5em;
  padding: 3px 15px;
  margin: 0 15px;
  border-radius: 8px;
  text-align: center;
  align-items: center;
  float: right; 
  font-size: medium;
`;

class Details extends Component {
  constructor(props) {
    super(props);
  }

  tagType(tag) {
    if (badTags.indexOf(tag.toLowerCase()) >= 0) {
      return <LiBad key={tag}><s>{tag}</s></LiBad>;
    }
    else {
      if (goodTags.indexOf(tag.toLowerCase()) >= 0) {
        return <LiGood key={tag}><i>{tag}</i></LiGood>;
      }

      return <Li key={tag}>{tag}</Li>;
    }
  }

  ignoreGallery(serialNo) {
    console.log('Ignore: ', serialNo);
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

    const {getArtistGalleries} = this.props;

    //TODO: Create separate components for
//    1. Info {name, pages, author, pages, category}
//    2. Tags
//    3. Actions 
//    - Download
//    - Read
//    - Series
//    - Ignore

    return (
        <Wrapper>
          <ul>
            <Name><a href={link}>{he.decode(name)}</a></Name>
            <P style={{fontSize: '10px'}}><b>{pages} pages</b></P>
            <Tags>
              {tags && tags.map(tag => this.tagType(tag))}
            </Tags>

            {parodies.length ? (
                <Fragment>
                  <Item>Parodies:</Item>
                  <span style={{fontSize: '14px'}}>{parodies}</span>
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
                            key={artist}><a onClick={() => getArtistGalleries(
                            artist)}>{artist}</a></li>
                    ))}
                  </Artists>
                </Fragment>
            ) : ''}
            <LiItem>Priority</LiItem>
            <LiItem>Category</LiItem>

          </ul>
        </Wrapper>
    );
  }
}

export default Details;


