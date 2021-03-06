import express from 'express';
import galleryRoutes from './gallery/gallery-routes';
import artistRoutes from './artist/artist-routes';
import groupRoutes from './group/group-routes';

const app = express();

app.use('/galleries', galleryRoutes);

app.use('/artists', artistRoutes);

app.use('/groups', groupRoutes);

app.get('/', (req, res) => {
  res.send('Use /gallery or /artists');
});

export default app; 