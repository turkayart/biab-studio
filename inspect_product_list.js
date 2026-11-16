const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const listIdx = html.indexOf('class="product-list');
if (listIdx !== -1) {
  console.log(html.slice(listIdx, listIdx + 2500));
}
