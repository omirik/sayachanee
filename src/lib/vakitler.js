// Namaz / iftar / sahur vakitleri (yalnızca sunucuda kullanılır).
//
// Birincil kaynak: Diyanet İşleri Başkanlığı'nın il merkezi sayfası. Sayfada yılın tamamı
// (yıllık tablo) ve önümüzdeki 30 gün (aylık tablo) resmi vakitlerle yer alıyor.
// Diyanet'e ulaşılamazsa yedek: aladhan.com (Diyanet hesaplama yöntemi, ±1-2 dk sapabilir).
//
// Not: Diyanet'in "İmsak" vakti, aladhan'daki "Fajr" alanına karşılık gelir
// (aladhan'ın "Imsak" alanı 10 dakika erkendir; kullanılmamalı).

const AYLAR = {
  Ocak: '01', Şubat: '02', Mart: '03', Nisan: '04', Mayıs: '05', Haziran: '06',
  Temmuz: '07', Ağustos: '08', Eylül: '09', Ekim: '10', Kasım: '11', Aralık: '12',
};

const ONBELLEK_SN = 12 * 60 * 60; // Diyanet sayfası en fazla 12 saatte bir çekilir.
const SAAT = /^\d{2}:\d{2}$/;

// "Eyl&#252;l" -> "Eylül"
const cozHtml = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

function hucreler(satir) {
  return [...satir.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) =>
    cozHtml(m[1].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim(),
  );
}

// "21 Kasım 2026 Cumartesi" -> "2026-11-21"
function isoTarih(metin) {
  const [gun, ay, yil] = metin.split(' ');
  return AYLAR[ay] && yil ? `${yil}-${AYLAR[ay]}-${gun.padStart(2, '0')}` : null;
}

async function diyanettenAl(il) {
  const url = `https://namazvakitleri.diyanet.gov.tr/tr-TR/${il.diyanetId}/${il.slug}-icin-namaz-vakti`;
  const yanit = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SayachaneBot/1.0; +https://www.sayachane.com.tr)' },
    next: { revalidate: ONBELLEK_SN },
    signal: AbortSignal.timeout(15000),
  });
  if (!yanit.ok) throw new Error(`Diyanet HTTP ${yanit.status}`);
  const html = await yanit.text();

  const gunler = new Map();
  for (const [satir] of html.matchAll(/<tr[\s\S]*?<\/tr>/g)) {
    const h = hucreler(satir);
    if (h.length < 8) continue;
    const tarih = isoTarih(h[0]);
    const [imsak, gunes, ogle, ikindi, aksam, yatsi] = h.slice(2, 8);
    if (!tarih || ![imsak, aksam].every((s) => SAAT.test(s))) continue;
    gunler.set(tarih, { imsak, gunes, ogle, ikindi, aksam, yatsi });
  }
  if (gunler.size < 30) throw new Error('Diyanet tablosu okunamadı');
  return gunler;
}

async function aladhandanAl(il, simdi) {
  const gunler = new Map();
  const d = new Date(simdi + 3 * 60 * 60 * 1000);
  // Bu ay ve gelecek ay
  for (let i = 0; i < 2; i++) {
    const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + i, 1));
    const url = `https://api.aladhan.com/v1/calendarByCity/${t.getUTCFullYear()}/${t.getUTCMonth() + 1}?city=${encodeURIComponent(il.ad)}&country=Turkey&method=13`;
    const yanit = await fetch(url, { next: { revalidate: ONBELLEK_SN }, signal: AbortSignal.timeout(15000) });
    if (!yanit.ok) throw new Error(`aladhan HTTP ${yanit.status}`);
    const { data } = await yanit.json();
    for (const g of data) {
      const [gun, ay, yil] = g.date.gregorian.date.split('-');
      const s = (k) => g.timings[k].slice(0, 5);
      gunler.set(`${yil}-${ay}-${gun}`, {
        imsak: s('Fajr'), gunes: s('Sunrise'), ogle: s('Dhuhr'), ikindi: s('Asr'), aksam: s('Maghrib'), yatsi: s('Isha'),
      });
    }
  }
  return gunler;
}

/**
 * Bir ilin vakitleri.
 * @returns {{ gunler: Map<string, {imsak,gunes,ogle,ikindi,aksam,yatsi}>, kaynak: 'diyanet' | 'hesap' }}
 */
export async function sehirVakitleri(il, simdi = Date.now()) {
  try {
    return { gunler: await diyanettenAl(il), kaynak: 'diyanet' };
  } catch (hata) {
    console.error(`[vakitler] ${il.ad} Diyanet'ten alınamadı:`, hata.message);
    return { gunler: await aladhandanAl(il, simdi), kaynak: 'hesap' };
  }
}

// Türkiye saatiyle bugünün tarihi: "2026-11-21"
export function trBugun(simdi = Date.now(), gunEkle = 0) {
  return new Date(simdi + 3 * 60 * 60 * 1000 + gunEkle * 86400000).toISOString().slice(0, 10);
}

// Belirli tarih aralığındaki günler (başlangıç ve bitiş dahil)
export function tarihAraligi(baslangic, bitis) {
  const liste = [];
  for (let t = new Date(`${baslangic}T00:00:00Z`); t <= new Date(`${bitis}T00:00:00Z`); t.setUTCDate(t.getUTCDate() + 1)) {
    liste.push(t.toISOString().slice(0, 10));
  }
  return liste;
}
