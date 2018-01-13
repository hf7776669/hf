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

const getGallery = (gallerySerialNo, delay = 2000) =>
    Promise
        .delay(Math.random() * delay)
        .then(() => console.log(
            `${now}: fetching gallery: ${gallerySerialNo}`))
        .then(
            _ => axios.get(`https://hentaifox.com/gallery/${gallerySerialNo}/`))
        .catch(error => {
          console.log('Error in fetching gallery: ', gallerySerialNo);
          if (delay > 1000 * 60 * 30) {
            throw new Error(`Error in fetching gallery: ${gallerySerialNo}`,
                error);
          } else {
            return getGallery(gallerySerialNo, delay * 2);
          }
        });


export default (gallerySerialNo) =>
    getGallery(gallerySerialNo)

        .then(({data}) => parseGalleryDetails(data))
        .then(galleryDetails => ({
          serialNo: gallerySerialNo,
          ...galleryDetails
        }))
        .catch(err => {
              //TODO: Ben Nadel rethrow JS error refactor
              throw new Error(
                  `Could not fetch gallery ${gallerySerialNo} after repeated tries`,
                  err);
            }
        )
