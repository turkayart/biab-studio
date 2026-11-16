const fs = require('fs');
const path = require('path');

const customCssContent = fs.readFileSync(path.join(__dirname, 'css/custom.css'), 'utf8');

const overrideStyle = `
<style id="biab-fresh-bw-override">
${customCssContent}
</style>
`;

const htmlFiles = [
  'index.html',
  'shop.html',
  'about.html',
  'blog.html',
  'contact.html',
  'custom-work.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // In index.html, ensure the first hero image uses biab_bw_luxury_hero.jpg
  if (file === 'index.html') {
    content = content.replace(/assets\/images\/biab_hand_rings_hero\.jpg/g, 'assets/images/biab_bw_luxury_hero.jpg');
  }

  // Update custom.css query version
  content = content.replace(/href="css\/custom\.css(?:\?[^"]*)?"/g, 'href="css/custom.css?v=luxury_center_v3"');

  // Remove any previous biab-fresh-bw-override
  content = content.replace(/<style id="biab-fresh-bw-override">[\s\S]*?<\/style>/g, '');

  // Inject right before </head>
  if (content.includes('</head>')) {
    content = content.replace('</head>', `${overrideStyle}\n</head>`);
  } else {
    content = overrideStyle + content;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file} successfully`);
});
