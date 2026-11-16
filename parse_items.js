const fs = require('fs');

const raw = fs.readFileSync('shop_data_context.txt', 'utf8');

// Use a decoder for HTML entities
function htmlDecode(input) {
  return input
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'");
}

const decoded = htmlDecode(raw);

// Find items array
const itemsMatch = decoded.match(/"items":\s*(\[[\s\S]*?\])\s*,\s*"nestedCategoryContext"/);
if (itemsMatch) {
  try {
    const items = JSON.parse(itemsMatch[1]);
    console.log('Successfully parsed items:', items.length);
    items.forEach((it, i) => {
      console.log(`${i+1}. ${it.title} | Price: $${it.price?.value} | Image: ${it.images?.[0]?.assetUrl}`);
    });
    fs.writeFileSync('parsed_products.json', JSON.stringify(items, null, 2));
  } catch(e) {
    console.log('Items parse error:', e.message);
    // Find all titles in decoded
    const titles = [...decoded.matchAll(/"title":\s*"([^"]+)"/g)].map(m => m[1]);
    console.log('Titles found:', titles);
  }
} else {
  console.log('Could not match items array');
}
