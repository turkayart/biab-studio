# BIAB Studio

SteamTürk yönetim merkezinin BIAB takı kataloğuna uyarlanmış sürümü.
Node/Express, vanilla JS, Sequelize/MySQL, HttpOnly JWT, CSRF ve Docker.

## Yerel çalıştırma

1. `npm install` ve `npm run setup`
2. `docker compose up -d db` (mevcut mysql:8.4 image kullanılır)
3. `npm start`

Site: http://localhost:3110 · Panel: http://localhost:3110/yonetim
Yönetici kullanıcı adı varsayılan `admin`; `.env` içindeki ADMIN_USERNAME / ADMIN_PASSWORD
ile ayarlanır. E-posta ile giriş de desteklenir. Mevcut hesabı güncellemek için
ADMIN_EMAIL aynı kalacak şekilde bu alanları düzenleyip `npm run admin:set` çalıştırın.
Komut hesabın kimliğini korur ve değişiklikte önceki oturumları kapatır.
Başlangıçta yalnız eksik `biab_` tabloları kurulur, mevcut site kataloğu bir kez aktarılır.
Örnek müşteri, sipariş ve sahte trafik üretilmez; sync alter kullanılmaz.

## Müşteri hesabı ve mobil menü

Müşteri girişi `/uye-giris`, kayıt `/kayit-ol`, hesap ekranı `/hesabim`.
Ana sayfa ve diğer site menülerinde ortak `customer-links.html` bileşeni kullanılır.
Kayıt e-posta/ad/şifre ile yapılır; şifre en az 8 karakter, en fazla 72 UTF-8 bayt.
Müşteri rolü sunucuda sabittir. Mevcut Users/Customers modelleri kullanılır; yeni şema
veya ortam değişkeni gerekmez. Hesabım ekranı üyenin kendi ad/e-posta bilgilerini sunar.
Müşteri JWT'si ayrı HttpOnly cookie ve audience kullanır; yönetici oturumu ile birlikte
çalışır. CSRF, giriş/kayıt hız sınırları ve çıkışta oturum iptali uygulanır.
Mobil ölçü tablosu kendi alanında yatay kayar; ana sayfa ekran dışına büyümez.

## Coolify üretim kurulumu

Uygulama adresi: https://biab.csainsaat.com
Coolify uygulaması: `o44gggc4ks4ocw0kw48ws0oo`, Git kaynağı `kaanx2311336/biab-studio`, dal `main`.
2026-10-08: Üretim dağıtımı **Running (healthy)** olarak doğrulandı; HTTPS sağlık
kontrolü, 15 ürünlük SQL kataloğu ve yönetici girişi çalışıyor.

Configuration > Environment Variables bölümünde aşağıdaki değişkenler **Available at
Runtime** açık, **Available at Buildtime** kapalı olacak şekilde kaydedilmelidir:
APP_PORT, NODE_ENV, PUBLIC_ORIGIN, TRUST_PROXY_HOPS, MYSQL_HOST, MYSQL_PORT,
MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, JWT_SECRET, ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD,
EMAIL_WEBHOOK_SECRET, BREVO_SENDER_EMAIL. Brevo bağlanınca BREVO_API_KEY de yalnız
çalışma zamanında tanımlanır. Dockerfile build sırasında bu sırlara ihtiyaç duymaz.
Boş ortam değişkenleriyle uygulama başlatılamaz; `.env.example` otomatik üretim
konfigürasyonu değildir. Değerleri kaydettikten sonra Deploy ile container yenilenir.

Dockerfile ile uygulama portu 3000 kullanılır. Mevcut özel ağ MySQL kaydı:
`vo4woscksgo4ko804k0okwc4`, MySQL portu 3306, normal kullanıcı `mysql`.
Uygulama ve SQL aynı Coolify Docker ağına bağlanmalıdır; SQL dışarıya açılmaz.
MYSQL_DATABASE ve MYSQL_PASSWORD mevcut veritabanının Initial Database / Normal User
Password alanlarından alınır. MYSQL_HOST / MYSQL_PORT / MYSQL_USER yukarıdaki değerlere
ayarlanır. Mevcut SQL kaydının Initial Database değeri `default` olarak görünür.
Parola yeniden üretilmez; mevcut Normal User Password tam olarak kullanılır.
NODE_ENV=production, APP_PORT=3000, PUBLIC_ORIGIN=https://biab.csainsaat.com,
TRUST_PROXY_HOPS doğrulanmış proxy sayısı (tek proxy için 1) olmalıdır.
JWT_SECRET, ADMIN_PASSWORD ve EMAIL_WEBHOOK_SECRET ayrı değerler olmalıdır.
Yerel .env Git'e veya Docker image'a girmez. ADMIN_PASSWORD sonradan değiştirmek
mevcut yöneticinin şifresini otomatik değiştirmez; kalıcı kullanıcı kaydı korunur.
Giriş bilgilerini değiştirmek için ortam alanlarını kaydedip yeni container dağıtıldıktan
sonra uygulamanın Terminal sekmesinde `npm run admin:set` çalıştırın. Şifre komut satırına
yazılmaz; çalışma zamanı ortamından alınır ve SQL'e bcrypt özeti kaydedilir.

Doğrulama: Dockerfile sağlık kontrolü 60 saniyelik başlangıç süresinden sonra
`/api/health` üzerinden hem HTTP hem SQL bağlantısını kontrol eder. İlk başarısız
dağıtımda image build tamamlanmış, fakat ortam değişkenleri tanımlanmadığı için
başlangıç durmuştu. `SequelizeAccessDeniedError`, SQL sunucusuna ulaşıldığını ancak
kullanıcı/parola veya veritabanı yetkisinin reddedildiğini gösterir; sağlık kontrolünü
kapatmak bu hatayı çözmez.

## Kapsam

Kaynak panelin grafikler, tarih filtreleri, trafik/UTM/cihaz/sayfa/arama/ürün/
ziyaretçi raporları, zaman çizelgesi, sayfalama, CSV, müşteriler, ürün/stok,
sipariş, destek, işlem günlüğü, mobil menü, tema ve çıkışı uyarlandı.
Takı formu koleksiyon, materyal, görsel, stok, fiyat/para birimi, harici mağaza
ve ana sayfa/mağaza yerleşimini yönetir. Özel tasarım/bülten SQL'e kaydolur.
Ödeme ekranı doğrulama referansı saklar; otomatik ödeme ayrıca sağlayıcının
imzalı webhook entegrasyonunu gerektirir. Harici satışlar kendiliğinden alınmaz.
Kaynak e-pin/cüzdan alanları BIAB fiziksel ürün/ödeme modeline uyarlanmıştır.

Giden posta: BREVO_API_KEY ve onaylı BREVO_SENDER_EMAIL gerekli. Önce taslak,
sonra ayrı gönder eylemi. Destek yanıtı geçmişe kaydolur, e-posta göndermez.
Gelen posta: POST /api/webhooks/incoming-email, x-email-webhook-secret;
from, to, subject, text, messageId. Yönlendirme hizmeti ayrıca bağlanmalıdır.
GeoIP kurulmadığından konum raporu bunu bildirir; IP toplanmaz.
Analitik izin sonrası anonim hareketleri kaydeder. Aramalar kimliksiz
sayılır. Ayrıntılar 90 gün saklanır. Etkileşim olayları satış kanıtı değildir.

## Kontroller

npm test ayrı biab_test MySQL veritabanında çalışır. Sonraki şema değişiklikleri
için numaralı migration gerekir. Özetler prodetayi/, kanıtlar yapilanlar/ altında.
