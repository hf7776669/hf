/*
* Goal 
*   - Single file for all gallery routes
*   
* NOTABLE FEATURES
*   - Controller pattern for Node Express Routes
* */

import express from 'express';

import galleryController from './gallery-controller';

const Router = express.Router();

Router
    .route('/update')
    .get(galleryController.updateDb);

Router
    .route('/latest')
    .get(galleryController.getLatest);

Router
    .route('/download/:serialNo')
    .get(galleryController.download);

Router
    .route('/:serialNo')
    .get(galleryController.fetchGallery)
    .post(galleryController.updateGallery);

Router
    .route('/')
    .get(galleryController.fetchGalleries);

export default Router; 
 