/*
* Goal 
*   a. To create routes for artist API
*   
* NOTABLE FEATURES
*   - ES2015 Code
*   - Controller pattern for Node Express Routes
*   - express Promise Router is a direct replacement for express Router
*/

import expressPromiseRouter from 'express-promise-router';
import artistController from './artist-controller';

const Router = expressPromiseRouter();

Router.route('/:artistName')
    .get(artistController.fetchArtist)
    .post(artistController.updateArtist);

Router.route('/')
    .get(artistController.listArtists);

export default Router;  
