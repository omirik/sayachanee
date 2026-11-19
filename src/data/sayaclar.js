// =====================================================================
// SAYAÇHANE — TÜM TARİHLER BURADA
// =====================================================================
// Tarih değiştirmek veya yeni yılın tarihlerini girmek için sadece bu
// dosyayı düzenle. Sayfalar, sayaçlar ve SSS cevapları buradan beslenir.
//
// Saat dilimi: Tüm tarihler TÜRKİYE SAATİYLE yazılır (sonundaki +03:00).
// Böylece ziyaretçi yurt dışında olsa bile sayaç doğru çalışır.
//
// Son kontrol: 19 Kasım 2026
//  - ÖSYM 2027 Sınav Takvimi (28 Ekim 2026'da yayımlandı)
//  - MEB 2027 Sınav Uygulama Takvimi (LGS)
//  - Diyanet İşleri Başkanlığı 2027 Dini Günler Takvimi
// =====================================================================

// --- SINAVLAR ---------------------------------------------------------

export const yks = {
  ad: 'YKS',
  yil: 2027,
  kurum: 'ÖSYM',
  // İlerleme çubuğunun başladığı an (hazırlık sezonunun başı)
  baslangic: '2026-09-01T00:00:00+03:00',
  baslangicEtiketi: 'Sezon Başı (Eylül)',
  oturumlar: [
    { ad: 'TYT', tamAd: 'Temel Yeterlilik Testi', tarih: '2027-06-19T10:15:00+03:00' },
    { ad: 'AYT', tamAd: 'Alan Yeterlilik Testleri', tarih: '2027-06-20T10:15:00+03:00' },
    { ad: 'YDT', tamAd: 'Yabancı Dil Testi', tarih: '2027-06-20T15:45:00+03:00' },
  ],
};

export const kpss = {
  ad: 'KPSS',
  yil: 2027,
  kurum: 'ÖSYM',
  baslangic: '2026-09-07T00:00:00+03:00', // 2026 KPSS Lisans'ın ertesi günü
  baslangicEtiketi: '2026 KPSS Sonrası',
  oturumlar: [
    { ad: 'Lisans (GY-GK)', tamAd: 'KPSS Lisans Genel Yetenek - Genel Kültür', tarih: '2027-09-12T10:15:00+03:00' },
  ],
  // Ön Lisans ve Ortaöğretim KPSS'leri yalnızca çift yıllarda yapılır.
  sonrakiBGrubuYili: 2028,
};

export const lgs = {
  ad: 'LGS',
  yil: 2027,
  kurum: 'MEB',
  baslangic: '2026-09-01T00:00:00+03:00',
  baslangicEtiketi: 'Sezon Başı (Eylül)',
  oturumlar: [
    { ad: 'LGS', tamAd: 'Liselere Geçiş Sistemi Merkezi Sınavı', tarih: '2027-06-13T09:30:00+03:00' },
  ],
};

export const dgs = {
  ad: 'DGS',
  yil: 2027,
  kurum: 'ÖSYM',
  baslangic: '2026-09-01T00:00:00+03:00',
  baslangicEtiketi: 'Sezon Başı (Eylül)',
  oturumlar: [
    { ad: 'DGS', tamAd: 'Dikey Geçiş Sınavı', tarih: '2027-07-18T10:15:00+03:00' },
  ],
};

// --- DİNİ GÜNLER (Diyanet takvimi) ------------------------------------

export const ramazan = {
  ad: 'Ramazan',
  yil: 2027,
  // 1 Ramazan 1448. İlk sahur 7 Şubat'ı 8 Şubat'a bağlayan gece yapılır.
  baslangicTarihi: '2027-02-08T00:00:00+03:00',
  kadirGecesi: '2027-03-05', // 5 Mart akşamı (5'i 6 Mart'a bağlayan gece)
  bitisTarihi: '2027-03-08', // son oruç (arefe)
};

export const ramazanBayrami = {
  ad: 'Ramazan Bayramı',
  yil: 2027,
  kurum: 'Diyanet',
  baslangic: '2026-03-20T00:00:00+03:00', // 2026 Ramazan Bayramı'nın 1. günü
  baslangicEtiketi: 'Geçen Bayram',
  arefe: '2027-03-08',
  oturumlar: [
    { ad: 'Ramazan Bayramı', tamAd: 'Ramazan Bayramı 1. Gün', tarih: '2027-03-09T00:00:00+03:00' },
  ],
  bayramGunleri: ['2027-03-09', '2027-03-10', '2027-03-11'],
};

export const kurbanBayrami = {
  ad: 'Kurban Bayramı',
  yil: 2027,
  kurum: 'Diyanet',
  baslangic: '2026-05-27T00:00:00+03:00', // 2026 Kurban Bayramı'nın 1. günü
  baslangicEtiketi: 'Geçen Bayram',
  arefe: '2027-05-15',
  oturumlar: [
    { ad: 'Kurban Bayramı', tamAd: 'Kurban Bayramı 1. Gün', tarih: '2027-05-16T00:00:00+03:00' },
  ],
  bayramGunleri: ['2027-05-16', '2027-05-17', '2027-05-18', '2027-05-19'],
};

// --- RESMİ BAYRAMLAR (her yıl aynı gün; sayaç kendini yeniler) ----------

export const milliBayramlar = {
  // kurulus: yıl dönümü hesabı için olayın yılı
  '23-nisan': { ad: '23 Nisan', tamAd: 'Ulusal Egemenlik ve Çocuk Bayramı', ay: 4, gun: 23, kurulus: 1920, yilDonumu: "TBMM'nin açılışının {n}. yıl dönümü" },
  '19-mayis': { ad: '19 Mayıs', tamAd: "Atatürk'ü Anma, Gençlik ve Spor Bayramı", ay: 5, gun: 19, kurulus: 1919, yilDonumu: "Samsun'a çıkışın {n}. yıl dönümü" },
  '30-agustos': { ad: '30 Ağustos', tamAd: 'Zafer Bayramı', ay: 8, gun: 30, kurulus: 1922, yilDonumu: 'Büyük Zafer’in {n}. yıl dönümü' },
  '29-ekim': { ad: '29 Ekim', tamAd: 'Cumhuriyet Bayramı', ay: 10, gun: 29, kurulus: 1923, yilDonumu: "Cumhuriyetimizin {n}. yılı" },
};
