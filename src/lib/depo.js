// Tarayıcı hafızası (localStorage) yardımcıları.
// React'in useSyncExternalStore'u ile kullanılır: sunucuda null döner, tarayıcıda
// kayıtlı değeri okur ve değişince bileşenleri günceller.
// Tarayıcı kaydetmeye izin vermezse (gizli sekme vb.) değerler sayfa açık kaldıkça bellekte tutulur.

const OLAY = 'sayachane-depo';
const bellek = new Map();

export function depoyuDinle(degisince) {
  window.addEventListener('storage', degisince);
  window.addEventListener(OLAY, degisince);
  return () => {
    window.removeEventListener('storage', degisince);
    window.removeEventListener(OLAY, degisince);
  };
}

export function depodanOku(anahtar) {
  if (!anahtar) return null;
  try {
    const deger = localStorage.getItem(anahtar);
    if (deger !== null) return deger;
  } catch {}
  return bellek.get(anahtar) ?? null;
}

export function depoyaYaz(anahtar, deger) {
  bellek.set(anahtar, deger);
  try {
    localStorage.setItem(anahtar, deger);
  } catch {}
  window.dispatchEvent(new Event(OLAY));
}
