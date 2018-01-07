const mongoose     = require('mongoose');
const Schema       = require('mongoose').Schema;
const artistSchema = Schema({
  name          : {type: String, required: true},
  /*
  * track in case
  *   - incomplete series
  *   - really good artist like tsuya tsuya
  * Since there will be few tracked artists, default is false 
  */
  track         : {type: Boolean, required: true, default: false},
  read          : {type: Boolean, required: false, default: false},
  /*
  * ignore in case
  *   - bad tags [*con, guro, ...]
  *   - only parodies
  *   - bad art
  *   - bad story lines
  */
  ignored       : {type: Boolean, default: false},
  reasonToIgnore: {type: String},
  priority      : {type: Number, default: 5, required: true},
  observations  : {type: String},
  /*
  * Contains gallerySerialNos as these are unique 
  */
  galleries     : {type: Array, required: true}
});

artistSchema.statics.bulkInsert = function(models, fn) {
  if (!models || !models.length)
    return fn(null);

  var bulk = this.collection.initializeOrderedBulkOp();
  if (!bulk)
    return fn('bulkInsertModels: MongoDb connection is not yet established');

  var model;
  for (var i = 0; i < models.length; i++) {
    model = models[i];
    bulk.insert(model);
  }

  bulk.execute(fn);
};

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;

