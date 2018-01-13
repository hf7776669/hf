/*
* Goal
*   a. To bulk insert galleries fetched from hf
*   
* NOTABLE FEATURES
*   1. Mongoose insertMany
*     - Creates schema compliant documents
*     - Type casting is implicity (ex. '04455' into 4455) no errors returned
*     - Returns first error 
*/

import Gallery from '../gallery-model';

export default (galleries) => {
  console.log(`Bulk inserting ${galleries.length} galleries`);

  return Gallery
      .insertMany(galleries)
      .catch(err => console.log(`error in bulk insertion of galleries: `, err));
}
