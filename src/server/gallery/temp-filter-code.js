import Gallery from '../../../../../Work/personal-projects/hf/src/server/gallery/gallery-model';

const fetchGalleries = (req, res) => {
  console.log(`Getting galleries`);
  let {page = 1, cleaned} = req.query;

  const searchObject = {ignore: {$ne: true}};

  if (cleaned === 'hide') {
    searchObject.cleaned = false;
    console.log(`Not fetching cleaned artists`);
  }

  return Gallery
      .find(searchObject)
      .sort({serialNo: -1})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .then((galleries) => {
        if (cleaned === 'hide') {
          const galleryPromises = [];

          galleries.map((gallery) => {
            const {artists} = gallery;
            artists.map(artist => Artist.findOne({name: artist.name}).then(artist => artist.ignore));
          });

        }
        return galleries;
      })
      .then((results) => res.send(results))
      .catch(err => {
        console.log(`Error while fetching galleries from mongodb\n`, err);
        return new Error(err);
      });
};