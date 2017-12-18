import apiRoutes from './routes/index';
import express from 'express';

const app = express();

app.use((req, res, next) => {
  console.log(`Received request in api`);
  next();
});

app.use('/api', apiRoutes); 

app.get('/', (req, res) => {
  res.send('Hi There');
});

export default app;  