const mongoose     = require('mongoose');
const Schema       = require('mongoose').Schema;
const artistSchema = Schema({
  name          : {type: String, required: true},
  link          : {type: String, required: true},
  results       : Number,
  track         : {type: Boolean, required: true, default: false},
  read          : {type: Boolean, required: false, default: false},
  downloaded    : {type: Boolean, default: false, required: true},
  ignored       : {type: Boolean, default: false},
  reasonToIgnore: {type: String},
  priority      : {type: Number, default: 1, required: true},
  observations  : {type: String},
  galleries     : Array

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