/*
* goal - to update artist document or create new one
*      - add _id to artist
*      - ensure required parameters exist with default parameters
*      
* input - gallery object
* output - new artist document if not existing
*        - add to galleries array if existing
*      
* CODE FEATURES - 
* 1. Mongoose update (create & or update)
*   - upsert: true for creating new if not exists
*   - setdefaultsoninsert: true for creating default fields
*   - new: true to return updated document
* 2. Promise.all to execute updation of multiple artists at once  
*/

import Artist from '../artist-model';

function updateArtist(gallery) {
  console.log('updating Artists from gallery: ', gallery._id);
  if (gallery.artists.length) {
    const artistPromiseArray = gallery.artists.map(
        artist => {
          //some galleries contain artist details in object form
          artist = (typeof artist === 'object') ? artist.name : artist;
          console.log('Updating artist: ', artist);
          return Artist.update({name: artist}, {
            $addToSet: {galleries: gallery._id},
            //New Gallery might be duplicate or unwanted
            $set     : {cleaned: false}
          }, {new: true, upsert: true, setDefaultsOnInsert: true});
        });
    return Promise.all(artistPromiseArray);
  }
}

export default updateArtist;