/*
* Goal 
*   a. Create model for artist
*   
* NOTABLE FEATURES
*   1. Mongoose Schema and field definitions
*   2. Collection named defined (not plurified named as per Mongoose defaults)
*/

const mongoose     = require('mongoose');
const Schema       = require('mongoose').Schema;
const artistSchema = Schema({
  name        : {type: String, required: true},
  /*
  * track in case
  *   - incomplete series
  *   - really good artist like tsuya tsuya
  * Since there will be few tracked artists, default is false 
  */
  track       : {type: Boolean, required: true, default: false},
  read        : {type: Boolean, required: false, default: false},
  /*
  * ignore in case
  *   - bad tags [*con, guro, ...]
  *   - only parodies
  *   - bad art
  *   - bad story lines
  */
  ignore      : {type: Boolean, default: false},
  ignoreReason: {type: String},
  priority    : {type: Number, default: 5, required: true},
  observations: {type: String},
  /*
  * Contains gallerySerialNos as these are unique 
  */
  galleries   : {type: Array, required: true},
  cleaned     : {type: Boolean, default: false}
});

const Artist = mongoose.model('Artist', artistSchema, 'artists');

module.exports = Artist;

