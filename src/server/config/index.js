export default {
  mongoConnection    : '192.168.0.101:27017/hf',
  testMongoConnection: '192.168.0.101:27017/hf-test',
  port               : process.env.PORT || 3001,
  hfAddress          : 'https://hentaifox.com',
  localMongo         : 'mongodb://localhost:27017/hf-test'
};    