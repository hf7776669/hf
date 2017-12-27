import gallery from '../models/gallery.model';
import express from 'express';

//const gallery = require('../models/gallery.model');

const galleries = express();

galleries.get('/serialNo/:serialNo', (req, res) => {

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
});

galleries.get('/', (req, res) => {
  gallery
      .find({})
      .limit(10)
      .then((results) => res.send(results))
      .catch(err => {
        console.log(`Error while fetching galleries from mongodb\n`, err);
        return new Error(err);
      });
});

galleries.get('/latest', (req, res) => {
  console.log(`latest`);
  gallery
      .find({})
      .sort({serialNo: -1})
      .limit(1)
      .then(result => res.json(result[0].serialNo));
});

galleries.get('/correct-serial-no', (req, res) => {

  console.log(`Correcting Serial Numbers`);

  function getIncorrectSerialNo() {
    gallery
        .find({serialNo: /^[1]/}, {serialNo: 1, _id: 0})
        .sort({serialNo: 1})
        .limit(1)
        .then((result) => {
              if (result.length > 0) {
                const incorrectSerialNo = result[0].serialNo + '';
                const correctSerialNo   = incorrectSerialNo.padStart(6, '0');
                console.log(`Correcting to ${correctSerialNo}`);
                return gallery
                    .update({serialNo: incorrectSerialNo},
                        {$set: {serialNo: correctSerialNo}})
                    .then((result) => {
                      return getIncorrectSerialNo();
                    });
              } else {
                console.log(`No more to be corrected`);
                res.json({message: 'Corrected all serial numbers'});
              }
            }
        );
  }

  getIncorrectSerialNo();
});

galleries.post('/priority/:serialNo/:newPriority', (req, res) => {
  let {serialNo, newPriority} = req.params;

  newPriority = newPriority * 1;

  gallery
      .findOneAndUpdate({serialNo}, {$set: {priority: newPriority}},
          {new: true})
      .then(
          result => res.send(result));
});

galleries.post('/read/:serialNo', (req, res) => {
  let {serialNo} = req.params;
  gallery
      .findOne({serialNo})
      .then(result => console.log(`read: `, result.read) || !result.read)
      .then((newRead) => {
        gallery
            .findOneAndUpdate({serialNo}, {$set: {read: newRead}}, {new: true})
            .then((result) => res.send(result));
      });
});

galleries.post('/download-status/:serialNo', (req, res) => {
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
});

galleries.get('/download/:serialNo', (req, res) => {
  let {serialNo} = req.params;
  //TODO: Download logic for the gallery  
});

galleries.post('/ignore/:serialNo', (req, res) => {
  let {serialNo} = req.params;
  //TODO: Get form data for ignore & ignore reason and update here
});

galleries.post('/update', (req, res) => {
  //TODO: get latest updated gallery
  //TODO: find all latest galleries before the latest mongo gallery
  //TODO: Add galleries to db
  //TODO: redirect with latest gallery view
});

export default galleries;