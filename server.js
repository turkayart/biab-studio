const express = require('express');
const path = require('node:path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('./config/db');
const { csrf, requireAdmin, requireCustomer, secret } = require('./middleware/auth');
const { asyncHandler } = require('./services/http');
function createApp(options = {}) {
  const app = express(); app.disable('x-powered-by');
  const proxy = Number(process.env.TRUST_PROXY_HOPS || 0); if (!Number.isInteger(proxy) || proxy < 0 || proxy > 5) throw new Error('TRUST_PROXY_HOPS geçersiz'); if (proxy) app.set('trust proxy', proxy);
  app.locals.sendMail = options.sendMail;
  app.use(helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "'unsafe-inline'", 'https:'], styleSrc: ["'self'", "'unsafe-inline'", 'https:'], imgSrc: ["'self'", 'data:', 'https:'], fontSrc: ["'self'", 'data:', 'https:'], connectSrc: ["'self'"], frameSrc: ["'self'"], upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null } } }));
  app.use(express.json({ limit: '64kb' }), cookieParser(secret()));
  app.use('/api', (req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
  app.get('/api/health', asyncHandler(async (req, res) => { await require('./models').sequelize.authenticate(); res.json({ success: true, data: { status: 'ok', database: 'mysql', brand: 'BIAB Studio' } }); }));
  app.use('/api/webhooks', require('./routes/incoming-emails'));
  app.use('/api/public', require('./routes/public'));
  app.use('/api/auth', csrf, require('./routes/auth'));
  app.use('/api/account', csrf, require('./routes/account'));
  app.use('/api/admin', csrf, require('./routes/admin'));
  app.use('/api', (req, res) => res.status(404).json({ success: false, error: 'API bulunamadı' }));
  const publicPath = path.join(__dirname, 'public');
  const adminCsp = helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'"], styleSrc: ["'self'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'], fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'], imgSrc: ["'self'", 'data:', 'https:'], upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null } });
  app.get(['/yonetim', '/admin', '/admin.html', '/mail'], adminCsp, (req, res, next) => requireAdmin(req, res, error => { if (error && [401, 403].includes(error.status)) return res.redirect('/giris?next=%2Fyonetim'); if (error) return next(error); res.set('Cache-Control', 'no-store').sendFile(path.join(publicPath, 'admin.html')); }));
  app.get(['/giris', '/login', '/login.html'], adminCsp, (req, res) => res.sendFile(path.join(publicPath, 'login.html')));
  app.get(['/uye-giris', '/kayit-ol'], adminCsp, (req, res) => res.set('Cache-Control', 'no-store').sendFile(path.join(publicPath, 'account.html')));
  app.get('/hesabim', adminCsp, (req, res, next) => requireCustomer(req, res, error => {
    if (error && [401, 403].includes(error.status)) return res.redirect('/uye-giris');
    if (error) return next(error);
    res.set('Cache-Control', 'no-store').sendFile(path.join(publicPath, 'account.html'));
  }));
  app.get('/js/products-config.js', asyncHandler(async (req, res) => {
    try {
      const { items } = await require('./services/catalog').products({ limit: 100 });
      const config = await require('./services/settings').settings();
      const products = items.map(p => ({ ...p.toJSON(), id: p.slug, price: new Intl.NumberFormat('en-US', { style: 'currency', currency: p.currency }).format(p.priceMinor / 100) }));
      res.type('js').set('Cache-Control', 'no-store').send('window.BIAB_STORE_CONFIG=' + JSON.stringify({ ...config, products }).replace(/</g, '\\u003c') + ';window.getBiabProduct=function(id){return window.BIAB_STORE_CONFIG.products.find(function(p){return p.id===id;})||null;};');
    } catch {
      res.sendFile(path.join(publicPath, 'js', 'products-config.js'));
    }
  }));
  app.use(require('./routes/site-redirects'));
  for (const page of ['shop', 'about', 'contact', 'blog', 'custom-work']) app.get('/' + page, (req, res) => res.sendFile(path.join(publicPath, page + '.html')));
  app.use(express.static(publicPath, { dotfiles: 'deny', etag: true, maxAge: 0 }));
  app.use((req, res) => res.status(404).type('text').send('Sayfa bulunamadı'));
  app.use((error, req, res, next) => { if (res.headersSent) return next(error); const status = error.status || (error.name === 'SequelizeUniqueConstraintError' ? 409 : error.name === 'SequelizeValidationError' ? 400 : 500); if (status >= 500) console.error('İstek hatası:', error.name); res.status(status).json({ success: false, error: status >= 500 ? (status === 503 ? error.message : 'İşlem tamamlanamadı') : error.name?.startsWith('Sequelize') ? 'Bu kayıt mevcut veya alanlar geçersiz' : error.message }); });
  return app;
}
async function start() {
  secret();
  let dbConnected = true;
  try {
    await require('./services/bootstrap').bootstrap();
  } catch (error) {
    if (process.env.NODE_ENV === 'production') throw error;
    dbConnected = false;
    console.warn('Veritabanı bağlantısı yok (' + error.name + '). Site yerel önizleme modunda çalışıyor.');
  }
  const app = createApp();
  const port = Number(process.env.APP_PORT || 3110);
  const server = app.listen(port, () => console.log('BIAB Studio: http://localhost:' + port + ' · /yonetim'));
  if (dbConnected) {
    const cleanup = setInterval(() => require('./services/analytics').prune().catch(() => console.error('Analitik temizliği başarısız')), 86400000);
    cleanup.unref();
  }
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {
    server.close(() => {
      if (dbConnected) {
        require('./models').sequelize.close().finally(() => process.exit(0));
      } else {
        process.exit(0);
      }
    });
  });
}
if (require.main === module) start().catch(error => { console.error('Başlatılamadı:', error.name, '· SQL bağlantısını ve .env ayarlarını kontrol edin'); process.exitCode = 1; });
module.exports = { createApp };
