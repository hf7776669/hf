export default {
  mongoConnection    : '192.168.0.101:27017/hf',
  testMongoConnection: '192.168.0.101:27017/hf-test',
  port               : /*process.env.PORT || */3001,
  hfAddress          : 'https://hentaifox.com',
  localMongo         : 'mongodb://localhost:27017/hf-test',
  requestHeaders: {
    Connection                 : 'keep-alive',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent'               : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
    Accept                     : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    DNT                        : 1,
    'Accept-Encoding'          : 'gzip, deflate, sdch, br',
    'Accept-Language'          : 'en-US,en;q=0.8'
  },
  pagination    : {
    pageSize: 25
  }
};        