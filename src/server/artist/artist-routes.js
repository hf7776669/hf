import express from 'express';
import artistController from './artist-controller';

const Router = express();

Router.get('/', artistController.getArtists);

Router.get('/create', artistController.create);

export default Router;  