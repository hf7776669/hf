import fetchNewGalleries from './hf/update-new-galleries';
import getLatestDBGallery from './db-ops/get-latest-gallery';
import gallery from './gallery-model';

const galleryBySerialNo = (req, res) => {

  const {serialNo} = req.params;

  gallery
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

const getAll = (req, res) => {
  gallery
      .find({})
      .limit(10)
      .then((results) => res.send(results))
      .catch(err => {
        console.log(`Error while fetching galleries from mongodb\n`, err);
        return new Error(err);
      });
};

const getLatest = (req, res) => {
  console.log(`latest`);
  getLatestDBGallery()
      .then(result => res.json(result[0].serialNo));
};

const changePriority = (req, res) => {
  let {serialNo} = req.params;
  gallery
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
  gallery
      .findOne({serialNo})
      .then(result => console.log(`read: `, result.read) || !result.downloaded)
      .then((newDownloadedStatus) => {
        gallery
            .findOneAndUpdate({serialNo},
                {$set: {downloaded: newDownloadedStatus}}, {new: true})
            .then((result) => res.send(result));
      });
};

const download = (req, res) => {
  let {serialNo} = req.params;
  //TODO: Download logic for the gallery  
};

const ignore = (req, res) => {
  let {serialNo} = req.params;
  //TODO: Get form data for ignore & ignore reason and update here
};

const updateDb = (req, res) => {
  //TODO: redirect with latest gallery view
  //TODO: send updated data back to client 
  //TODO: Client's axios library will use received data to update state

  fetchNewGalleries()
      .then((data) => {
//        console.log('data in updateNewGalleries: ', data);
        res.send(data);
      })
      .catch(err => console.log(err));
};

const updatePriority = (req, res) => {
  let {serialNo, newPriority} = req.params;

  newPriority = newPriority * 1;

  gallery
      .findOneAndUpdate({serialNo}, {$set: {priority: newPriority}},
          {new: true})
      .then(
          result => res.send(result));
};

export default {
  download, ignore, updateDb, updatePriority,
  galleryBySerialNo, getAll, getLatest,
  changePriority, changeDownloadStatus
};
  