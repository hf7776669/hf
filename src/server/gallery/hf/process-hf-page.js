/*
* Goal: 
*   a. Get galleries from landing page of hf
*   
* Input
*   - Landing page fetched by axios
* Output
*   - Array of galleries on landing page.
*   
* Refactor Needed
*  - Return only latest gallery number instead of array of galleries as they
 *  are no longer needed
*/

import cheerio from 'cheerio' ;

export default (response) => {
  const $          = cheerio.load(response);
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
          _id       = $(galleryNode)
              .find('a')
              .attr('href')
              .substr('/gallery/'.length)
              .slice(0, -1)
              .padStart(6, 0);

    galleries.push({
      name, imageLink, _id, link
    });
  });

  return galleries;
}