/*
* Goal 
*   a. Define controllers for artist routes
*   
* NOTABLE FEATURES:
*   1. ES6 Structuring and Arrow Functions for controllers   
*/

import Gallery from '../gallery/gallery-model';
import Artist from '../artist/artist-model';

const fetchArtist = async (req, res) => {
  const {artistName} = req.params;
  console.log(`artistName: `, artistName);

  const artist = await Artist
      .findOne({name: artistName});

  const galleryPromises = artist.galleries.map(
      serialNo => Gallery.findOne({serialNo}));

  let galleries = await Promise.all(galleryPromises);

  res.send(galleries.filter(gallery => !gallery.ignore));
};

const updateArtist = async (req, res) => {
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

  console.log(artistName);
  console.log(`updateObject`, updateObject);

  await Artist.findOneAndUpdate({name: artistName},
      {$set: updateObject});

  if (ignore === true) await Gallery.update({artists: artistName},
      {$set: updateObject}, {multi: true});


  res.send(`${artistName} update successful`);
};

export default {fetchArtist, updateArtist};