const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const themes = html.match(/data-section-theme="[^"]+"/g);
console.log('Unique themes:', [...new Set(themes)]);

// Also check where "dark" theme CSS is defined
const siteCss = fs.readFileSync('css/site.css', 'utf8');
const darkRules = siteCss.match(/\[data-section-theme="[^"]*"\][^{]*\{[^}]+\}/g);
console.log('Number of section theme rules in site.css:', darkRules ? darkRules.length : 0);
if (darkRules) {
  darkRules.slice(0, 5).forEach(r => console.log(r.slice(0, 150)));
}
