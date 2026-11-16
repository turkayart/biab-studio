const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const productListIdx = html.indexOf('class="product-list"');
const after = html.slice(productListIdx, productListIdx + 15000);
// Find elements inside
const productLinks = [...after.matchAll(/<a[^>]+class="[^"]*grid-item-link[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)];
console.log('grid-item-link matches:', productLinks.length);

const allAs = [...after.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Links inside product list:', allAs.slice(0, 15).map(a => ({ href: a[1], text: a[2].replace(/<[^>]+>/g, '').trim() })));
