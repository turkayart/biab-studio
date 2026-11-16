const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const matches = [...html.matchAll(/(?:Earrings|Necklaces|Rings|Bracelets)\s*→/g)];
console.log('Matches found:', matches.length);

const idx = html.indexOf('Earrings →');
if (idx !== -1) {
  console.log('Surrounding 800 chars:');
  console.log(html.slice(idx - 200, idx + 600));
}
