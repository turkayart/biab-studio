const fs = require('fs');
const html = fs.readFileSync('shop.html', 'utf8');

const match = html.match(/class="product-list"[^>]*data-context="([^"]+)"/i);
if (match) {
  const jsonStr = match[1].replace(/&quot;/g, '"');
  try {
    const data = JSON.parse(jsonStr);
    console.log('Total items in data-context:', data.items?.length);
    data.items?.forEach((it, idx) => {
      console.log(`${idx + 1}. ${it.title} - $${it.price?.value}`);
    });
  } catch(e) {
    console.log('JSON parse error:', e.message);
  }
} else {
  console.log('No data-context match');
}
