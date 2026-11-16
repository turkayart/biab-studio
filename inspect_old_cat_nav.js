const fs = require('fs');
let html = fs.readFileSync('shop.html', 'utf8');

const navStart = html.indexOf('<div class="product-list-category-subnav-container');
const navEnd = html.indexOf('</div>', html.indexOf('nested-category-tree-wrapper')) + 100;

console.log(html.slice(navStart, navStart + 1500));
