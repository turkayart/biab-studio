const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const matches = html.match(/assets\/images\/[a-zA-Z0-9_\-\.]+\.(?:jpg|jpeg|png|gif|webp)/g) || [];
console.log('Unique images in index.html:', [...new Set(matches)]);
