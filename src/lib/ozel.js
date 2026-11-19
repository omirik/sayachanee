// Özel sayaçların paylaşım bağlantısı.
// Biçim: /ozel/paylas?ad=Tatil&t=2027-07-01T09:00  (t = Türkiye saatiyle)
import { trParcalar } from './zaman';

export const AD_UZUNLUGU = 60;
const iki = (n) => String(n).padStart(2, '0');

export function paylasimYolu(isim, hedefMs) {
  const p = trParcalar(hedefMs);
  const t = `${p.yil}-${iki(p.ay + 1)}-${iki(p.gun)}T${iki(p.saat)}:${iki(p.dakika)}`;
  return `/ozel/paylas?ad=${encodeURIComponent(isim.trim())}&t=${t}`;
}

// Bağlantıdaki ad ve t değerlerini çözer; geçersizse null döner.
export function paylasimCoz(ad, t) {
  if (typeof ad !== 'string' || typeof t !== 'string') return null;
  const isim = ad.trim().slice(0, AD_UZUNLUGU);
  if (!isim || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(t)) return null;
  const hedef = new Date(`${t}:00+03:00`).getTime();
  if (Number.isNaN(hedef)) return null;
  // 30 Şubat gibi var olmayan tarihleri ele: geri çevirince aynı gün çıkmalı.
  const p = trParcalar(hedef);
  if (p.gun !== Number(t.slice(8, 10)) || p.ay + 1 !== Number(t.slice(5, 7))) return null;
  return { isim, hedef };
}
