/*
* Goal 
*   a. Create controllers for Gallery routes
*   
* NOTABLE FEATURES 
*   - Async Await
*   
*/

import fetchNewGalleries from './hf/update-new-galleries';
import getLatestDBGallery from './db-ops/get-latest-gallery';
import Gallery from './gallery-model';
import Artist from '../artist/artist-model';
import config from '../config';

const {pageSize} = config.pagination;

const fetchGallery = async (req, res) => {
  const {_id} = req.params;

  const gallery = await Gallery.find({_id});

  res.send(gallery);
};

const updateGallery = async (req, res) => {
  const {_id} = req.params;

  const {priority, read, downloaded, rating, series, ignore, ignoreReason} = req.body;

  const pushObject   = {},
        updateObject = {};

  (read !== undefined) && (updateObject.read = read);
  (priority !== undefined) && (updateObject.priority = priority);
  (downloaded !== undefined) && (updateObject.downloaded = downloaded);
  (rating !== undefined) && (updateObject.rating = rating);
  (series !== undefined) && (updateObject.series = series);
  (ignore !== undefined) && (updateObject.ignore = ignore);
  (ignoreReason !== undefined) && (updateObject.ignoreReason = ignoreReason);

  let queryObject = {};

  if (Object.keys(pushObject).length * Object.keys(updateObject)) {
    queryObject = {$set: updateObject, $addToSet: pushObject};
  } else {
    if (Object.keys(pushObject).length) {
      queryObject = {$addToSet: pushObject};
    } else if (Object.keys(updateObject).length) {
      queryObject = {$set: updateObject};
    }
  }

  await Gallery.update({_id}, queryObject);

  res.send({msg: 'Update successful'});
};

const fetchGalleries = async (req, res) => {
  console.log(`Getting galleries`);
  const {page = 1, cleaned} = req.query;

  const galleries = await Gallery
      .find({ignore: {$ne: true}})
      .sort({_id: -1})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

  const filteredGalleries = await filterGalleries(galleries, cleaned);

  res.send(filteredGalleries);
};

const getLatest = async (req, res) => {
  const result = await getLatestDBGallery();

  res.json(result[0]._id);
};

const download = async (req, res) => {
//  let {_id} = req.params;
  //TODO: Download logic for the gallery  
};

const updateDb = async (req, res) => {
  //TODO: redirect with latest gallery view
  //TODO: send updated data back to client 
  //TODO: Client's axios library will use received data to update state

  const data = await fetchNewGalleries();
  res.send(data);
};

export default {
  download, updateDb, fetchGallery, fetchGalleries, getLatest, updateGallery
};

//filterGalleries
async function filterGalleries(galleries, cleaned) {
  const galleryPromises = galleries.map(
      gallery => getGalleryStatus(gallery)
          .then(status => ({
                ...JSON.parse(JSON.stringify(gallery)), ...status
              })
          )
  );

  const completedGalleries = await Promise.all(galleryPromises);

  return completedGalleries.filter(
      gallery => !(gallery.ignore ||
          (gallery.cleaned && (cleaned === 'hide')))
  );
}

async function getGalleryStatus(gallery) {
  let result = {};
  if (gallery.artists.length) {
    const artistPromises = gallery.artists.map(
        artistName => Artist
            .findOne({name: artistName})
            .then(({ignore, cleaned}) => ({ignore, cleaned})));

    const artists = await Promise.all(artistPromises);

    artists.map(({ignore, cleaned}) => console.log(
        `artist ignore: ${ignore}, cleaned: ${cleaned}`));

    result = artists.reduce((acc, currentValue) => {
      return ({
        ignore : !!(acc.ignore && currentValue.ignore),
        cleaned: !!(acc.cleaned * currentValue.cleaned)
      });
    }, {ignore: 1, cleaned: 1});
  } else {
    // No artists tagged to the gallery
    // Return default false values for the gallery
    result = {ignore: false, cleaned: false};
  }

  return result;
}