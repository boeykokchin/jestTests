const https = require('https');
const parse = require('html-dom-parser');
async function request(url) {
  return await new Promise((resolve, reject) => {
    let data = '';
    const request = https.request(url, res => {
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve({
        res, dom: parse(data)
      }))
    })
    request.on("error", reject)
    request.end();
  })
}

function getHeadTag(dom) {
  return dom[0].next.next.children[0].next;
}

function getTitleTag(dom) {
  const headTag = getHeadTag(dom)
  let titleTag = headTag.children[0].next;
  let breaker = 100;
  while(titleTag.name !== 'title') {
    titleTag = titleTag.next
    if (breaker >= 0) breaker--;
  }
  return titleTag
}

test('helper.js', () => {})
module.exports = {
  request,
  getHeadTag,
  getTitleTag
}