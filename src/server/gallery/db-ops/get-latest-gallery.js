/*
* Goal:
*   a. To return latest updated gallery in database
* 
* Output:
*   - gallery object for latest _id;
*/

import gallery from '../gallery-model';

export default () => gallery
    .find()
    .sort({_id: -1})
    .limit(1);