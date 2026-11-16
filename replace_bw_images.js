const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'shop.html',
  'about.html',
  'blog.html',
  'contact.html',
  'custom-work.html'
];

// Color replacements map for any B&W images:
const imageReplacements = {
  // Hero single image -> High-resolution full color fine jewelry photography
  'assets/images/biab_bw_luxury_hero.jpg': 'assets/images/pexels-the-glorious-studio-3584518-10792978.jpg',
  'assets/images/biab_hero_lifestyle.jpg': 'assets/images/pexels-ari-roberts-101154701-10828765.jpg',
  
  // Bridal section image -> Full natural color necklace/model
  'assets/images/pexels-84327456-8910334__1_.jpg': 'assets/images/biab_necklace_editorial.jpg',
  'assets/images/pexels-84327456-8910334_2B_25281_2529.jpg': 'assets/images/biab_necklace_editorial.jpg',
  
  // Stacks section B&W image -> Full color jewelry
  'assets/images/pexels-84327456-8910341.jpg': 'assets/images/biab_jewelry_flatlay.jpg',
  'assets/images/pexels-84327456-8910334.jpg': 'assets/images/biab_jewelry_flatlay.jpg',
  
  // Blog grid B&W images -> Full color images
  'assets/images/pexels-84327456-15923914.jpg': 'assets/images/pexels-jonathanborba-28900501.jpg',
  'assets/images/pexels-84327456-8872325.jpg': 'assets/images/biab_earrings_model.jpg',
  'assets/images/pexels-84327456-8872288.jpg': 'assets/images/pexels-ari-roberts-101154701-10828765.jpg'
};

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  for (const [bwImg, colorImg] of Object.entries(imageReplacements)) {
    content = content.split(bwImg).join(colorImg);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Replaced B&W images with COLOR images in ${file}`);
});
