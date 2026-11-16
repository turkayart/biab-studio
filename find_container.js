const fs = require('fs');

let html = fs.readFileSync('shop.html', 'utf8');

const containerIdx = html.indexOf('product-list-container');
console.log('product-list-container index:', containerIdx);

const contentIdx = html.indexOf('id="page"');
console.log('id="page" index:', contentIdx);

const mainIdx = html.indexOf('<main');
console.log('<main index:', mainIdx);

if (containerIdx !== -1) {
  console.log('Surrounding 600 chars:');
  console.log(html.slice(containerIdx - 100, containerIdx + 600));
}
