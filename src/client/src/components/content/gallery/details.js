import React, {Component} from 'react';
import styled from 'styled-components';
import he from 'he';
import axios from 'axios';

const badTags = [
  'Shotacon', 'Lolicon', 'Guro', 'Snuff',
  'Bestiality', 'Dog', 'Tentacles', '', '', '', ''
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

const Li = styled.li`
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
`;

const Artists = Tags.extend`
  cursor: pointer;
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
    if (badTags.indexOf(tag) >= 0) {
      return <li style={{fontWeight: 'bold', margin: '0 10px 0 0'}} key={tag}>
        <s>{tag}</s>
      </li>;
    }
    else {
      return <li style={{fontWeight: 'bold', margin: '0 10px 0 0'}}
                 key={tag}>{tag}</li>;
    }
  }

  ignoreGallery(serialNo) {
    console.log('Ignore: ', serialNo);
    return axios.post(`/api/gallery/${serialNo}`, {ignore: true})
        .then(({data: msg}) => {
          if (msg === 'Ignore update successful') {
            console.log(`Gallery ${serialNo} Ignored`);
          } else {console.log(`Gallery ${serialNo} could not be ignored`);}
        });
  }

  render() {
    const {name, link, tags, pages, serialNo, artists} = this.props.gallery;

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
            <Li>Download</Li>
            <Button onClick={() => this.ignoreGallery(serialNo)}>Ignore</Button>
            <Li><a onClick={this.toggleRead}>Read</a></Li>
            <Li># pictures</Li>
            <Li>Series</Li>
            <h3>Artists:</h3>
            <Artists>
              {artists && artists.map(artist => {
                if (typeof artist === 'object') {
                  artist = artist.name;
                }
                return (
                    <li style={{fontWeight: 'bold', margin: '0 10px 0 0'}}
                        key={artist}><a onClick={() => getArtistGalleries(
                        artist)}>{artist}</a></li>
                );
              })}
            </Artists>
            <Li>Priority</Li>
            <Li>Category</Li>

          </ul>
        </Wrapper>
    );
  }
}

export default Details;

{/*
<figcaption class="left">
  <div class="content">
    <h3><a href="/albums/besthdwallpaperspack592_281057/">BestHDWallpapersPack592</a></h3>
    <p># of pictures: 120</p>
    <p>Updated:&nbsp;Feb. 28, 2017.</p>

    <ol class="tag_list  static">
      <li>
        <a href="/c/wallpapers/albums/tagged/+wallpapers/page/1/" rel="tag">wallpapers</a>
      </li>
    </ol>

  </div>

  <div class="album_btn">
    <a href="/download/14752/281057/" class="icon-download download_icon"> Download</a><br>

    <a class="like_icon unset" data-id="281057" data-type="album"> 2</a>
    <a class="dislike_icon unset" data-id="281057" data-type="album"> 0</a>
  </div>
</figcaption>*/
}
