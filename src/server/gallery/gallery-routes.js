/*
* Goal 
*   - Single file for all gallery routes
*   
* NOTABLE FEATURES
*   - Controller pattern for Node Express Routes
* */

import express from 'express';

import galleryController from './gallery-controller';

const Router = express();

Router.get('/serialNo/:serialNo', galleryController.galleryBySerialNo);

Router.get('/', galleryController.getAll);

Router.get('/latest', galleryController.getLatest);

Router.post('/priority/:serialNo/:newPriority',
    galleryController.updatePriority);

Router.post('/read/:serialNo', galleryController.changePriority);

Router.post('/ignore/:serialNo', galleryController.ignoreGallery);

Router.post('/download-status/:serialNo',
    galleryController.changeDownloadStatus);

Router.get('/download/:serialNo', galleryController.download);

Router.post('/ignore/:serialNo', galleryController.ignore);

Router.get('/update', galleryController.updateDb);


export default Router;

