/*
* Goal - fetch new galleries from hf, update artist collections and return
* latest galleries to client
*/

import moment from 'moment';
import axios from 'axios';
import Promise from 'bluebird';
import processHFPage from './process-hf-page';
import getLatestGallery from '../db-ops/get-latest-gallery';
import fetchGalleryDetails from './fetch-gallery-details';
import bulkInsertGalleries from '../db-ops/bulk-insert-galleries';
import updateArtist from '../../artist/db-ops/artist-add-gallery';

let latestFetchedGallery;
const newGalleries = [];

const now                = () => moment().format('hh:mm:ss');
const updateNewGalleries = () => {
  console.log('Processing new galleries');
  return Promise.resolve()
      .then(getLatestGallery)
      .then(([{serialNo}]) => {latestFetchedGallery = serialNo;})
      //      .then(() => {latestFetchedGallery = '048145';})
      .then(function fetchPage(page = 1) {

        console.log(now() + `: To fetch hentaifox page ${page}`);
        return Promise
            .delay(Math.random() * 5000)
            .then(() => {
              console.log(now() + `: fetching page ${page}`);
              return axios
                  .get(`https://hentaifox.com/pag/${page}/`, {
                    Connection                 : 'keep-alive',
                    'Upgrade-Insecure-Requests': 1,
                    'User-Agent'               : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
                    Accept                     : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    DNT                        : 1,
                    'Accept-Encoding'          : 'gzip, deflate, sdch, br',
                    'Accept-Language'          : 'en-US,en;q=0.8'
                  });
            })
            .then(page => processHFPage(page))
            .then(galleries => {
              newGalleries.push(...galleries);
              const lastGalleryOnPage = galleries[galleries.length -
              1].serialNo;
              if (lastGalleryOnPage < latestFetchedGallery) {
                return newGalleries;
              }
              return fetchPage(page + 1);
            });
      })
      .then(_ => newGalleries.filter(
          gallery => gallery.serialNo > latestFetchedGallery))
      .then(galleries =>
          Promise.mapSeries(galleries,
              gallery => fetchGalleryDetails(gallery.link).then(
                  newDetails => {return {...gallery, ...newDetails};}
              ))
      )
      .catch(err => console.log(`Error in fetching gallery details`, err))
      .then(completeGalleries => {
        console.log('***CHECK FROM HERE***');
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