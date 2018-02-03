/*
* Goal:
*   - Return gallery details parsed from hf gallery page
* 
* input: gallery serial number
* output: complete gallery object compliant with Gallery schema
* 
* NOTABLE FEATURES
*   - Randomly Delayed fetching for each gallery
*   - Delay range doubled for each failure in fetching gallery details
*   - Returns error in case fetching is not successful for more than half an
*   hour
*/

import axios from 'axios';
import Promise from 'bluebird';
import moment from 'moment';
import parseGalleryDetails from './parse-gallery-details';

const now = moment().format('hh:mm:ss');

const getGallery = (gallery_id, delay = 2000) =>
    Promise
        .delay(Math.random() * delay)
        .then(() => console.log(
            `${now}: fetching gallery: ${gallery_id}`))
        .then(
            _ => axios.get(`https://hentaifox.com/gallery/${gallery_id}/`))
        .catch(error => {
          console.log('Error in fetching gallery: ', gallery_id);
          if (delay > 1000 * 60 * 30) {
            throw new Error(`Error in fetching gallery: ${gallery_id}`,
                error);
          } else {
            return getGallery(gallery_id, delay * 2);
          }
        });


export default (gallery_id) =>
    getGallery(gallery_id)

        .then(({data}) => parseGalleryDetails(data))
        .then(galleryDetails => ({
          _id: gallery_id,
          ...galleryDetails
        }))
        .catch(err => {
              //TODO: Ben Nadel rethrow JS error refactor
              throw new Error(
                  `Could not fetch gallery ${gallery_id} after repeated tries`,
                  err);
            }
        )
