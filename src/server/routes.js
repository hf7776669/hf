import express from 'express';
import galleryRoutes from './gallery/gallery-routes';
import artistRoutes from './artist/artist-routes';

const router = express();

router.use('/gallery', galleryRoutes);

router.use('/artist', artistRoutes);

router.get('/', (req, res) => {
  res.send('Use /gallery or /artists');
});

export default router; 