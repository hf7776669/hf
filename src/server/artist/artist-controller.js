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
      _id => Gallery.findOne({_id}));

  let galleries = await Promise.all(galleryPromises);

  res.send({
    ...artist.toJSON(), /*findOne needs this additional step*/
    galleries: galleries.filter(gallery => !gallery.ignore)
  });
};

const updateArtist = async (req, res) => {
  const {artistName} = req.params;
  console.log(`request body: `, req.body);

  const updateObject = {...req.body};
  const {ignore} = req.body
  
  console.log(artistName);
  console.log(`updateObject`, updateObject);

  await Artist.findOneAndUpdate({name: artistName}, updateObject);

  ignore === true && await Gallery.update({artists: artistName},
      {$set: {ignore}}, {multi: 1});

  res.send(`${artistName} update successful`);
};

const listArtists = async (req, res) => {

  const {page = 1} = req.query;

  const query = [
    {$match: {$or: [{'ignore': false}, {ignore: {$exists: false}}]}},
    {$addFields: {galleryCount: {$size: '$galleries'}}},
    {$sort: {galleryCount: -1, name: 1}}
  ];

  query.push(
      {
        $group: {
          _id: null, artistCount: {$sum: 1}, results: {$push: '$$ROOT'}
        }
      },
      {
        $project: {
          artistCount: 1,
          rows       : {
            $slice: ['$results', (page - 1) * pageSize, page * pageSize]
          }
        }
      });

  const artists = await Artist.aggregate(query);
  console.log(`results Count: `, artists.length);

  res.send(artists);
};

export default {fetchArtist, updateArtist, listArtists};