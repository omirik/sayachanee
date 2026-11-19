// Türkiye saatiyle tarih yardımcıları.
// Türkiye 2016'dan beri yıl boyu UTC+3 kullanıyor (yaz/kış saati yok).

const TR_SAAT_DILIMI = 'Europe/Istanbul';
const TR_FARK_MS = 3 * 60 * 60 * 1000;

// "13 Haziran 2027 Pazar"
export function tarihMetni(tarih, { gunAdi = true } = {}) {
  return new Date(tarih).toLocaleDateString('tr-TR', {
    timeZone: TR_SAAT_DILIMI,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(gunAdi && { weekday: 'long' }),
  });
}

// "09:30"
export function saatMetni(tarih) {
  return new Date(tarih).toLocaleTimeString('tr-TR', {
    timeZone: TR_SAAT_DILIMI,
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Türkiye saatiyle gece yarısı: trGeceYarisi(2027, 10, 29) -> 29 Ekim 2027 00:00 (TR)
export function trGeceYarisi(yil, ay, gun) {
  return Date.UTC(yil, ay - 1, gun) - TR_FARK_MS;
}

// Her yıl tekrar eden bir gün için (ör. 29 Ekim) bir sonraki ve bir önceki tarih.
export function yillikTarihler(ay, gun, simdi = Date.now()) {
  const trYili = new Date(simdi + TR_FARK_MS).getUTCFullYear();
  let yil = trYili;
  if (trGeceYarisi(yil, ay, gun) <= simdi) yil += 1;
  return {
    yil,
    hedef: trGeceYarisi(yil, ay, gun),
    onceki: trGeceYarisi(yil - 1, ay, gun),
  };
}

// Türkiye saatiyle tarih parçalarından zaman (ms). ay: 0-11
export function trZamani(yil, ay, gun, saat = 0, dakika = 0) {
  return Date.UTC(yil, ay, gun, saat, dakika) - TR_FARK_MS;
}

// Bir zamanın Türkiye saatindeki parçaları. ay: 0-11
export function trParcalar(ms) {
  const d = new Date(ms + TR_FARK_MS);
  return {
    yil: d.getUTCFullYear(),
    ay: d.getUTCMonth(),
    gun: d.getUTCDate(),
    saat: d.getUTCHours(),
    dakika: d.getUTCMinutes(),
  };
}

// Sunucu bileşenlerinde sayfanın oluşturulduğu an. Sayfa saatlik yenilendiği için
// sıralama ve ilk "kaç gün kaldı" değeri buna göre hesaplanır; tarayıcı sonra canlı günceller.
export function sunucuZamani() {
  return Date.now();
}

// Kalan süreyi gün/saat/dakika/saniye olarak parçalar.
export function kalanSure(farkMs) {
  const toplamSaniye = Math.max(0, Math.floor(farkMs / 1000));
  return {
    gun: Math.floor(toplamSaniye / 86400),
    saat: Math.floor((toplamSaniye % 86400) / 3600),
    dakika: Math.floor((toplamSaniye % 3600) / 60),
    saniye: toplamSaniye % 60,
  };
}
