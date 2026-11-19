// Sitenin TEK resmi adresi. Vercel www olmayan adresi buraya yönlendiriyor,
// bu yüzden sitemap, canonical ve paylaşım etiketlerinin hepsi bu adresi kullanmalı.
export const SITE_URL = 'https://www.sayachane.com.tr';
export const SITE_NAME = 'Sayaçhane';

// Sitedeki tüm herkese açık sayfalar. Yeni sayfa eklerken buraya da ekle:
// sitemap ve sayfa başlıkları buradan otomatik oluşur.
export const sayfalar = {
  '/': {
    title: 'Sayaçhane | Sınav, Bayram ve Özel Gün Geri Sayım Sayaçları',
    description:
      'YKS, KPSS, LGS, DGS, Ramazan, bayramlar ve kendi özel günleriniz için canlı geri sayım sayaçları. Kaç gün, saat, dakika ve saniye kaldığını anında görün.',
    keywords: ['geri sayım', 'sayaç', 'kaç gün kaldı', 'yks sayacı', 'kpss sayacı', 'ramazan sayacı', 'sayaçhane'],
  },

  // Sınavlar
  '/yks': {
    title: "YKS'ye Kaç Gün Kaldı? 2027 TYT ve AYT Sayacı",
    description:
      "2027 YKS'ye (TYT ve AYT) kaç gün kaldı? Üniversite sınavına kalan süreyi gün, saat, dakika ve saniye olarak canlı takip edin.",
    keywords: ['yks ye kaç gün kaldı', 'tyt ye kaç gün kaldı', 'ayt ye kaç gün kaldı', 'yks sayacı', '2027 yks ne zaman'],
  },
  '/kpss': {
    title: "KPSS'ye Kaç Gün Kaldı? 2027 KPSS Lisans Sayacı",
    description:
      "2027 KPSS Lisans sınavına kaç gün kaldı? Memurluk sınavı için güncel tahmini tarih ve canlı geri sayım sayacı.",
    keywords: ['kpss ye kaç gün kaldı', 'kpss lisans kaç gün kaldı', 'kpss sayacı', 'kpss geri sayım', '2027 kpss ne zaman'],
  },
  '/lgs': {
    title: "LGS'ye Kaç Gün Kaldı? 2027 LGS Sayacı",
    description:
      "2027 LGS'ye kaç gün kaldı? Liselere Geçiş Sistemi sınavına kalan süreyi saniye saniye takip edin, tahmini sınav tarihini öğrenin.",
    keywords: ['lgs ye kaç gün kaldı', 'lgs sayacı', '2027 lgs ne zaman', 'lgs geri sayım'],
  },
  '/dgs': {
    title: "DGS'ye Kaç Gün Kaldı? 2027 DGS Sayacı",
    description:
      "2027 DGS'ye kaç gün kaldı? Dikey Geçiş Sınavı için tahmini tarih ve canlı geri sayım sayacı.",
    keywords: ['dgs ye kaç gün kaldı', 'dgs sayacı', '2027 dgs ne zaman', 'dgs geri sayım'],
  },

  '/ales': {
    title: "ALES'e Kaç Gün Kaldı? 2027 ALES Sayacı",
    description:
      "2027 ALES/1, ALES/2 ve ALES/3'e kaç gün kaldı? Sınav, başvuru ve sonuç tarihleri ile canlı geri sayım sayacı.",
    keywords: ['ales e kaç gün kaldı', '2027 ales ne zaman', 'ales sayacı', 'ales başvuru tarihleri'],
  },
  '/yds': {
    title: "YDS'ye Kaç Gün Kaldı? 2027 YDS Sayacı",
    description:
      "2027 YDS/1 ve YDS/2'ye kaç gün kaldı? Yabancı Dil Bilgisi Seviye Tespit Sınavı tarihleri ve canlı geri sayım.",
    keywords: ['yds ye kaç gün kaldı', '2027 yds ne zaman', 'yds sayacı', 'yds başvuru tarihleri'],
  },

  // Okul takvimi
  '/yariyil-tatili': {
    title: 'Yarıyıl Tatiline Kaç Gün Kaldı? Karne Günü Sayacı',
    description:
      'Karneye ve yarıyıl tatiline kaç gün kaldı? MEB 2026-2027 takvimine göre karne günü, yarıyıl tatili ve 2. dönem başlangıcı.',
    keywords: ['yarıyıl tatiline kaç gün kaldı', 'karneye kaç gün kaldı', 'sömestr tatili ne zaman', 'karne ne zaman'],
  },
  '/ara-tatil': {
    title: 'Ara Tatile Kaç Gün Kaldı? 2027 Mart Ara Tatili',
    description:
      'Ara tatile kaç gün kaldı? MEB 2026-2027 takvimine göre ikinci dönem ara tatili tarihleri ve canlı geri sayım.',
    keywords: ['ara tatile kaç gün kaldı', 'ara tatil ne zaman', 'mart ara tatili 2027'],
  },
  '/okullarin-kapanmasi': {
    title: 'Okulların Kapanmasına Kaç Gün Kaldı? Yaz Tatili Sayacı',
    description:
      'Okulların kapanmasına ve yaz tatiline kaç gün kaldı? MEB 2026-2027 takvimine göre son ders günü ve karne tarihi.',
    keywords: ['okulların kapanmasına kaç gün kaldı', 'yaz tatiline kaç gün kaldı', 'okullar ne zaman kapanıyor'],
  },

  // Dini günler
  '/ramazan': {
    title: 'Ramazana Kaç Gün Kaldı? İftar ve Sahur Sayacı',
    description:
      'Ramazan ayına, iftara ve sahura ne kadar kaldı? Şehrinizi seçin, iftar ve sahur vakitlerini canlı geri sayımla takip edin.',
    keywords: ['ramazana kaç gün kaldı', 'iftara ne kadar var', 'sahura kaç saat kaldı', 'ramazan sayacı', 'iftar sayacı'],
  },
  '/ramazan-bayrami': {
    title: 'Ramazan Bayramına Kaç Gün Kaldı? 2027 Bayram Sayacı',
    description:
      '2027 Ramazan Bayramı ne zaman, kaç gün kaldı? Bayrama kalan süreyi canlı takip edin, arefe ve tatil günlerini öğrenin.',
    keywords: ['ramazan bayramına kaç gün kaldı', 'şeker bayramı ne zaman', '2027 ramazan bayramı', 'bayram sayacı'],
  },
  '/kurban-bayrami': {
    title: 'Kurban Bayramına Kaç Gün Kaldı? 2027 Bayram Sayacı',
    description:
      '2027 Kurban Bayramı ne zaman, kaç gün kaldı? Bayrama kalan süreyi canlı takip edin, arefe ve tatil süresini öğrenin.',
    keywords: ['kurban bayramına kaç gün kaldı', '2027 kurban bayramı ne zaman', 'kurban bayramı sayacı'],
  },

  // Resmi bayramlar
  '/29-ekim': {
    title: "29 Ekim'e Kaç Gün Kaldı? Cumhuriyet Bayramı Sayacı",
    description:
      "29 Ekim Cumhuriyet Bayramı'na kaç gün kaldı? Bayrama kalan süreyi canlı takip edin; sayaç her yıl otomatik yenilenir.",
    keywords: ['29 ekime kaç gün kaldı', 'cumhuriyet bayramı sayacı', '29 ekim geri sayım'],
  },
  '/23-nisan': {
    title: "23 Nisan'a Kaç Gün Kaldı? Çocuk Bayramı Sayacı",
    description:
      "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı'na kaç gün kaldı? Bayrama kalan süreyi canlı takip edin.",
    keywords: ['23 nisana kaç gün kaldı', 'çocuk bayramı sayacı', '23 nisan geri sayım'],
  },
  '/19-mayis': {
    title: "19 Mayıs'a Kaç Gün Kaldı? Gençlik ve Spor Bayramı Sayacı",
    description:
      "19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı'na kaç gün kaldı? Bayrama kalan süreyi canlı takip edin.",
    keywords: ['19 mayısa kaç gün kaldı', 'gençlik ve spor bayramı sayacı', '19 mayıs geri sayım'],
  },
  '/30-agustos': {
    title: "30 Ağustos'a Kaç Gün Kaldı? Zafer Bayramı Sayacı",
    description:
      "30 Ağustos Zafer Bayramı'na kaç gün kaldı? Bayrama kalan süreyi canlı takip edin; sayaç her yıl otomatik yenilenir.",
    keywords: ['30 ağustosa kaç gün kaldı', 'zafer bayramı sayacı', '30 ağustos geri sayım'],
  },
  '/yilbasi': {
    title: 'Yılbaşına Kaç Gün Kaldı? Yeni Yıl Geri Sayım',
    description: 'Yılbaşına kaç gün, saat, dakika kaldı? Yeni yıla Türkiye saatiyle saniye saniye canlı geri sayım.',
    keywords: ['yılbaşına kaç gün kaldı', 'yeni yıla kaç gün kaldı', 'yılbaşı geri sayım', '2027 yılbaşı'],
  },
  '/1-mayis': {
    title: "1 Mayıs'a Kaç Gün Kaldı? Emek ve Dayanışma Günü",
    description: "1 Mayıs Emek ve Dayanışma Günü'ne kaç gün kaldı? Resmi tatile kalan süreyi canlı takip edin.",
    keywords: ['1 mayısa kaç gün kaldı', '1 mayıs resmi tatil mi', '1 mayıs geri sayım'],
  },
  '/15-temmuz': {
    title: "15 Temmuz'a Kaç Gün Kaldı? Demokrasi ve Milli Birlik Günü",
    description: "15 Temmuz Demokrasi ve Milli Birlik Günü'ne kaç gün kaldı? Resmi tatile kalan süreyi canlı takip edin.",
    keywords: ['15 temmuza kaç gün kaldı', '15 temmuz resmi tatil mi', '15 temmuz geri sayım'],
  },

  // Araçlar ve kategori sayfaları
  '/ozel': {
    title: 'Özel Geri Sayım Sayacı Oluştur',
    description:
      'Doğum günü, askerlik, tatil, düğün ya da yıldönümü... Kendi tarihinizi girin, özel geri sayım sayacınızı ücretsiz oluşturun.',
    keywords: ['geri sayım oluştur', 'özel sayaç', 'doğum günü sayacı', 'askerlik sayacı', 'tarih sayacı'],
  },
  '/tum-sayaclar': {
    title: 'Tüm Geri Sayım Sayaçları',
    description:
      'Sayaçhane’deki tüm sayaçlar tek sayfada: sınavlar, resmi bayramlar, dini günler ve özel sayaç aracı.',
  },
  '/sinavlar': {
    title: 'Sınav Sayaçları: YKS, KPSS, LGS, DGS, ALES, YDS',
    description:
      'YKS, KPSS, LGS, DGS, ALES ve YDS sınavlarına kaç gün kaldı? Tüm sınav geri sayım sayaçları bir arada.',
  },
  '/resmi-bayramlar': {
    title: 'Resmi Bayram ve Tatil Sayaçları',
    description:
      '29 Ekim, 23 Nisan, 19 Mayıs, 30 Ağustos, yılbaşı, 1 Mayıs ve 15 Temmuz’a kaç gün kaldı? Tüm resmi bayram ve tatil sayaçları bir arada.',
  },
  '/okul-takvimi': {
    title: 'Okul Takvimi: Karne, Ara Tatil ve Yaz Tatili Sayaçları',
    description:
      'Karneye, ara tatile ve okulların kapanmasına kaç gün kaldı? MEB 2026-2027 çalışma takvimine göre canlı sayaçlar.',
  },
  '/dini-gunler': {
    title: 'Dini Gün ve Bayram Sayaçları',
    description:
      'Ramazan, Ramazan Bayramı ve Kurban Bayramı’na kaç gün kaldı? Dini günler için geri sayım sayaçları.',
  },

  // Kurumsal
  '/hakkimizda': {
    title: 'Hakkımızda',
    description: 'Sayaçhane nedir, kimin için ve neden geliştirildi? Projenin amacı ve vizyonu.',
  },
  '/iletisim': {
    title: 'İletişim',
    description: 'Sayaçhane ile iletişime geçin: öneri, hata bildirimi ve iş birliği talepleriniz için bize yazın.',
  },
  '/gizlilik-politikasi': {
    title: 'Gizlilik Politikası',
    description: 'Sayaçhane gizlilik politikası ve çerez kullanımı hakkında bilgiler.',
  },
  '/kullanim-kosullari': {
    title: 'Kullanım Koşulları',
    description: 'Sayaçhane platformunun kullanım koşulları ve sorumluluk reddi beyanı.',
  },
};

// Bir sayfanın <title>, açıklama, canonical ve paylaşım (Open Graph) etiketlerini üretir.
// Kullanım: export const metadata = sayfaMeta('/yks');
export function sayfaMeta(yol) {
  const sayfa = sayfalar[yol];
  if (!sayfa) throw new Error(`site.js içinde "${yol}" sayfası tanımlı değil`);

  const url = yol === '/' ? SITE_URL : `${SITE_URL}${yol}`;
  // Ana sayfa başlığı zaten marka adını içeriyor; diğerlerine " | Sayaçhane" eklenir.
  const title = yol === '/' ? { absolute: sayfa.title } : sayfa.title;
  const tamBaslik = yol === '/' ? sayfa.title : `${sayfa.title} | ${SITE_NAME}`;

  return {
    title,
    description: sayfa.description,
    ...(sayfa.keywords && { keywords: sayfa.keywords }),
    alternates: { canonical: url },
    openGraph: {
      title: tamBaslik,
      description: sayfa.description,
      url,
      siteName: SITE_NAME,
      locale: 'tr_TR',
      type: 'website',
      // Varsayılan: ana sayfa görseli. Kendi opengraph-image dosyası olan sayfalarda o kullanılır.
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tamBaslik,
      description: sayfa.description,
    },
  };
}
