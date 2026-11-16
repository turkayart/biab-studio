const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const matches = [...html.matchAll(/<div class="grid-item[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi)];
console.log('Matches:', matches.length);
if (matches.length > 0) {
  console.log('Sample card HTML:');
  console.log(matches[0][0].slice(0, 1000));
} else {
  // Check for product items
  const productItems = [...html.matchAll(/class="[^"]*(?:product|product-item|grid-product)[^"]*"/gi)];
  console.log('Product-related classes:', productItems.slice(0, 10).map(p => p[0]));
}
