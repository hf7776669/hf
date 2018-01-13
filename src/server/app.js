import apiRoutes from './routes';
import express from 'express';
import path from 'path';

const app = express();

app.use((req, res, next) => {
  console.log(`received request: `, req.method, ' ', req.originalUrl);
  next();
});

app.use('/api', apiRoutes);

app.use('/static', express.static('src/client/build/static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


export default app;