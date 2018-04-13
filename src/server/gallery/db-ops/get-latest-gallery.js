/*
* Goal:
*   a. To return latest updated gallery in database
* 
* Output:
*   - gallery object for latest _id;
*   
* NOTABLE FEATURES
*   - Mongoose lean object to make the object return properties outside the schema
*   - Alternative was to stringify object and then parse again as JSON to access properties not inside schema.
*/

import gallery from '../gallery-model';

export default () => gallery
    .find()
    .sort({_id: -1})
    .limit(1)
    .lean();