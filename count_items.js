const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');
const count = (html.match(/class="product-list-item"/g) || []).length;
console.log('product-list-item count in shop.html:', count);
