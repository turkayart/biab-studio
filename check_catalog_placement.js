const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const idx = html.indexOf('biab-catalog-wrap');
console.log('biab-catalog-wrap index:', idx);
if (idx !== -1) {
  console.log('Surrounding HTML:');
  console.log(html.slice(Math.max(0, idx - 200), idx + 400));
}
