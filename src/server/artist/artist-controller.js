import Artist from './artist-model';
import createArtist from './db-ops/create-artist-collection-eachAsync';

const create = (req, res) => {
  createArtist().then(() => {
    res.send('created artist collection');
  });
};

const getArtists = (req, res) => {
  console.log(`Received request '/api/artist'`);
  Artist
      .find({})
      .sort({_id: -1})
      .limit(10)
      .then(results => res.send(results))
      .catch(err => {
        console.log(`Error while fetching artists from mongodb\n`);
        return new Error(err);
      });
};

export default {
  create, getArtists
};