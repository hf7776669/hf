/*
* Goal - To create a artist collection from scratch using 
* galleries already fetched in gallery collection
* 
* input - gallery document
* output - new artist document if not existing
*        - push gallery _id into galleries array of artist document
*        
* CODE HIGHLIGHTS
*   - mongoose cursor.eachAsync 
*     - repeat cb fn (returning promise) over each document with 
*     - returns a promise after all cb fns are resolved.
*/

const startTime = Date.now();

import updateArtist from './artist-add-gallery';
import Gallery from '../../gallery/gallery-model';
import moment from 'moment';

const now = moment().format(' h:mm:s');

export default async () => {
  console.log(now + ': creating artist collection');
  const cursor = Gallery.find().sort({_id: 1}).cursor();
  await cursor
      .eachAsync(gallery => updateArtist(gallery));

  console.log(`${moment(startTime)
      .format('h:mm:ss')}: Started creating new artist collection`);
  console.log(now + ': Created artist collection');
}
 