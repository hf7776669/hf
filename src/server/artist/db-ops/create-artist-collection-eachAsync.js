/*
* Goal - To create a artist collection from scratch using 
* galleries already fetched in gallery collection
* 
* input - gallery document
* output - new artist document if not existing
*        - push gallery serialNo into galleries array of artist document
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

/*
mongoose.connect('localhost/hf-test');

const db = mongoose.connection;

console.log(`Connecting to Mongodb`);

db.once('open', () => {
  console.log(`Connected to Mongodb`);
  const cursor = Gallery.find().sort({serialNo: 1}).cursor();
  cursor.eachAsync(gallery => {
    console.log(gallery.serialNo);
    return updateArtist(gallery);
  }).then(() => {
    console.log(`startTime: `, moment(startTime).format(' h:mm:s'));
    console.log(`endTime: `, moment().format(' h:mm:s'));
  }); 
});

db.on('error', err => {
  console.log(`Error connecting to Mongodb`, err);
});
 
*/

export default () => {
  console.log(moment(startTime).format(' h:mm:s') + ': creating artist' +
      ' collection');
  const cursor = Gallery.find().sort({serialNo: 1}).cursor();
  return cursor.eachAsync(gallery => {
    console.log(gallery.serialNo);
    return updateArtist(gallery);
  }).then(() => {
    console.log(`${moment(startTime)
        .format('h:mm:ss')}: Started creating new artist collection`);
    console.log(moment().format('h:mm:ss') + ': Created artist collection');
  });
}