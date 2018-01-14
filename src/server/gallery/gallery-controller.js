/*
* Goal 
*   a. Create controllers for Gallery routes
*   
*/

import fetchNewGalleries from './hf/update-new-galleries';
import getLatestDBGallery from './db-ops/get-latest-gallery';
import Gallery from './gallery-model';

const galleryBySerialNo = (req, res) => {

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

const ignoreGallery = (req, res) => {
  const {serialNo} = req.params;
  console.log(`Ignore gallery ${serialNo}`);

  return Gallery
      .update({serialNo}, {$set: {ignore: true}})
      .then(_ => res.send('Ignore update successful'))
      .catch(_ => {
        console.log('error in ignoring gallery: ', _);
        res.send('Ignore update failed');
      });
};

const getGalleries = (req, res) => {
  const {page = 1} = req.params;
  return Gallery
      .find({ignore: {$ne: true}})
      .sort({serialNo: -1})
      .skip((page - 1) * 40)
      .limit(40)
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

const changePriority = (req, res) => {
  let {serialNo} = req.params;
  return Gallery
      .findOne({serialNo})
      .then(result => console.log(`read: `, result.read) || !result.read)
      .then((newRead) => {
        gallery
            .findOneAndUpdate({serialNo}, {$set: {read: newRead}}, {new: true})
            .then((result) => res.send(result));
      });
};

const changeDownloadStatus = (req, res) => {
  let {serialNo} = req.params;
  return Gallery
      .findOne({serialNo})
      .then(result => console.log(`read: `, result.read) || !result.downloaded)
      .then((newDownloadedStatus) => {
        return Gallery
            .findOneAndUpdate({serialNo},
                {$set: {downloaded: newDownloadedStatus}}, {new: true})
            .then((result) => res.send(result));
      });
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

const updatePriority = (req, res) => {
  let {serialNo, newPriority} = req.params;

  newPriority = newPriority * 1;

  return Gallery
      .findOneAndUpdate(
          {serialNo},
          {$set: {priority: newPriority}},
          {new: true}
      )
      .then(result => res.send(result));
};

export default {
  download, updateDb, updatePriority,
  galleryBySerialNo, getGalleries, getLatest,
  changePriority, changeDownloadStatus, ignoreGallery
};
  