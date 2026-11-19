import { SITE_URL, sayfalar } from '@/lib/site';

// Sitemap, site.js'deki sayfa listesinden otomatik oluşur.
// Yeni sayfa eklemek için sadece site.js'e eklemek yeterli.
export default function sitemap() {
  return Object.keys(sayfalar).map((yol) => ({
    url: yol === '/' ? SITE_URL : `${SITE_URL}${yol}`,
  }));
}
