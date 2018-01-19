/*
* Goal 
*   a. To create routes for artist API
*   
* NOTABLE FEATURES
*   - ES2015 Code
*   - Controller pattern for Node Express Routes
*/

import express from 'express';
import artistController from './artist-controller';

const Router = express.Router();

Router.route('/:artistName')
    .get(artistController.fetchArtist)
    .post(artistController.updateArtist);

export default Router;  
