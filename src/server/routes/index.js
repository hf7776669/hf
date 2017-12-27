import express from 'express';
import galleryRoutes from './gallery-routes';

const router = express();

router.use('/gallery', galleryRoutes);

export default router; 