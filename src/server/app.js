import apiRoutes from './routes/index';
import express from 'express';

const app = express();

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Serving HF');
});

export default app;  