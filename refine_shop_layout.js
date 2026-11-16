const fs = require('fs');
const path = require('path');

let shopHtml = fs.readFileSync('shop.html', 'utf8');

// 1. Update the 4 top banners to call filterCategory
shopHtml = shopHtml.replace(
  /href="https:\/\/ocelot-walrus-2hef\.squarespace\.com\/shop\/earrings"/gi,
  'href="#biabCatalogWrap" onclick="filterCategory(\'earrings\')"'
);
shopHtml = shopHtml.replace(
  /href="https:\/\/ocelot-walrus-2hef\.squarespace\.com\/shop\/necklaces"/gi,
  'href="#biabCatalogWrap" onclick="filterCategory(\'necklaces\')"'
);
shopHtml = shopHtml.replace(
  /href="https:\/\/ocelot-walrus-2hef\.squarespace\.com\/shop\/rings"/gi,
  'href="#biabCatalogWrap" onclick="filterCategory(\'rings\')"'
);
shopHtml = shopHtml.replace(
  /href="https:\/\/ocelot-walrus-2hef\.squarespace\.com\/shop\/bracelets"/gi,
  'href="#biabCatalogWrap" onclick="filterCategory(\'bracelets\')"'
);

// 2. Add refined layout styles
const refinedStyles = `
<style id="biab-shop-refined-layout">
  /* Clean full-width product catalog layout */
  .nested-category-tree-wrapper,
  .product-list-category-subnav-container,
  .product-list-filters-sidebar-container,
  .product-list-filters-drawer-open-button-container,
  .product-list-header {
    display: none !important;
  }
  .product-list-content {
    display: block !important;
    width: 100% !important;
  }
  .biab-catalog-wrap {
    width: 100% !important;
    max-width: 1360px !important;
    margin: 40px auto 100px !important;
    padding: 0 24px !important;
    box-sizing: border-box !important;
    display: block !important;
  }
  .biab-category-nav {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 44px;
    padding: 0 16px;
  }
  .biab-cat-tab {
    background: transparent;
    border: 1px solid #D8D2C7;
    color: #444;
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 10px 22px;
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
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 40px 30px !important;
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
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.07);
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
    background: rgba(250, 248, 245, 0.94);
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
    font-size: 24px;
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
    padding: 14px 18px;
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
  @media (max-width: 992px) {
    .biab-products-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 24px !important;
    }
  }
  @media (max-width: 600px) {
    .biab-products-grid {
      grid-template-columns: 1fr !important;
    }
    .biab-category-nav {
      gap: 8px;
    }
    .biab-cat-tab {
      padding: 8px 14px;
      font-size: 10px;
    }
  }
</style>
`;

shopHtml = shopHtml.replace(/<style id="biab-shop-refined-layout">[\s\S]*?<\/style>/gi, '');
shopHtml = shopHtml.replace(/<\/head>/i, `${refinedStyles}\n</head>`);

fs.writeFileSync('shop.html', shopHtml, 'utf8');
console.log('shop.html updated with refined layout and banner hooks.');

// 3. Update js/main.js to support filterCategory(cat) globally
let mainJs = fs.readFileSync(path.join(__dirname, 'js', 'main.js'), 'utf8');

const filterFunction = `
function filterCategory(filter) {
  const tabs = document.querySelectorAll('.biab-cat-tab');
  const cards = document.querySelectorAll('.biab-product-card');
  if (cards.length === 0) return;

  tabs.forEach(tab => {
    if (tab.getAttribute('data-filter') === filter) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  cards.forEach(card => {
    const cat = card.getAttribute('data-category') || '';
    if (filter === 'all' || cat.includes(filter)) {
      card.classList.remove('hidden');
      card.style.display = 'flex';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.96)';
      setTimeout(() => {
        card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 30);
    } else {
      card.classList.add('hidden');
      card.style.display = 'none';
    }
  });

  const catalogElem = document.getElementById('biabCatalogWrap');
  if (catalogElem) {
    catalogElem.scrollIntoView({ behavior: 'smooth' });
  }
}
window.filterCategory = filterCategory;
`;

if (!mainJs.includes('window.filterCategory = filterCategory;')) {
  mainJs += '\n' + filterFunction;
  fs.writeFileSync(path.join(__dirname, 'js', 'main.js'), mainJs, 'utf8');
  console.log('Added global filterCategory to js/main.js');
}
