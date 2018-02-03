/*
* Goal - fetch new galleries from hf, update artist collections 
* 
* NOTABLE FEATURES
*   - axios request headers
*   - batches of 20 galleries updated at at time
*   - bluebird Promise.mapSeries for sequential fetching of gallery details 
*     - mapSeries takes an array which is mapped to a promise returning
*       function which is to be executed sequentially over each value
*/

import axios from 'axios';
import Promise from 'bluebird';
import processHFPage from './process-hf-page';
import getLatestGalleryDB from '../db-ops/get-latest-gallery';
import fetchGalleryDetails from './fetch-gallery-details';
import bulkInsertGalleries from '../db-ops/bulk-insert-galleries';
import updateArtist from '../../artist/db-ops/artist-add-gallery';
import config from '../../config';

const updateNewGalleries = async () => {
  console.log('Processing new galleries');

  let [{_id: lastFetchedSerial = '000000'} = {}] = await getLatestGalleryDB();

  lastFetchedSerial = parseInt(lastFetchedSerial);

  console.log('Last Gallery fetched: ', lastFetchedSerial);
  const landingPage = await axios.get(config.hfAddress, config.requestHeaders);

  let [{_id: newestGallerySerial}] = processHFPage(landingPage);
  newestGallerySerial              = parseInt(newestGallerySerial);

  console.log('Newest Gallery from site: ', newestGallerySerial);

  await saveBatch({lastFetchedSerial, newestGallerySerial});

  return `Updated ${newestGallerySerial - lastFetchedSerial} galleries`;
};

export default updateNewGalleries;

async function saveBatch({lastFetchedSerial, newestGallerySerial}) {
  const batchSize = 20;
  if (lastFetchedSerial < newestGallerySerial) {

    let batchLastSerial =
            Math.min(newestGallerySerial, lastFetchedSerial + batchSize);

    const galleriesToFetch = [];
    for (let i = ++lastFetchedSerial; i <= batchLastSerial; i++) {
      galleriesToFetch.push((i + '').padStart(6, '0'));
    }

    const fetchedGalleries = await Promise
        .mapSeries(
            galleriesToFetch,
            gallery => fetchGalleryDetails(gallery)
        );

    await Promise.all([
      bulkInsertGalleries(fetchedGalleries),
      updateArtists(fetchedGalleries)
    ]);

    if (batchLastSerial < newestGallerySerial) {
      setTimeout(
          () => saveBatch({
            lastFetchedSerial: batchLastSerial, newestGallerySerial
          }),
          (Math.random() + 1) + 15000
      );
    }
  }
}

function updateArtists(fetchedGalleries) {
  const artistUpdatePromises = [];
  fetchedGalleries.map(gallery =>
      artistUpdatePromises.push(updateArtist(gallery)));
  return artistUpdatePromises;
}
