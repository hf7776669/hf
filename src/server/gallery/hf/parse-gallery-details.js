/* input: html data output by axios output: object containing gallery data */
import cheerio from 'cheerio';

export default (page) => {
  const $ = cheerio.load(page);

  const name      = $('.bcenter')
            .find('h1')
            .html(),
        parodies  = $('span:contains(\'Parodies: \')')
            .find('span')
            .get()
            .map(el => el.children[0].data),
        tags      = $('span:contains(\'Tags: \')')
            .find('span')
            .get()
            .map(el => el.children[0].data),
        artists   = $('span:contains(\'Artists: \')')
            .find('span')
            .get()
            .map(el => el.children[0].data),
        groups    = $('span:contains(\'Groups: \')')
            .find('span')
            .get()
            .map(el => el.children[0].data),
        category  = $('span:contains(\'Category: \')')
            .find('a')
            .get()
            .map(el => el.children[0].data),
        pages     = ~~$('span.pages').text().slice('Pages: '.length),
        rating    = ~~$('span:contains(\'Rating: \')')
            .find('span.average')
            .get()
            .map(el => ~~el.children[0].data.charAt(1))
            .join(''),
        imageLink = $('.cover').find('img').attr('src').slice(2);

  return {
    name, parodies, tags, artists, groups, category, pages,
    rating, imageLink
  };
}