const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const idx = html.indexOf('class="product-list-item"');
if (idx !== -1) {
  console.log(html.slice(idx, idx + 1600));
}
