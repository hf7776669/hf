import Gallery from '../gallery-model';

export default (galleries) => {
  console.log(`Bulk inserting ${galleries.length} galleries`);

  return Gallery
      .insertMany(galleries)
      .catch(err => console.log(`error in bulk insertion of galleries: `, err));
}
