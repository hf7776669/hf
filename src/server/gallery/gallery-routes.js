/*
* Goal 
*   - Single file for all gallery routes
*   
* NOTABLE FEATURES
*   - Controller pattern for Node Express Routes
*   - express Promise Router is a direct replacement for express Router 
*/


import expressPromiseRouter from 'express-promise-router';

import galleryController from './gallery-controller';

const Router = expressPromiseRouter();

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
 