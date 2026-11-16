const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const titles = [...html.matchAll(/"title":\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Unique titles found:', [...new Set(titles)]);

const prices = [...html.matchAll(/"value":\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Unique prices found:', [...new Set(prices)]);
