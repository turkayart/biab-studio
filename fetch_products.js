const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'ocelot-walrus-2hef.squarespace.com',
  path: '/shop?password=demo',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

https.get(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Fetched shop, length:', data.length);
    const match = data.match(/class="product-list"[^>]*data-context="([^"]+)"/i);
    if (match) {
      const decoded = match[1].replace(/&quot;/g, '"');
      try {
        const json = JSON.parse(decoded);
        console.log('Parsed items successfully:', json.items.length);
        fs.writeFileSync('products.json', JSON.stringify(json.items, null, 2));
        json.items.forEach((it, idx) => {
          console.log(`${idx + 1}. ${it.title} | $${it.price?.value} | ${it.images?.[0]?.assetUrl}`);
        });
      } catch(e) {
        console.log('JSON parse error:', e.message);
      }
    }
  });
});
