const fs = require('fs');
const path = require('path');

// 1. Define Product Data with categories & slugs for external routing
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

// 2. Build custom clean product grid HTML for shop.html
function buildProductGridHtml() {
  return `
    <div class="biab-catalog-wrap">
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
                  Custom Request
                </button>
              </div>
            </div>
          </div>
        `).join('\n')}
      </div>
    </div>
  `;
}

// 3. Product Catalog Styles
const catalogStyles = `
<style id="biab-catalog-styles">
  .biab-catalog-wrap {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 0 80px;
  }
  .biab-category-nav {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 48px;
    padding: 0 16px;
  }
  .biab-cat-tab {
    background: transparent;
    border: 1px solid #E0DAD0;
    color: #444;
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .biab-cat-tab:hover {
    border-color: #191919;
    color: #191919;
  }
  .biab-cat-tab.active {
    background: #191919;
    color: #FAF8F5;
    border-color: #191919;
  }
  .biab-products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 36px 30px;
    padding: 0 24px;
  }
  .biab-product-card {
    background: #FFFFFF;
    border: 1px solid #ECE7E1;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.25s ease;
  }
  .biab-product-card:hover {
    transform: translateY(-5px);
    border-color: #D4C9BC;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
  }
  .biab-product-card.hidden {
    display: none !important;
  }
  .biab-product-img-box {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    background: #F4EFEA;
    overflow: hidden;
  }
  .biab-product-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block !important;
    opacity: 1 !important;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .biab-product-card:hover .biab-product-img-box img {
    transform: scale(1.06);
  }
  .biab-product-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(250, 248, 245, 0.92);
    backdrop-filter: blur(6px);
    padding: 4px 10px;
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: #6B6863;
    font-weight: 600;
    border-radius: 2px;
  }
  .biab-product-meta {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
  }
  .biab-product-title {
    font-family: var(--font-serif);
    font-size: 23px;
    font-weight: 400;
    color: #191919;
    margin: 0 0 6px;
    line-height: 1.25;
  }
  .biab-product-spec {
    font-family: var(--font-sans);
    font-size: 12px;
    color: #7D7871;
    margin: 0 0 12px;
  }
  .biab-product-price {
    font-family: var(--font-sans);
    font-size: 16px;
    font-weight: 500;
    color: #191919;
    margin-bottom: 20px;
  }
  .biab-product-actions {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .btn-buy-external {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 13px 18px;
    background: #191919;
    color: #FAF8F5 !important;
    border: 1px solid #191919;
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none !important;
    transition: all 0.25s ease;
    box-sizing: border-box;
  }
  .btn-buy-external:hover {
    background: #B89363;
    border-color: #B89363;
    color: #FFFFFF !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(184, 147, 99, 0.25);
  }
  .btn-product-bespoke {
    background: transparent;
    border: none;
    color: #6B6863;
    font-family: var(--font-sans);
    font-size: 10.5px;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    font-weight: 500;
    padding: 6px;
    cursor: pointer;
    transition: color 0.2s ease;
  }
  .btn-product-bespoke:hover {
    color: #191919;
  }
  /* Header Online Store Link */
  .btn-header-store-link {
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    color: #B89363 !important;
    text-decoration: none !important;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-right: 16px;
    transition: all 0.2s ease;
  }
  .btn-header-store-link:hover {
    color: #191919 !important;
    transform: translateY(-1px);
  }
  @media (max-width: 992px) {
    .biab-products-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
  }
  @media (max-width: 600px) {
    .biab-products-grid {
      grid-template-columns: 1fr;
    }
    .biab-category-nav {
      gap: 8px;
    }
    .biab-cat-tab {
      padding: 8px 14px;
      font-size: 10px;
    }
    .btn-header-store-link {
      display: none;
    }
  }
</style>
`;

// 4. Update shop.html
let shopHtml = fs.readFileSync('shop.html', 'utf8');
shopHtml = shopHtml.replace(/<style id="biab-catalog-styles">[\s\S]*?<\/style>/gi, '');
shopHtml = shopHtml.replace(/<\/head>/i, `${catalogStyles}\n</head>`);

// Replace the product-list container in shop.html with our responsive, external-routed catalog
const productListStart = shopHtml.indexOf('<div class="product-list"');
const productListEnd = shopHtml.indexOf('</section>', productListStart);

if (productListStart !== -1 && productListEnd !== -1) {
  const replacement = `
  <div class="product-list-external-wrapper">
    ${buildProductGridHtml()}
  </div>
  `;
  shopHtml = shopHtml.slice(0, productListStart) + replacement + shopHtml.slice(productListEnd);
  console.log('Replaced product-list in shop.html with external-routed catalog grid.');
}

fs.writeFileSync('shop.html', shopHtml, 'utf8');

// 5. Update Header in all HTML files: Add "Online Store ↗" next to "Custom Order"
const allPages = ['index.html', 'shop.html', 'custom-work.html', 'about.html', 'contact.html', 'blog.html'];

allPages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Insert catalog styles into head
  if (!html.includes('id="biab-catalog-styles"')) {
    html = html.replace(/<\/head>/i, `${catalogStyles}\n</head>`);
  }

  // Insert "Online Store ↗" before "Custom Order"
  if (!html.includes('btn-header-store-link')) {
    html = html.replace(
      /(<button class="btn-header-custom-order")/i,
      `<a href="https://yourstore.com" target="_blank" class="btn-header-store-link" id="headerStoreLink">Online Store ↗</a>\n$1`
    );
  }

  // In mobile menu: ensure "ONLINE STORE ↗" is present
  if (!html.includes('mobile-store-menu-link')) {
    html = html.replace(
      /(<div class="mobile-menu-brand-header">[\s\S]*?<\/div>)/i,
      `$1\n<div style="text-align:center; margin: 10px 0 20px;"><a href="https://yourstore.com" target="_blank" class="btn-buy-external mobile-store-menu-link" style="display:inline-flex; width:auto; padding: 10px 24px;">Online Store ↗</a></div>`
    );
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`Updated ${file} with header store link and catalog styles.`);
});

// 6. Update js/main.js to include BIAB_CONFIG and handle category tabs & routing
let mainJs = fs.readFileSync(path.join(__dirname, 'js', 'main.js'), 'utf8');

// Update BIAB_CONFIG in main.js
const updatedConfig = `
// Global Configuration (User can update WhatsApp phone number and External Store URLs here)
const BIAB_CONFIG = {
  whatsappNumber: '905000000000', // WhatsApp telefon numarası
  brandName: 'BIAB STUDIOS',
  // Ana E-Ticaret / Mağaza Bağlantınız (Shopify, Shopier, Trendyol, Etsy vb.)
  externalStoreUrl: 'https://yourstore.com',
  // Ürün bazlı doğrudan satın alma bağlantıları:
  productStoreLinks: {
    'dainty-moon-bracelet': 'https://yourstore.com/products/dainty-moon-bracelet',
    'dome-ring': 'https://yourstore.com/products/dome-ring',
    'silver-gold-bangle-stack': 'https://yourstore.com/products/silver-gold-bangle-stack',
    'link-necklace': 'https://yourstore.com/products/link-necklace',
    'medium-hoop': 'https://yourstore.com/products/medium-hoop',
    'irregular-pearl-necklace': 'https://yourstore.com/products/irregular-pearl-necklace',
    'ring-stack': 'https://yourstore.com/products/ring-stack',
    'charm-pendant-stack': 'https://yourstore.com/products/charm-pendant-stack',
    'textured-hoops': 'https://yourstore.com/products/textured-hoops'
  }
};
`;

mainJs = mainJs.replace(/const BIAB_CONFIG = \{[\s\S]*?\};/, updatedConfig.trim());

// Add category filtering and store routing updater to DOMContentLoaded
const additionalLogic = `
  // 7. External Store Links Initialization
  initExternalStoreLinks();

  // 8. Shop Category Filter Tabs
  initCategoryFilters();
`;

if (!mainJs.includes('initExternalStoreLinks()')) {
  mainJs = mainJs.replace(/(\/\/ 6\. Ensure Images are cleanly visible[\s\S]*?\}\);)/i, `$1\n\n${additionalLogic}`);
}

const functionsToAdd = `
/**
 * Initialize and update external store links across the website
 */
function initExternalStoreLinks() {
  // Update header store links
  document.querySelectorAll('#headerStoreLink, .mobile-store-menu-link').forEach(a => {
    a.href = BIAB_CONFIG.externalStoreUrl;
  });

  // Update product card external buy buttons
  document.querySelectorAll('.btn-buy-external[data-product-slug]').forEach(btn => {
    const slug = btn.getAttribute('data-product-slug');
    if (slug && BIAB_CONFIG.productStoreLinks[slug]) {
      btn.href = BIAB_CONFIG.productStoreLinks[slug];
    } else {
      btn.href = BIAB_CONFIG.externalStoreUrl;
    }
  });
}

/**
 * Interactive category filtering on shop.html
 */
function initCategoryFilters() {
  const tabs = document.querySelectorAll('.biab-cat-tab');
  const cards = document.querySelectorAll('.biab-product-card');
  if (tabs.length === 0 || cards.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
`;

if (!mainJs.includes('function initExternalStoreLinks()')) {
  mainJs += '\n' + functionsToAdd;
}

fs.writeFileSync(path.join(__dirname, 'js', 'main.js'), mainJs, 'utf8');
console.log('Updated js/main.js with External Store Routing and Category Tabs.');
