/*
* Input: ???
* Output: ???
*/

import gallery from '../gallery-model';

export default () => gallery
    .find({})
    .sort({serialNo: -1})
    .limit(1);