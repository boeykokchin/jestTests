const got = require('got');
const cheerio = require('cheerio');
const fs = require('fs');

const extractLinks = async (url) => {
  try {
    const response = await got(url);
    const html = response.body;
    const $ = cheerio.load(html);
    const linkObjects = $('a');
    const links = [];
    linkObjects.each((index, element) => {
      links.push({
        text: $(element).text(),
        href: $(element).attr('href'),
      });
    });

    // console.log(links);
    const data = JSON.stringify(links);
    // console.log(data);
    const filename = 'dataUrls.json';
    fs.writeFileSync(filename, data);
  } catch (error) {
    console.log(error.response.body);
  }
};

const url = 'https://www.adpost.com/';
extractLinks(url);
