'use client';
import { useEffect, useState } from 'react';
import { Moon, Sunset } from 'lucide-react';
import PaylasimDugmeleri from '@/components/PaylasimDugmeleri';
import TamEkranDugmesi from '@/components/TamEkran';
import { kalanSure } from '@/lib/zaman';

const iki = (n) => String(n).padStart(2, '0');
const vakitAni = (tarih, saat) => Date.parse(`${tarih}T${saat}:00+03:00`);

// Verilen günler içinde şu andan sonraki ilk vakit
function siradaki(gunler, alan, simdi) {
  for (const g of gunler) {
    const t = vakitAni(g.tarih, g[alan]);
    if (t > simdi) return { zaman: t, saat: g[alan] };
  }
  return null;
}

/**
 * Şehir sayfasındaki iftar ve sahur (imsak) geri sayımı.
 * gunler: bugün ve sonraki birkaç günün resmi vakitleri [{ tarih, imsak, aksam }]
 */
export default function SehirVakitSayaci({ sehir, yol, gunler }) {
  const [simdi, setSimdi] = useState(null);

  useEffect(() => {
    const guncelle = () => setSimdi(Date.now());
    const ilk = setTimeout(guncelle, 0);
    const z = setInterval(guncelle, 1000);
    return () => {
      clearTimeout(ilk);
      clearInterval(z);
    };
  }, []);

  const iftar = simdi ? siradaki(gunler, 'aksam', simdi) : null;
  const sahur = simdi ? siradaki(gunler, 'imsak', simdi) : null;
  const ilkOlan = iftar && sahur ? (iftar.zaman < sahur.zaman ? 'iftar' : 'sahur') : null;

  const kartlar = [
    { anahtar: 'iftar', baslik: 'İftara kalan', alt: 'Akşam ezanı', Ikon: Sunset, v: iftar, renk: 'text-amber-400', cerceve: 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.12)]' },
    { anahtar: 'sahur', baslik: 'Sahura kalan', alt: 'İmsak vakti', Ikon: Moon, v: sahur, renk: 'text-blue-300', cerceve: 'border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.12)]' },
  ];

  function paylasimMetni() {
    const v = ilkOlan === 'sahur' ? sahur : iftar;
    if (!v || !simdi) return `${sehir} iftar ve sahur vakitleri`;
    const k = kalanSure(v.zaman - simdi);
    const sure = k.saat > 0 ? `${k.saat} saat ${k.dakika} dakika` : `${k.dakika} dakika`;
    return `🌙 ${sehir} için ${ilkOlan === 'sahur' ? 'sahura' : 'iftara'} ${sure} kaldı! (${ilkOlan === 'sahur' ? 'İmsak' : 'İftar'} ${v.saat})`;
  }

  // Instagram hikâye görseli: "Samsun için iftara · 3:12 · saat kaldı · İftar 17:18"
  function hikayeBilgisi() {
    const v = ilkOlan === 'sahur' ? sahur : iftar;
    if (!v) return null;
    const k = kalanSure(v.zaman - Date.now());
    return {
      ust: `${sehir} için ${ilkOlan === 'sahur' ? 'sahura' : 'iftara'}`,
      sayi: `${k.gun * 24 + k.saat}:${iki(k.dakika)}`,
      birim: 'saat kaldı',
      alt: `${ilkOlan === 'sahur' ? 'İmsak' : 'İftar'} ${v.saat}`,
    };
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mb-8" role="timer" aria-live="off">
        {kartlar.map(({ anahtar, baslik, alt, Ikon, v, renk, cerceve }) => {
          const k = v && simdi ? kalanSure(v.zaman - simdi) : null;
          const toplamSaat = k ? k.gun * 24 + k.saat : null;
          return (
            <div
              key={anahtar}
              className={`flex flex-col items-center p-6 rounded-3xl bg-zinc-900/60 border ${ilkOlan === anahtar ? cerceve : 'border-zinc-800/80'}`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-400">
                <Ikon size={16} className={renk} /> {baslik}
              </span>
              <span className={`mt-3 text-5xl md:text-6xl font-bold tabular-nums tracking-tight ${ilkOlan === anahtar ? renk : 'text-white'}`}>
                {k ? `${iki(toplamSaat)}:${iki(k.dakika)}:${iki(k.saniye)}` : '--:--:--'}
              </span>
              <span className="mt-2 text-zinc-400 text-sm">
                {alt}: <span className="text-zinc-200 font-semibold">{v?.saat ?? '--:--'}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="mb-14 flex flex-col items-center gap-4">
        {ilkOlan && (
          <TamEkranDugmesi
            hedef={(ilkOlan === 'iftar' ? iftar : sahur).zaman}
            tema={ilkOlan === 'iftar' ? 'amber' : 'blue'}
            altBaslik={ilkOlan === 'iftar' ? `İftar · ${iftar.saat}` : `İmsak · ${sahur.saat}`}
            kutlama={ilkOlan === 'iftar' ? 'Hayırlı iftarlar! 🌙' : 'İmsak vakti girdi 🌙'}
          />
        )}
        <PaylasimDugmeleri yol={yol} baslik={`${sehir} İftar ve Sahur Vakti`} metin={paylasimMetni} hikaye={hikayeBilgisi} tema="amber" />
      </div>
    </>
  );
}
