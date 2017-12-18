//last gallery page checked
//latest number of gallery pages
//last date checked
//total number of galleries
//number of galleries read
//filter tags

const mongoose      = require('mongoose');
const Schema        = require('mongoose').Schema;
const hfStatsSchema = new Schema({
  galleryPageChecked : {type: Number, default: 1},
  galleryPages       : Number,
  latestDateChecked  : Date,
  galleriesRead      : Number,
  galleriesDownloaded: Number,
  filterTags         : Array
}, {collection: 'hfStats'});

const HFStats = mongoose.model('hFStats', hfStatsSchema);

module.exports = HFStats;