// Her sayfanın paylaşım görselinde yazacaklar.
// Tarihler src/data/sayaclar.js'den gelir; tarih değişince görsel de değişir.
import { ogResim } from './og';
import { yks, kpss, lgs, dgs, ales, yds, okul, ramazan, ramazanBayrami, kurbanBayrami, milliBayramlar } from '@/data/sayaclar';
import { tarihMetni } from './zaman';

const milli = (slug) => {
  const b = milliBayramlar[slug];
  // Türkçe ek: "23 Nisan'a", "29 Ekim'e", "Yılbaşına"
  const ek = { '23-nisan': "'a", '19-mayis': "'a", '30-agustos': "'a", '29-ekim': "'e", yilbasi: 'na', '1-mayis': "'a", '15-temmuz': "'a" }[slug];
  return { etiket: b.rozet ?? 'Milli Bayram', baslik: `${b.ad}${ek} kaç gün kaldı?`, alt: b.tamAd, tema: 'red' };
};

export const ogSayfalar = {
  '/': {
    etiket: 'Canlı geri sayım',
    baslik: 'Sınavlara ve bayramlara ne kadar kaldı?',
    alt: 'YKS · KPSS · LGS · DGS · Ramazan · Resmi bayramlar',
    tema: 'emerald',
  },
  '/yks': { etiket: `ÖSYM · ${yks.yil}`, baslik: "YKS'ye kaç gün kaldı?", alt: `TYT: ${tarihMetni(yks.oturumlar[0].tarih)}`, tema: 'emerald' },
  '/kpss': { etiket: `ÖSYM · ${kpss.yil}`, baslik: "KPSS'ye kaç gün kaldı?", alt: `Lisans GY-GK: ${tarihMetni(kpss.oturumlar[0].tarih)}`, tema: 'blue' },
  '/lgs': { etiket: `MEB · ${lgs.yil}`, baslik: "LGS'ye kaç gün kaldı?", alt: tarihMetni(lgs.oturumlar[0].tarih), tema: 'cyan' },
  '/dgs': { etiket: `ÖSYM · ${dgs.yil}`, baslik: "DGS'ye kaç gün kaldı?", alt: tarihMetni(dgs.oturumlar[0].tarih), tema: 'purple' },
  '/ramazan': { etiket: `Diyanet · ${ramazan.yil}`, baslik: 'Ramazana kaç gün kaldı?', alt: `İlk gün: ${tarihMetni(ramazan.baslangicTarihi)}`, tema: 'amber' },
  '/ramazan-bayrami': {
    etiket: `Diyanet · ${ramazanBayrami.yil}`,
    baslik: 'Ramazan Bayramına kaç gün kaldı?',
    alt: tarihMetni(ramazanBayrami.oturumlar[0].tarih),
    tema: 'amber',
  },
  '/kurban-bayrami': {
    etiket: `Diyanet · ${kurbanBayrami.yil}`,
    baslik: 'Kurban Bayramına kaç gün kaldı?',
    alt: tarihMetni(kurbanBayrami.oturumlar[0].tarih),
    tema: 'amber',
  },
  '/23-nisan': milli('23-nisan'),
  '/19-mayis': milli('19-mayis'),
  '/30-agustos': milli('30-agustos'),
  '/29-ekim': milli('29-ekim'),
  '/yilbasi': milli('yilbasi'),
  '/1-mayis': milli('1-mayis'),
  '/15-temmuz': milli('15-temmuz'),
  '/ales': { etiket: `ÖSYM · ${ales.yil}`, baslik: "ALES'e kaç gün kaldı?", alt: `ALES/1: ${tarihMetni(ales.oturumlar[0].tarih)}`, tema: 'purple' },
  '/yds': { etiket: `ÖSYM · ${yds.yil}`, baslik: "YDS'ye kaç gün kaldı?", alt: `YDS/1: ${tarihMetni(yds.oturumlar[0].tarih)}`, tema: 'cyan' },
  '/yariyil-tatili': { etiket: `MEB · ${okul.donem}`, baslik: 'Yarıyıl tatiline kaç gün kaldı?', alt: `Karne günü: ${tarihMetni(okul.karne1)}`, tema: 'indigo' },
  '/ara-tatil': { etiket: `MEB · ${okul.donem}`, baslik: 'Ara tatile kaç gün kaldı?', alt: `${tarihMetni(okul.araTatil2.baslangic, { gunAdi: false })} – ${tarihMetni(okul.araTatil2.bitis, { gunAdi: false })}`, tema: 'indigo' },
  '/okullarin-kapanmasi': { etiket: `MEB · ${okul.donem}`, baslik: 'Okulların kapanmasına kaç gün kaldı?', alt: `Son ders günü: ${tarihMetni(okul.kapanis)}`, tema: 'indigo' },
  '/ozel': {
    etiket: 'Özel Sayaç',
    baslik: 'Kendi geri sayımını oluştur',
    alt: 'Doğum günü, tatil, askerlik, düğün… Tarihi gir, paylaş.',
    tema: 'rose',
  },
};

export function sayfaGorseli(yol) {
  return ogResim(ogSayfalar[yol]);
}
