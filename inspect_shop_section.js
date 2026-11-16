const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const navIdx = html.indexOf('product-list-category-subnav-container');
const secEnd = html.indexOf('</section>', navIdx);
console.log('HTML from nav to </section>:\n', html.slice(navIdx, secEnd + 10));
