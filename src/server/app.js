import apiRoutes from './routes';
import express from 'express';

const app = express();

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Serving HF');
});

export default app;