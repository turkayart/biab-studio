const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const imageMap = JSON.parse(fs.readFileSync('image_map.json', 'utf8'));
const localFiles = fs.readdirSync('assets/images');

products.forEach((p, idx) => {
  const remoteUrl = p.images?.[0]?.assetUrl;
  let localPath = imageMap[remoteUrl];
  if (!localPath) {
    // try matching by filename
    const filename = remoteUrl?.split('/').pop().replace(/[^a-zA-Z0-9._-]/g, '_');
    if (localFiles.includes(filename)) {
      localPath = `assets/images/${filename}`;
    } else {
      localPath = remoteUrl; // fallback
    }
  }
  p.localImage = localPath;
  console.log(`${idx + 1}. ${p.title} -> ${p.localImage}`);
});

fs.writeFileSync('products_mapped.json', JSON.stringify(products, null, 2));
