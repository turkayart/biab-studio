const fs = require('fs');
const siteCss = fs.readFileSync('css/site.css', 'utf8');
const darkRule = siteCss.match(/\[data-section-theme="dark"\]\{[^}]+\}/);
if (darkRule) {
  console.log('DARK RULE:');
  const props = darkRule[0].replace('[data-section-theme="dark"]{', '').replace('}', '').split(';');
  props.filter(p => p.includes('button') || p.includes('background') || p.includes('color')).forEach(p => {
    console.log('  ', p);
  });
}
