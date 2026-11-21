// Sitedeki tüm sayaçların listesi. Ana sayfa, menü, alt bilgi ve kategori
// sayfaları buradan beslenir. Yeni sayaç eklerken buraya da bir satır ekle.
import {
  BookOpen, Briefcase, PenTool, GraduationCap, Moon, Heart, Star, Flag, Sun, Award,
  FileText, Languages, Snowflake, Coffee, TreePalm, PartyPopper, Handshake, Landmark, Shield, Presentation,
} from 'lucide-react';
import { yks, kpss, lgs, dgs, ales, yds, msu, ags, okul, ramazan, ramazanBayrami, kurbanBayrami, milliBayramlar } from '@/data/sayaclar';
import { yillikTarihler } from '@/lib/zaman';

export const kategoriler = {
  sinav: { ad: 'Sınavlar', yol: '/sinavlar' },
  okul: { ad: 'Okul Takvimi', yol: '/okul-takvimi' },
  milli: { ad: 'Resmi Tatiller', yol: '/resmi-bayramlar' },
  dini: { ad: 'Dini Günler', yol: '/dini-gunler' },
};

// Bir sınavın henüz geçmemiş ilk oturumu (hepsi geçtiyse sonuncusu).
function siradakiOturum(sinav, simdi) {
  return (sinav.oturumlar.find((o) => new Date(o.tarih).getTime() > simdi) ?? sinav.oturumlar.at(-1)).tarih;
}

const milli = (slug, Ikon) => {
  const b = milliBayramlar[slug];
  return {
    yol: `/${slug}`,
    ad: b.ad,
    aciklama: b.tamAd,
    kategori: 'milli',
    tema: 'red',
    Ikon,
    tekrar: { ay: b.ay, gun: b.gun },
  };
};

export const sayaclar = [
  { yol: '/yks', ad: 'YKS', aciklama: 'TYT, AYT ve YDT', kategori: 'sinav', tema: 'emerald', Ikon: BookOpen, sinav: yks },
  { yol: '/kpss', ad: 'KPSS', aciklama: 'Lisans GY-GK', kategori: 'sinav', tema: 'blue', Ikon: Briefcase, sinav: kpss },
  { yol: '/lgs', ad: 'LGS', aciklama: 'Liselere Geçiş Sınavı', kategori: 'sinav', tema: 'cyan', Ikon: PenTool, sinav: lgs },
  { yol: '/dgs', ad: 'DGS', aciklama: 'Dikey Geçiş Sınavı', kategori: 'sinav', tema: 'purple', Ikon: GraduationCap, sinav: dgs },
  { yol: '/ales', ad: 'ALES', aciklama: 'Lisansüstü ve akademik kadro', kategori: 'sinav', tema: 'purple', Ikon: FileText, sinav: ales },
  { yol: '/yds', ad: 'YDS', aciklama: 'Yabancı dil sınavı', kategori: 'sinav', tema: 'cyan', Ikon: Languages, sinav: yds },
  { yol: '/msu', ad: 'MSÜ', aciklama: 'Harp okulları ve astsubaylık', kategori: 'sinav', tema: 'emerald', Ikon: Shield, sinav: msu },
  { yol: '/ags', ad: 'AGS', aciklama: 'MEB Akademi Giriş Sınavı ve ÖABT', kategori: 'sinav', tema: 'indigo', Ikon: Presentation, sinav: ags },
  { yol: '/yariyil-tatili', ad: 'Yarıyıl Tatili', aciklama: 'Karne günü', kategori: 'okul', tema: 'indigo', Ikon: Snowflake, tarih: okul.karne1 },
  { yol: '/ara-tatil', ad: 'Ara Tatil', aciklama: '2. dönem ara tatili', kategori: 'okul', tema: 'indigo', Ikon: Coffee, tarih: okul.araTatil2.baslangic },
  { yol: '/okullarin-kapanmasi', ad: 'Okulların Kapanışı', aciklama: 'Yaz tatili', kategori: 'okul', tema: 'indigo', Ikon: TreePalm, tarih: okul.kapanis },
  { yol: '/ramazan', ad: 'Ramazan', aciklama: 'İftar, sahur ve Ramazan sayacı', kategori: 'dini', tema: 'amber', Ikon: Moon, tarih: ramazan.baslangicTarihi },
  { yol: '/ramazan-bayrami', ad: 'Ramazan Bayramı', aciklama: `${ramazanBayrami.bayramGunleri.length} günlük bayram`, kategori: 'dini', tema: 'amber', Ikon: Heart, tarih: ramazanBayrami.oturumlar[0].tarih },
  { yol: '/kurban-bayrami', ad: 'Kurban Bayramı', aciklama: `${kurbanBayrami.bayramGunleri.length} günlük bayram`, kategori: 'dini', tema: 'amber', Ikon: Star, tarih: kurbanBayrami.oturumlar[0].tarih },
  milli('23-nisan', Star),
  milli('19-mayis', Sun),
  milli('30-agustos', Award),
  milli('29-ekim', Flag),
  milli('yilbasi', PartyPopper),
  milli('1-mayis', Handshake),
  milli('15-temmuz', Landmark),
];

// Her sayacın şu anki hedef zamanını (ms) ekler.
export function hedefli(sayac, simdi = Date.now()) {
  let hedef;
  if (sayac.tekrar) hedef = yillikTarihler(sayac.tekrar.ay, sayac.tekrar.gun, simdi).hedef;
  else if (sayac.sinav) hedef = new Date(siradakiOturum(sayac.sinav, simdi)).getTime();
  else hedef = new Date(sayac.tarih).getTime();
  return { ...sayac, hedef };
}

// Henüz gelmemiş sayaçlar, en yakından uzağa.
export function yaklasanlar(simdi = Date.now(), kategori) {
  return sayaclar
    .filter((s) => !kategori || s.kategori === kategori)
    .map((s) => hedefli(s, simdi))
    .sort((a, b) => {
      const aGecti = a.hedef <= simdi;
      const bGecti = b.hedef <= simdi;
      if (aGecti !== bGecti) return aGecti ? 1 : -1;
      return a.hedef - b.hedef;
    });
}
