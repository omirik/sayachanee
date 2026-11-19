'use client';
import { useEffect, useState } from 'react';
import { kalanSure, yillikTarihler } from '@/lib/zaman';

const ikiHane = (n) => String(n).padStart(2, '0');

/**
 * Kartlarda kullanılan küçük canlı sayaç: "123 gün · 04:12:09".
 * İlk değer sunucuda hesaplanan zamana göre gösterilir (sayfa HTML'inde hazır olsun diye),
 * sonra tarayıcıda her saniye güncellenir.
 */
export default function KalanSure({ hedef, sunucuZamani, tekrar, vurgu = 'text-white', boyut = 'normal' }) {
  const [simdi, setSimdi] = useState(sunucuZamani);

  useEffect(() => {
    const guncelle = () => setSimdi(Date.now());
    const ilk = setTimeout(guncelle, 0);
    const zamanlayici = setInterval(guncelle, 1000);
    return () => {
      clearTimeout(ilk);
      clearInterval(zamanlayici);
    };
  }, []);

  // Her yıl tekrar eden günlerde tarih geçince bir sonraki yıla geç.
  const hedefMs = tekrar && hedef <= simdi ? yillikTarihler(tekrar.ay, tekrar.gun, simdi).hedef : hedef;
  const fark = hedefMs - simdi;

  if (fark <= 0) {
    return <span className="text-zinc-400 font-semibold">Tamamlandı</span>;
  }

  const k = kalanSure(fark);
  const buyuk = boyut === 'buyuk';

  return (
    <span className="flex flex-col">
      <span className="flex items-baseline gap-1.5">
        {k.gun > 0 ? (
          <>
            <span className={`${buyuk ? 'text-6xl md:text-8xl' : 'text-4xl'} font-bold tabular-nums tracking-tight ${vurgu}`}>{k.gun}</span>
            <span className={`${buyuk ? 'text-xl md:text-2xl' : 'text-base'} font-semibold text-zinc-400`}>gün</span>
          </>
        ) : (
          <span className={`${buyuk ? 'text-5xl md:text-7xl' : 'text-3xl'} font-bold tracking-tight ${vurgu}`}>Bugün!</span>
        )}
      </span>
      <span className={`font-mono tabular-nums text-zinc-400 ${buyuk ? 'text-lg md:text-2xl mt-1' : 'text-sm'}`}>
        {ikiHane(k.saat)}:{ikiHane(k.dakika)}:{ikiHane(k.saniye)}
      </span>
    </span>
  );
}
