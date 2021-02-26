const { request, getTitleTag } = require('./helper');
const fs = require('fs');
const dataUrls = require('./dataUrls.json');
const dataTitles = require('./dataTitles.json');

// console.log(dataUrls[4].href);
// console.log(dataUrls.length);
// console.log(dataTitles[0].title);
// console.log(dataTitles.length);
// for (z in dataUrls) {
//   console.log(`original ${z}: ${dataUrls[z].href}`);
//   console.log(
//     `trimmed : ${dataUrls[z].href.substring(0, dataUrls[z].href.length - 1)}`
//   );
// }

describe('http://wwww.adpost.com/ - test links for 200 status code', () => {
  for (x in dataUrls) {
    test(`GET / ${dataUrls[x].href}`, async () => {
      const results = await request(dataUrls[x].href);
      const statusCode = results.res.statusCode;
      const headers = results.res.headers;

      expect(statusCode).toBe(200);

      const dom = results.dom;
      const titleTag = getTitleTag(dom);
      const titleInnerText = titleTag.children[0].data;

      expect(titleInnerText).toBe(dataTitles[x].title);

      const resultsErr = await request(
        dataUrls[x].href.substring(0, dataUrls[x].href.length - 1)
      );
      const statusCodeErr = resultsErr.res.statusCode;
      const headersErr = resultsErr.res.headers;

      expect(statusCodeErr).toBe(301);
    });
  }
  // test('GET /us', async () => {
  //   const results = await request('https://www.adpost.com/us');
  //   const statusCode = results.res.statusCode;
  //   const headers = results.res.headers;

  //   //expect redirect if no leading slash
  //   expect(statusCode).toBe(301);
  // }),
  // test('GET /us/', async () => {
  //   const results = await request('https://www.adpost.com/us/');
  //   const statusCode = results.res.statusCode;
  //   const headers = results.res.headers;

  //   expect(statusCode).toBe(200);

  //   const dom = results.dom;
  //   const titleTag = getTitleTag(dom);
  //   const titleInnerText = titleTag.children[0].data;

  //   expect(titleInnerText).toBe(
  //     'Adpost.com American Classifieds > USA > American Classifieds,free'
  //   );
  // }),
  // test('GET /ca', async () => {
  //   const results = await request('https://www.adpost.com/ca');
  //   const statusCode = results.res.statusCode;
  //   const headers = results.res.headers;

  //   //expect redirect if no leading slash
  //   expect(statusCode).toBe(301);
  // }),
  // test('GET /ca/', async () => {
  //   const results = await request('https://www.adpost.com/ca/');
  //   const statusCode = results.res.statusCode;
  //   const headers = results.res.headers;

  //   expect(statusCode).toBe(200);

  //   const dom = results.dom;
  //   const titleTag = getTitleTag(dom);
  //   const titleInnerText = titleTag.children[0].data;

  //   expect(titleInnerText).toBe(
  //     'Adpost.com Canada Classifieds > Canada > Canada Classifieds,free,canadian'
  //   );
  // }),
  // test('GET /uk', async () => {
  //   const results = await request('https://www.adpost.com/uk');
  //   const statusCode = results.res.statusCode;
  //   const headers = results.res.headers;

  //   //expect redirect if no leading slash
  //   expect(statusCode).toBe(301);
  // }),
  // test('GET /uk/', async () => {
  //   const results = await request('https://www.adpost.com/uk/');
  //   const statusCode = results.res.statusCode;
  //   const headers = results.res.headers;

  //   expect(statusCode).toBe(200);

  //   const dom = results.dom;
  //   const titleTag = getTitleTag(dom);
  //   const titleInnerText = titleTag.children[0].data;

  //   expect(titleInnerText).toBe(
  //     'Adpost.com UK Classifieds > UK > UK Classifieds,free,uk,british'
  //   );
  // });
});
