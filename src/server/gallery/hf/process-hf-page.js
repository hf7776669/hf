import cheerio from 'cheerio';


//import galleries from '../routes/gallery-routes';

/*
* 1. Latest gallery serialNo, imageLink
* 2. Last Page
* 3. Last Gallery on Page serialNo, imageLink
* 4. List of galleries
* */

/*
* Input: ???
* Output: ???
*/

export default (response) => {
  const $          = cheerio.load(response.data);
  let galleryNodes = [];
  let galleries    = [];
  $('.galleries_overview')
      .find('.item')
      .map((i, el) => galleryNodes.push(el));

  galleryNodes.map(galleryNode => {
    const name      = $(galleryNode).find('.caption').text().trim(),
          imageLink = 'https:' + $(galleryNode).find('img').attr('src'),
          link      = 'https://hentaifox.com' +
              $(galleryNode).find('a').attr('href'),
          serialNo  = $(galleryNode)
              .find('a')
              .attr('href')
              .substr('/gallery/'.length)
              .slice(0, -1)
              .padStart(6, 0);

    galleries.push({
      name, imageLink, serialNo, link
    });
  });

  return galleries;
}