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
//  - MEB 2026-2027 Eğitim Öğretim Yılı Çalışma Takvimi
//  - Diyanet İşleri Başkanlığı 2027 Dini Günler Takvimi
//
// "bilgiler": sayfadaki "Önemli Bilgiler" kutularında görünür.
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
  bilgiler: [
    { etiket: 'Başvuru', deger: '4 Şubat – 2 Mart 2027', not: 'Geç başvuru: 16-18 Mart' },
    { etiket: 'TYT', deger: '120 soru · 165 dakika', not: 'Türkçe, Sosyal, Matematik, Fen' },
    { etiket: 'AYT', deger: '160 soru · 180 dakika', not: 'Edebiyat-Sosyal 1, Sosyal 2, Matematik, Fen' },
    { etiket: 'YDT', deger: '80 soru · 120 dakika', not: 'Yabancı dil' },
    { etiket: 'Sonuç', deger: '21 Temmuz 2027', not: 'ÖSYM planlanan tarih' },
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
  bilgiler: [
    { etiket: 'GY-GK', deger: '120 soru · 130 dakika', not: 'Genel Yetenek 60, Genel Kültür 60' },
    { etiket: 'Alan Bilgisi', deger: '18-19 Eylül 2027', not: 'A Grubu kadrolar için' },
    { etiket: 'Başvuru', deger: 'Temmuz 2027', not: 'Kesin günler ÖSYM duyurusunda' },
    { etiket: 'Sonuç', deger: '13 Ekim 2027', not: 'ÖSYM planlanan tarih' },
  ],
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
  bilgiler: [
    { etiket: 'Sözel Bölüm', deger: '50 soru · 75 dakika', not: 'Türkçe, İnkılap Tarihi, Din Kültürü, Yabancı Dil' },
    { etiket: 'Sayısal Bölüm', deger: '40 soru · 80 dakika', not: 'Matematik, Fen Bilimleri' },
    { etiket: 'Kimler girer?', deger: '8. sınıf öğrencileri', not: 'Sınavla öğrenci alan liseler için' },
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
  bilgiler: [
    { etiket: 'Başvuru', deger: '26 Mayıs – 3 Haziran 2027' },
    { etiket: 'Sınav', deger: '100 soru · 150 dakika', not: 'Sayısal 50, Sözel 50' },
    { etiket: 'Sonuç', deger: '12 Ağustos 2027', not: 'ÖSYM planlanan tarih' },
  ],
};

export const ales = {
  ad: 'ALES',
  yil: 2027,
  kurum: 'ÖSYM',
  baslangic: '2026-09-01T00:00:00+03:00',
  baslangicEtiketi: 'Sezon Başı (Eylül)',
  oturumlar: [
    { ad: 'ALES/1', tamAd: 'Nisan dönemi', tarih: '2027-04-18T10:15:00+03:00' },
    { ad: 'ALES/2', tamAd: 'Temmuz dönemi', tarih: '2027-07-11T10:15:00+03:00' },
    { ad: 'ALES/3', tamAd: 'Kasım dönemi', tarih: '2027-11-28T10:15:00+03:00' },
  ],
  bilgiler: [
    { etiket: 'ALES/1', deger: '18 Nisan 2027', not: 'Başvuru 24 Şubat – 4 Mart · Sonuç 7 Mayıs' },
    { etiket: 'ALES/2', deger: '11 Temmuz 2027', not: 'Başvuru 25 Mayıs – 2 Haziran · Sonuç 30 Temmuz' },
    { etiket: 'ALES/3', deger: '28 Kasım 2027', not: 'Başvuru 12-20 Ekim · Sonuç 17 Aralık' },
    { etiket: 'Sınav', deger: '100 soru · 150 dakika', not: 'Sayısal 50, Sözel 50' },
  ],
};

export const yds = {
  ad: 'YDS',
  yil: 2027,
  kurum: 'ÖSYM',
  baslangic: '2026-09-01T00:00:00+03:00',
  baslangicEtiketi: 'Sezon Başı (Eylül)',
  oturumlar: [
    { ad: 'YDS/1', tamAd: 'Mart dönemi', tarih: '2027-03-28T10:15:00+03:00' },
    { ad: 'YDS/2', tamAd: 'Kasım dönemi', tarih: '2027-11-21T10:15:00+03:00' },
  ],
  bilgiler: [
    { etiket: 'YDS/1', deger: '28 Mart 2027', not: 'Başvuru Şubat 2027 · Sonuç 21 Nisan' },
    { etiket: 'YDS/2', deger: '21 Kasım 2027', not: 'Başvuru 5-13 Ekim · Sonuç 10 Aralık' },
    { etiket: 'Sınav', deger: '80 soru · 180 dakika', not: 'Tek oturum, çoktan seçmeli' },
  ],
};

export const msu = {
  ad: 'MSÜ',
  yil: 2027,
  kurum: 'ÖSYM',
  baslangic: '2026-09-01T00:00:00+03:00',
  baslangicEtiketi: 'Sezon Başı (Eylül)',
  oturumlar: [
    { ad: 'MSÜ', tamAd: 'Millî Savunma Üniversitesi Askerî Öğrenci Aday Belirleme Sınavı', tarih: '2027-03-20T10:15:00+03:00' },
  ],
  bilgiler: [
    { etiket: 'Başvuru', deger: '13 Ocak – 10 Şubat 2027', not: 'Geç başvuru: 16 Şubat' },
    { etiket: 'Sınav', deger: '20 Mart 2027 Cumartesi', not: 'Saat 10:15' },
    { etiket: 'Sonuç', deger: '15 Nisan 2027', not: 'ÖSYM planlanan tarih' },
  ],
};

export const ags = {
  ad: 'AGS',
  yil: 2027,
  kurum: 'ÖSYM',
  baslangic: '2026-09-01T00:00:00+03:00',
  baslangicEtiketi: 'Sezon Başı (Eylül)',
  oturumlar: [
    { ad: 'AGS', tamAd: 'MEB Akademi Giriş Sınavı', tarih: '2027-05-08T10:15:00+03:00' },
    // ÖABT başlama saati henüz açıklanmadı: saat gösterilmez, sayaç günün başına sayar.
    { ad: 'ÖABT', tamAd: 'Öğretmenlik Alan Bilgisi Testi', tarih: '2027-05-09T00:00:00+03:00', saatBelirsiz: true },
  ],
  bilgiler: [
    { etiket: 'Başvuru', deger: '19 – 29 Mart 2027', not: 'Geç başvuru: 6 Nisan' },
    { etiket: 'AGS', deger: '8 Mayıs 2027 Cumartesi', not: 'Saat 10:15' },
    { etiket: 'ÖABT', deger: '9 Mayıs 2027 Pazar', not: 'Saat ÖSYM kılavuzuyla açıklanacak' },
    { etiket: 'Sonuç', deger: '11 Haziran 2027', not: 'ÖSYM planlanan tarih' },
  ],
};

// --- OKUL TAKVİMİ (MEB 2026-2027 çalışma takvimi) -----------------------

export const okul = {
  donem: '2026-2027',
  acilis: '2026-09-14T00:00:00+03:00',
  karne1: '2027-01-22T00:00:00+03:00', // 1. dönem sonu, karne
  yariyilBitis: '2027-02-05', // yarıyıl tatilinin son günü
  donem2: '2027-02-08', // 2. dönemin ilk günü
  araTatil2: { baslangic: '2027-03-08T00:00:00+03:00', bitis: '2027-03-12' },
  kapanis: '2027-06-25T00:00:00+03:00', // ders yılı sonu, karne
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
  // Bayram olmayan resmi tatiller (rozet: sayfadaki etiket)
  yilbasi: { ad: 'Yılbaşı', tamAd: 'Yeni Yıl', ay: 1, gun: 1, rozet: 'Resmi Tatil' },
  '1-mayis': { ad: '1 Mayıs', tamAd: 'Emek ve Dayanışma Günü', ay: 5, gun: 1, rozet: 'Resmi Tatil' },
  '15-temmuz': { ad: '15 Temmuz', tamAd: 'Demokrasi ve Milli Birlik Günü', ay: 7, gun: 15, kurulus: 2016, yilDonumu: '{n}. yıl dönümü', rozet: 'Resmi Tatil' },
};
