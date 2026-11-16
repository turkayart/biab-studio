const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const idx = html.indexOf('biab-catalog-wrap');
console.log('Previous 1000 chars before biab-catalog-wrap:');
console.log(html.slice(Math.max(0, idx - 1000), idx));
