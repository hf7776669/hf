import apiRoutes from './routes';
import express from 'express';

const app = express();

app.use((req, res, next) => {
  console.log(`received request: `, req.method, ' ', req.originalUrl);
  next();
});

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Serving HF');
});

export default app;