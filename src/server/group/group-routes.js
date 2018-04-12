/*
* Goal 
*   a. To create routes for group API
*   
* NOTABLE FEATURES
*   - ES2015 Code
*   - Controller pattern for Node Express Routes
*   - express Promise Router is a direct replacement for express Router
*/

import expressPromiseRouter from 'express-promise-router';
import * as groupController from './group-controller';

const Router = expressPromiseRouter();

Router.route('/ignore/:groupName')
    .post(groupController.ignoreGroup);

Router.route('/:groupName')
    .get(groupController.fetchGroup);

export default Router;  
