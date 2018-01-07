/*
* goal - to update artist document or create new one
*      - add serialno to artist
*      - ensure required parameters exist with default parameters
*      
* CODE FEATURES - 
*   - upsert: true for creating new if not exists
*   - setdefaultsoninsert: true for creating default fields
*   - new: true to return updated document
*   
*/

import Artist from '../artist-model';

function updateArtist(gallery) {
  console.log('updating Artists from gallery: ', gallery);
  if (gallery.artists.length) {
    const artistPromiseArray = gallery.artists.map(
        artist => {
          artist = (typeof artist === 'object') ? artist.name : artist;

          return Artist.update({name: artist}, {
            name     : artist,
            $addToSet: {galleries: gallery.serialNo}
          }, {new: true, upsert: true, setDefaultsOnInsert: true});
        });
    return Promise.all(artistPromiseArray);
  }
}

export default updateArtist;