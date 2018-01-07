/*
* Input: ???
* Output: ???
*/

const addNewGalleries = (galleries, latestDBGallery) => {
  console.log(`galleries: `, galleries);
  const lastGalleryOnPage = galleries.slice(-1)[0].serialNo;
  const fetchNextPage     = lastGalleryOnPage > latestDBGallery;
  console.log(`fetchNextPage`, fetchNextPage);

  const newGalleries = fetchNextPage ? galleries : galleries.filter(
      gallery => gallery.serialNo > latestDBGallery);


//  newGalleries.map(fetchGalleryDetails)
//      .then((gallery) => {
//        /*
//        * 1. Save gallery document
//        * 2. Update artist document
//        * 3. Update hfStats
//        * */
//      });

  return galleries;
};

export default addNewGalleries;