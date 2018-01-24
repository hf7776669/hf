/*
* Goal - Create Gallery Model 
*/

const mongoose      = require('mongoose');
const Schema        = require('mongoose').Schema;
const gallerySchema = new Schema({
  name        : {type: String, required: true},
  serialNo    : {type: String, required: true},
  tags        : {type: Array},
  priority    : {type: Number, default: 5},
  artists     : {type: Array},
  groups      : {type: Array},
  pages       : {type: Number, required: true},
  read        : {type: Boolean, default: false},
  downloaded  : {type: Boolean, default: false},
  imageLink   : {type: String, required: true},
  parodies    : Array,
  category    : Array,
  rating      : Number,
  series      : String,
  ignore      : {type: Boolean, default: false},
  ignoreReason: String
});

const Gallery = mongoose.model('gallery', gallerySchema);

module.exports = Gallery;