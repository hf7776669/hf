/*
* input: gets gallery link
* output: returns object containing all gallery details
*/

import axios from 'axios';
import Promise from 'bluebird';
import moment from 'moment';
import parseGalleryDetails from './parse-gallery-details';

const now = () => moment().format('hh:mm:ss');


const getGallery = (galleryLink) =>
    Promise
        .delay(Math.random() * 10000)
        .then(() => console.log(
            `${now()}: fetching gallery: ${galleryLink}`))
        .then(_ => axios.get(galleryLink))
        .catch(error => {
          console.log('Error in fetching gallery: ', galleryLink);
          return getGallery(galleryLink);
        });


export default (galleryLink) =>
    getGallery(galleryLink)
        .catch(() => getGallery(galleryLink))
        .then(result => result.data)
        .then(parseGalleryDetails)
      
