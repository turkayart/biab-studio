const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const match = html.match(/data-context="([^"]*)"/i);
if (match) {
  fs.writeFileSync('shop_data_context.txt', match[1]);
  console.log('Saved shop_data_context.txt, length:', match[1].length);
}
