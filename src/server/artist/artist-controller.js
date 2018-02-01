/*
* Goal 
*   a. Define controllers for artist routes
*   
* NOTABLE FEATURES:
*   1. ES6 Structuring and Arrow Functions for controllers   
*/

import Gallery from '../gallery/gallery-model';
import Artist from '../artist/artist-model';
import config from '../config';

const {pageSize} = config.pagination;

const fetchArtist = async (req, res) => {
  const {artistName} = req.params;

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

const listArtists = async (req, res) => {

  const {page = 1} = req.query;

  const query = [
    {$match: {'ignore': false}},
    {$addFields: {count: {$size: '$galleries'}}},
    {$sort: {count: -1}}
  ];

  query.push(
      {
        $group: {
          _id    : null,
          count  : {$sum: 1},
          results: {$push: '$$ROOT'}
        }
      },
      {
        $project: {
          count: 1,
          rows : {$slice: ['$results', (page - 1) * pageSize, page * pageSize]}
        }
      });

//  const artists = await Artist.aggregate(
//      [{$addFields: {count: {$size: '$galleries'}}}, {$sort: {count: -1}}]);

  const artists = await Artist.aggregate(query);
  console.log(`results Count: `, artists.length);

  res.send(artists);
};

export default {fetchArtist, updateArtist, listArtists};