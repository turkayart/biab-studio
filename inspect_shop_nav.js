const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const navIdx = html.indexOf('product-list-category-subnav-container');
if (navIdx !== -1) {
  console.log(html.slice(navIdx, navIdx + 1500));
}
