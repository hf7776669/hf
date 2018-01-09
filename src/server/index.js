import app from './app';
import spdy from 'spdy';
import mongoose from 'mongoose';
import fs from 'fs';
import config from './config/index';

require('dotenv-safe').load();

let mongoLink;

switch (process.env.DB) {
  case 'local':
    mongoLink = config.localMongo;
    break;
  case 'test':
    mongoLink = config.testMongoConnection;
    break;
  case 'server':
    mongoLink = config.mongoConnection;
    break;
  default:
    mongoLink = config.localMongo;
}

console.log(`mongoLink`, mongoLink);

mongoose.Promise = global.Promise;
mongoose.connect(mongoLink);

const db = mongoose.connection;

const options = {
  key : fs.readFileSync(__dirname + '/config/server-auth/server.key'),
  cert: fs.readFileSync(__dirname + '/config/server-auth/server.crt')
};

db.once('open', () => {
  console.log(`\nConnected to ${mongoLink}`);
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


/*
* Random comment from tosh
*/