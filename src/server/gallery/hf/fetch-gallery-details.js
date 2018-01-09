/*
* input: gets gallery link
* output: returns object containing all gallery details
*/

import axios from 'axios';
import Promise from 'bluebird';
import moment from 'moment';
import parseGalleryDetails from './parse-gallery-details';

const now = () => moment().format('hh:mm:ss');


const getGallery = (gallerySerialNo, delay = 5000) =>
    Promise
        .delay(Math.random() * delay)
        .then(() => console.log(
            `${now()}: fetching gallery: ${gallerySerialNo}`))
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
