const fs = require('fs');

let html = fs.readFileSync('shop.html', 'utf8');

// Find all product-list-item blocks
const items = [...html.matchAll(/<div[^>]*class="product-list-item"[^>]*>([\s\S]*?)<\/section>\s*<\/a>\s*<\/div>/gi)];
console.log('Total product items found in shop.html:', items.length);

items.forEach((it, idx) => {
  const titleMatch = it[1].match(/class="product-list-item-title">\s*([\s\S]*?)\s*<\/div>/i);
  const priceMatch = it[1].match(/class="product-list-item-price">\s*([\s\S]*?)\s*<\/div>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'Unknown';
  const price = priceMatch ? priceMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  console.log(`${idx + 1}. ${title} | ${price}`);
});
