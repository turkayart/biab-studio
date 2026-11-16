const fs = require('fs');

const products = [
  {
    slug: 'dainty-moon-bracelet',
    title: 'Dainty Moon Bracelet',
    category: 'bracelets',
    categoryName: 'Bracelets',
    price: '$68.00',
    spec: '14K Solid Gold Vermeil',
    image: 'assets/images/pexels-sunsetoned-6536119.jpg'
  },
  {
    slug: 'dome-ring',
    title: 'Dome Ring',
    category: 'rings',
    categoryName: 'Rings',
    price: '$48.00',
    spec: '14K Solid Gold & Polished Finish',
    image: 'assets/images/pexels-jonathanborba-28900501.jpg'
  },
  {
    slug: 'silver-gold-bangle-stack',
    title: 'Silver/Gold Bangle Stack',
    category: 'bracelets stack-collection',
    categoryName: 'Bangle Stack',
    price: '$78.00',
    spec: '925 Silver & 14K Gold Accent',
    image: 'assets/images/pexels-84327456-15923914.jpg'
  },
  {
    slug: 'link-necklace',
    title: 'Link Necklace',
    category: 'necklaces',
    categoryName: 'Necklaces',
    price: '$88.00',
    spec: '925 Sterling Silver & Classic Links',
    image: 'assets/images/pexels-natalie-bond-320378-21787517.jpg'
  },
  {
    slug: 'medium-hoop',
    title: 'Medium Hoop',
    category: 'earrings',
    categoryName: 'Earrings',
    price: '$78.00',
    spec: '14K Gold Vermeil Lightweight',
    image: 'assets/images/pexels-mlkbnl-12194345.jpg'
  },
  {
    slug: 'irregular-pearl-necklace',
    title: 'Irregular Pearl Necklace',
    category: 'necklaces',
    categoryName: 'Necklaces',
    price: '$148.00',
    spec: 'Natural Freshwater Baroque Pearls',
    image: 'assets/images/pexels-84327456-8910334_2B_25281_2529.jpg'
  },
  {
    slug: 'ring-stack',
    title: 'Ring Stack',
    category: 'rings stack-collection',
    categoryName: 'Ring Stack',
    price: '$58.00',
    spec: 'Set of 3 Textured Minimal Bands',
    image: 'assets/images/pexels-84327456-8872288.jpg'
  },
  {
    slug: 'charm-pendant-stack',
    title: 'Charm Pendant Stack',
    category: 'necklaces stack-collection',
    categoryName: 'Pendant Stack',
    price: '$128.00',
    spec: '14K Gold Heirloom Charms',
    image: 'assets/images/pexels-eugenia-remark-5767088-23495720.jpg'
  },
  {
    slug: 'textured-hoops',
    title: 'Textured Hoops',
    category: 'earrings',
    categoryName: 'Earrings',
    price: '$78.00',
    spec: 'Hand-Hammered 14K Gold Texture',
    image: 'assets/images/pexels-mlkbnl-12168884.jpg'
  }
];

const catalogHtml = `
<div class="biab-catalog-wrap" id="biabCatalogWrap">
  <!-- Section Title & Subtitle -->
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="font-family: var(--font-serif); font-size: 52px; font-weight: 400; margin: 0 0 12px; color: #191919;">Curated Collection</h1>
    <p style="font-family: var(--font-sans); font-size: 12px; letter-spacing: 2.2px; text-transform: uppercase; color: #7D7871; margin: 0;">SELECT A PIECE TO PURCHASE DIRECTLY FROM OUR ONLINE STORE</p>
  </div>

  <!-- Category Filter Tabs -->
  <div class="biab-category-nav">
    <button class="biab-cat-tab active" data-filter="all">ALL PIECES</button>
    <button class="biab-cat-tab" data-filter="necklaces">NECKLACES</button>
    <button class="biab-cat-tab" data-filter="earrings">EARRINGS</button>
    <button class="biab-cat-tab" data-filter="rings">RINGS</button>
    <button class="biab-cat-tab" data-filter="bracelets">BRACELETS</button>
    <button class="biab-cat-tab" data-filter="stack-collection">STACK COLLECTION</button>
  </div>

  <!-- Products Grid -->
  <div class="biab-products-grid" id="biabProductsGrid">
    ${products.map(p => `
      <div class="biab-product-card" data-category="${p.category}" data-slug="${p.slug}">
        <div class="biab-product-img-box">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <span class="biab-product-badge">${p.categoryName}</span>
        </div>
        <div class="biab-product-meta">
          <h3 class="biab-product-title">${p.title}</h3>
          <p class="biab-product-spec">${p.spec}</p>
          <div class="biab-product-price">${p.price}</div>
          <div class="biab-product-actions">
            <a href="https://yourstore.com/products/${p.slug}" target="_blank" class="btn-buy-external" data-product-slug="${p.slug}">
              Purchase Online ↗
            </a>
            <button class="btn-product-bespoke" onclick="openBespokeModal()">
              Custom Request →
            </button>
          </div>
        </div>
      </div>
    `).join('\n')}
  </div>
</div>
`;

let html = fs.readFileSync('shop.html', 'utf8');

// Replace the entire product-list-container in shop.html
const startIdx = html.indexOf('<div class="product-list-container">');
const endIdx = html.indexOf('</section>', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  html = html.slice(0, startIdx) + catalogHtml + html.slice(endIdx);
  console.log('Successfully replaced product-list-container in shop.html!');
} else {
  console.log('Could not locate product-list-container');
}

// Hide the redundant empty squarespace category sidebar on shop.html
html = html.replace(/<div class="product-list-category-subnav-container">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, '');
// Also hide filters drawer open button
html = html.replace(/<div class="product-list-filters-drawer-open-button-container[\s\S]*?<\/div>/gi, '');

fs.writeFileSync('shop.html', html, 'utf8');
console.log('shop.html updated.');
