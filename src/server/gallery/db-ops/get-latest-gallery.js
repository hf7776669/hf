/*
* Goal:
*   a. To return latest updated gallery in database
* 
* Output:
*   - gallery object for latest serialNo;
*/

import gallery from '../gallery-model';

export default () => gallery
    .find()
    .sort({serialNo: -1})
    .limit(1);