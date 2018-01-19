/*
* Goal 
*   a. Define controllers for artist routes
*   
* NOTABLE FEATURES:
*   1. ES6 Structuring and Arrow Functions for controllers   
*/

import Gallery from '../gallery/gallery-model';
import Artist from '../artist/artist-model';

const fetchArtist = (req, res) => {
  const {artistName} = req.params;
  console.log(`artistName: `, artistName);
  return Artist
      .findOne({name: artistName})
      .then(({galleries}) => {
        const galleryPromises = galleries.map(
            serialNo => Gallery.findOne({serialNo}));

        return Promise.all(galleryPromises);
      })
      .then(results => {
        // filter ignored galleries
        res.send(results.filter(result => !result.ignore));
      })
      .catch(err => {
        console.log(`Error while fetching artists from mongodb\n`, err);
        return new Error(err);
      });
};

const updateArtist = (req, res) => {
  const {artistName} = req.params;
  console.log(`request body: `, req.body);
  const {track, read, ignore, ignoreReason, priority, cleaned, observations} = req.body;

  const updateObject = {};

  (read !== undefined) && (updateObject.read = read);
  (ignore !== undefined) && (updateObject.ignore = ignore);
  (priority !== undefined) && (updateObject.priority = priority);
  (ignoreReason !== undefined) && (updateObject.ignoreReason = ignoreReason);
  (track !== undefined) && (updateObject.track = track);
  (cleaned !== undefined) && (updateObject.cleaned = cleaned);
  (observations !== undefined) && (updateObject.observations = observations);

  return Artist
      .findOneAndUpdate({name: artistName}, {$set: updateObject})
      .then(_ => res.send(`${artistName} update successful`))
      .catch(_ => {
        console.log(`error in ignoring artist ${artistName}: `, _);
        res.send(`${Object.keys(updateObject)} update failed`);
      });
};

export default {fetchArtist, updateArtist};