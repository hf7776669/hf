/*
* Goal 
*   a. Define controllers for artist routes
*   
* NOTABLE FEATURES:
*   1. ES6 Structuring and Arrow Functions for controllers   
*/

import Gallery from '../gallery/gallery-model';
import Artist from '../artist/artist-model';
import createArtist from './db-ops/create-artist-collection-eachAsync';

const create = (req, res) => createArtist().then(() => {
  res.send('created artist collection');
});


const getArtist = (req, res) => {
  const {name} = req.params;
  console.log(`name: `, name);
  return Artist
      .findOne({name})

      .then(({galleries}) => {

        const galleryPromises = galleries.map(
            serialNo => Gallery.findOne({serialNo, ignore: {$ne: true}}));
        return Promise.all(galleryPromises);
      })
      .then(results => {
        results = results.filter(gallery => gallery);
        console.log('number of galleries', results.length);
        res.send(results);
      })
      .catch(err => {
        console.log(`Error while fetching artists from mongodb\n`, err);
        return new Error(err);
      });
};

export default {create, getArtist};