import { SITE_URL, sayfalar } from '@/lib/site';
import { iller } from '@/data/iller';

// Sitemap, site.js'deki sayfa listesinden ve 81 ilin Ramazan sayfalarından otomatik oluşur.
// Yeni sayfa eklemek için sadece site.js'e eklemek yeterli.
export default function sitemap() {
  const sayfaAdresleri = Object.keys(sayfalar).map((yol) => ({
    url: yol === '/' ? SITE_URL : `${SITE_URL}${yol}`,
  }));
  const sehirAdresleri = iller.map((il) => ({ url: `${SITE_URL}/ramazan/${il.slug}` }));
  return [...sayfaAdresleri, ...sehirAdresleri];
}
