const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const sections = html.match(/<section[\s\S]*?>/gi) || [];
const pageSections = sections.filter(s => s.includes('page-section'));
console.log('Total page sections:', pageSections.length);
pageSections.forEach((s, idx) => {
  const theme = s.match(/data-section-theme="([^"]+)"/);
  console.log(`Section #${idx + 1}: theme = ${theme ? theme[1] : 'none'}`);
});
