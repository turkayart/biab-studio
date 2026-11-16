const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const first = html.indexOf('biab-catalog-wrap');
const second = html.indexOf('biab-catalog-wrap', first + 50);
console.log('Second biab-catalog-wrap index:', second);

if (second !== -1) {
  console.log('Previous 1200 chars:');
  console.log(html.slice(Math.max(0, second - 1200), second));
}
