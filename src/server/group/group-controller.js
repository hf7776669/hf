/*
* Goal 
*   a. Define controllers for artist routes
*   
* NOTABLE FEATURES:
*   1. ES6 Structuring and Arrow Functions for controllers   
*/

import Gallery from '../gallery/gallery-model';
import Artist from '../artist/artist-model';
import config from '../config';

const {pageSize} = config.pagination;

export const fetchGroup = async (req, res) => {
  const {groupName} = req.params;

  console.log(groupName);
  const galleries = await Gallery
      .find({groups: groupName});

  res.send(galleries.filter(gallery => !gallery.ignore));
};

export const ignoreGroup = async (req, res) => {
  const {groupName} = req.params;

  await Gallery.update({groups: groupName}, {$set: {ignore: true}})
  
  
  res.send(`${groupName} ignore successful`);
};

