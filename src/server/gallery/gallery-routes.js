/*
* Goal 
*   - Single file for all gallery routes
*   
* NOTABLE FEATURES
*   - Controller pattern for Node Express Routes
* */

import express from 'express';

import galleryController from './gallery-controller';

//const Router = express();
const Router = express.Router();

Router.route('/:serialNo')
    .get(galleryController.fetchGallery)
    .post(galleryController.updateGallery);

Router.get('/', galleryController.fetchGalleries);

Router.get('/latest', galleryController.getLatest);

Router.get('/download/:serialNo', galleryController.download);

Router.get('/update', galleryController.updateDb);

export default Router; 
 