/*
* Goal 
*   a. Create controllers for Gallery routes
*   
*/

import fetchNewGalleries from './hf/update-new-galleries';
import getLatestDBGallery from './db-ops/get-latest-gallery';
import Gallery from './gallery-model';
import config from '../config/';

const {pageSize} = config.pagination;

const fetchGallery = (req, res) => {

  const {serialNo} = req.params;

  return Gallery
      .find({serialNo})
      .then((results) => {
        console.log(`results: `, results);
        res.send(results);
      })
      .catch((err) => {
        console.log(`\nError when fetching gallery from database\n`, err);
        return new Error(err);
      });
};

const updateGallery = (req, res) => {
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

  let result;

  if (Object.keys(pushObject).length * Object.keys(updateObject)) {
    result = Gallery.update({serialNo},
        {$set: updateObject, $addToSet: pushObject});
  } else {
    if (Object.keys(pushObject).length()) {
      result = Gallery.update({serialNo}, {$addToSet: pushObject});

    } else if (Object.keys(updateObject).length) {
      result = Gallery.update({serialNo}, {$set: updateObject});
    }
  }

  return result
      .then(_ => res.send('Ignore update successful'))
      .catch(_ => {
        console.log('Error in updating gallery: ', pushObject, updateObject);
        res.send('Update failed');
      });
};

const getGalleries = (req, res) => {
  const {page = 1} = req.query;
  return Gallery
      .find({ignore: {$ne: true}})
      .sort({serialNo: -1})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .then((results) => res.send(results))
      .catch(err => {
        console.log(`Error while fetching galleries from mongodb\n`, err);
        return new Error(err);
      });
};

const getLatest = (req, res) => {
  console.log(`latest`);
  return getLatestDBGallery()
      .then(result => res.json(result[0].serialNo));
};

const download = (req, res) => {
  let {serialNo} = req.params;
  //TODO: Download logic for the gallery  
};

const updateDb = (req, res) => {
  //TODO: redirect with latest gallery view
  //TODO: send updated data back to client 
  //TODO: Client's axios library will use received data to update state

  return fetchNewGalleries()
      .then((data) => {
//        console.log('data in updateNewGalleries: ', data);
        res.send(data);
      })
      .catch(err => console.log(err));
};

export default {
  download, updateDb, fetchGallery, getGalleries, getLatest, updateGallery
};
  