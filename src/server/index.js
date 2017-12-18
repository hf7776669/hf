import app from './app';
import spdy from 'spdy';
import mongoose from 'mongoose';
import fs from 'fs';
import config from './config/index';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoConnection);
const db = mongoose.connection;

const options = {
  key : fs.readFileSync(__dirname + '/config/server-auth/server.key'),
  cert: fs.readFileSync(__dirname + '/config/server-auth/server.crt')
};

db.once('open', () => {
  console.log(`\nMongodb connected`);
  spdy
      .createServer(options, app)
      .listen(config.port, (err) => {
        if (err) {
          console.log(`\n\nerror in opening http2 server: \n`, err);
          return process.exit(1);
        }
        console.log(`\nListening on port ${config.port}`);
      });
});

db.on('error', (err) => {
  console.error(`\n\nError in connecting to the mongo server: \n\n`, err);
});
