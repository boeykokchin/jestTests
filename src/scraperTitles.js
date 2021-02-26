const got = require('got');
const cheerio = require('cheerio');
const fs = require('fs');
const dataUrls = require('./dataUrls.json');

const extractTitles = async () => {
  try {
    const titles = [];
    for (x in dataUrls) {
      const response = await got(dataUrls[x].href);
      const html = response.body;
      const $ = cheerio.load(html);
      const titleObject = $('title');
      titles.push({
        href: dataUrls[x].href,
        title: titleObject.text(),
      });
    }
    // console.log(`dataTitles length: ${titles.length}`);
    // console.log(`dataUrls length: ${dataUrls.length}`);
    const data = JSON.stringify(titles);
    const filename = 'dataTitles.json';
    fs.writeFileSync(filename, data);
  } catch (error) {
    console.log(error);
  }
};

extractTitles();
