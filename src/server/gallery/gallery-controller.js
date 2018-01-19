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
  const {page = 1} = req.query;

  const galleries = await Gallery
      .find({ignore: {$ne: true}})
      .sort({serialNo: -1})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

  res.send(galleries);
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
  