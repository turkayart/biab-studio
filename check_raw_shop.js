const fs = require('fs');

if (fs.existsSync('shop_raw.html')) {
  const html = fs.readFileSync('shop_raw.html', 'utf8');
  console.log('shop_raw.html length:', html.length);
  const match = html.match(/class="product-list"[^>]*data-context="([^"]+)"/i);
  if (match) {
    const rawContext = match[1].replace(/&quot;/g, '"');
    try {
      const data = JSON.parse(rawContext);
      console.log('shop_raw.html has items:', data.items.length);
      data.items.forEach((it, i) => {
        console.log(`${i+1}. ${it.title} - $${it.price?.value} - img: ${it.images?.[0]?.assetUrl}`);
      });
      fs.writeFileSync('raw_shop_items.json', JSON.stringify(data.items, null, 2));
    } catch(e) {
      console.log('Error parsing shop_raw.html context:', e.message);
    }
  }
} else {
  console.log('shop_raw.html does not exist');
}
