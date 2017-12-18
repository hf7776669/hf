import gallery from '../models/gallery.model';
import express from 'express';

//const gallery = require('../models/gallery.model');

const router = express();

router.get('/:serialNo', (req, res) => {

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

router.get('/', (req, res) => {
  gallery
      .find({})
      .limit(10)
      .then((results) => res.send(results))
      .catch(err => {
        console.log(`Error while fetching galleries from mongodb\n`, err);
        return new Error(err);
      });
});

export default router;