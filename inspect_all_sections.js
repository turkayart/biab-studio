const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find sections and their text blocks
const sectionBlocks = html.split('<section').slice(1);
sectionBlocks.forEach((sec, idx) => {
  const theme = (sec.match(/data-section-theme="([^"]+)"/) || [])[1] || 'none';
  const texts = sec.match(/<div class="sqs-html-content"[\s\S]*?<\/div>/gi) || [];
  const images = sec.match(/data-src="([^"]+)"/g) || [];
  console.log(`\n=== Section #${idx + 1} (theme: ${theme}) ===`);
  console.log('Images:', images);
  console.log('Text count:', texts.length);
  texts.forEach(t => console.log('  Text snippet:', t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100)));
});
