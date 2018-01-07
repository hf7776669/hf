/* input: html data output by axios output: object containing gallery data */
import cheerio from 'cheerio';

export default (page) => {
  const $ = cheerio.load(page);

//   parse tags, artists, groups, pages, category

  const artists     = $('span:contains(\'Artists: \')')
            .find('span')
            .get()
            .map(el => el.children[0].data),
        group       = $('span:contains(\'Groups: \')')
            .find('span')
            .get()
            .map(el => el.children[0].data),
        imageLink   = $('.cover').find('img').attr('src').slice(2),

        pages       = ~~$('span.pages').text().slice('Pages: '.length),
        parodies    = $('span:contains(\'Parodies: \')')
            .find('span')
            .get()
            .map(el => el.children[0].data),
        rating      = ~~$('span:contains(\'Rating: \')')
            .find('span.average')
            .get()
            .map(el => ~~el.children[0].data.charAt(1))
            .join(''),
        artistLinks = $('span:contains(\'Artists: \')')
            .find('a')
            .get()
            .map(el => `https://hentaifox.com${el.attribs.href}`),
        tags        = $('span:contains(\'Tags: \')')
            .find('span')
            .get()
            .map(el => el.children[0].data),
        category    = $('span:contains(\'Category: \')')
            .find('a')
            .get()
            .map(el => el.children[0].data);

  return {
    artists, group, imageLink, pages, parodies,
    rating, artistLinks, tags, category
  };
}