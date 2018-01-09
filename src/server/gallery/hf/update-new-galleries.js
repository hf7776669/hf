/*
* Goal - fetch new galleries from hf, update artist collections and return
* latest galleries to client
*/

import axios from 'axios';
import Promise from 'bluebird';
import processHFPage from './process-hf-page';
import getLatestGalleryDB from '../db-ops/get-latest-gallery';
import fetchGalleryDetails from './fetch-gallery-details';
import bulkInsertGalleries from '../db-ops/bulk-insert-galleries';
import updateArtist from '../../artist/db-ops/artist-add-gallery';

let lastFetchedGalleryDB;

const updateNewGalleries = () => { 
  console.log('Processing new galleries');
  return getLatestGalleryDB()
      .then(([{serialNo}]) => {lastFetchedGalleryDB = serialNo;})
      .then(_ => axios
          .get(`https://hentaifox.com/`, {
            Connection                 : 'keep-alive',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent'               : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
            Accept                     : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            DNT                        : 1,
            'Accept-Encoding'          : 'gzip, deflate, sdch, br',
            'Accept-Language'          : 'en-US,en;q=0.8'
          }))
      .then(page => processHFPage(page))
      .then(galleries => {
        const latestGallery = galleries[0].serialNo;
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
      .then(completeGalleries => {

        const promiseArtistUpdate = Promise.mapSeries(completeGalleries,
            gallery => updateArtist(gallery));

        return Promise.all([
          bulkInsertGalleries(completeGalleries),
          promiseArtistUpdate
        ]);
      })
      .catch(err => console.error('err: ', err));
};

export default updateNewGalleries;