/*
* Goal - fetch new galleries from hf, update artist collections and return
* latest galleries to client
* 
* NOTABLE FEATURES
*   - axios request headers
*   - bluebird Promise.mapSeries for sequential execution of promises 
*     - mapSeries takes an array which is mapped to a promise returning
 *     function which is to be executed sequentially over each value
*  
*  REFACTOR NEEDED
*   - processHFPage should return only a serial number of latest hf gallery
*     - no need for destructuring to get serial number of first array object 
*     - rename processHFPage suitably
*/

import axios from 'axios';
import Promise from 'bluebird';
import processHFPage from './process-hf-page';
import getLatestGalleryDB from '../db-ops/get-latest-gallery';
import fetchGalleryDetails from './fetch-gallery-details';
import bulkInsertGalleries from '../db-ops/bulk-insert-galleries';
import updateArtist from '../../artist/db-ops/artist-add-gallery';
import config from '../../config';

let lastFetchedGalleryDB;

const updateNewGalleries = () => {
  console.log('Processing new galleries');
  return getLatestGalleryDB()
      .then(([{serialNo}]) => {lastFetchedGalleryDB = serialNo;})
      .then(_ => axios.get(config.hfAddress, config.requestHeaders))
      .then(page => processHFPage(page))
      //      Latest Gallery is first Array object's serial Number
      .then(([{serialNo: latestGallery}]) => {
        // const latestGallery = galleries[0].serialNo;
        console.log(
            `Fetching Galleries ${lastFetchedGalleryDB} - ${latestGallery}`);

        /*
        * Required because mapSeries API requires an array of values which
        * are individually passed to a function returning promise for that value  
        */
        const galleriesToFetch = [];
        if (latestGallery > lastFetchedGalleryDB) {
          let i = ++lastFetchedGalleryDB, ii = latestGallery;
          for (; i <= ii; i++) {
            galleriesToFetch.push((i + '').padStart(6, 0));
          }
        }
        return galleriesToFetch;
      })
      .then(galleries =>
          Promise.mapSeries(
              galleries,
              gallery => fetchGalleryDetails(gallery)
          )
      )
      .catch(err => console.log(`Error in fetching gallery details`, err))
      .then(updateDatabase)
      .catch(err => console.error('err: ', err));
};

export default updateNewGalleries;

function updateDatabase(completeGalleries) {
  const promiseArtistUpdate = Promise.mapSeries(completeGalleries,
      gallery => updateArtist(gallery));

  return Promise.all([
    bulkInsertGalleries(completeGalleries),
    promiseArtistUpdate
  ]);
}