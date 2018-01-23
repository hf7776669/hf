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
import config from '../config/';

const {pageSize} = config.pagination;

const fetchGallery = async (req, res) => {
  const {serialNo} = req.params;

  const gallery = await Gallery.find({serialNo});

  res.send(gallery);
};

const updateGallery = async (req, res) => {
  const {serialNo} = req.params;

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

  await Gallery.update({serialNo}, queryObject);

  res.send({msg: 'Update successful'});
};

const fetchGalleries = async (req, res) => {
  console.log(`Getting galleries`);
  const {page = 1, cleaned} = req.query;

  const galleries = await Gallery
      .find({ignore: {$ne: true}})
      .sort({serialNo: -1})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

  const filteredGalleries = await filterGalleries(galleries, cleaned);

  res.send(filteredGalleries);
};

const getLatest = async (req, res) => {
  const result = await getLatestDBGallery();

  res.json(result[0].serialNo);
};

const download = async (req, res) => {
  let {serialNo} = req.params;
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
  const galleryPromises    = galleries.map(gallery =>
      getGalleryStatus(gallery)
          .then(status => {
            console.log(`computed status: `, status);

            const result = ({
              ...JSON.parse(JSON.stringify(gallery)), ...status
            });

            console.log(
                `\nresult: ignore: ${result.ignore}, cleaned: ${result.cleaned}`);
            return result;
          })
  );
  const completedGalleries = await Promise.all(galleryPromises);

  return completedGalleries.filter(
      gallery => !(gallery.ignore ||
          (gallery.cleaned && (cleaned === 'hide'))));
}

async function getGalleryStatus(gallery) {
  const artistPromises = gallery.artists.map(
      artistName => Artist
          .findOne({name: artistName})
          .then(({ignore, cleaned}) => ({ignore, cleaned})));

  const artists = await Promise.all(artistPromises);

  artists.map(({ignore, cleaned}) => console.log(
      `artist ignore: ${ignore}, cleaned: ${cleaned}`));

  return artists.reduce((acc, currentValue) => {
    return ({
      ignore : !!(acc.ignore && currentValue.ignore),
      cleaned: !!(acc.cleaned * currentValue.cleaned)
    });
  }, {ignore: 1, cleaned: 1});
}