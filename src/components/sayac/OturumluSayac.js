'use client';
import { useState, useSyncExternalStore } from 'react';
import { Calendar, Clock } from 'lucide-react';
import GeriSayim from './GeriSayim';
import { temalar } from '@/lib/tema';
import { tarihMetni, saatMetni } from '@/lib/zaman';

function depoyuDinle(degisince) {
  window.addEventListener('storage', degisince);
  return () => window.removeEventListener('storage', degisince);
}

function depodanOku(anahtar) {
  if (!anahtar) return null;
  try {
    return localStorage.getItem(anahtar);
  } catch {
    return null;
  }
}

/**
 * Birden fazla oturumu olan sınavlar için (ör. YKS: TYT/AYT/YDT) seçici + geri sayım.
 * Tek oturumluysa seçici gösterilmez.
 */
export default function OturumluSayac({
  oturumlar,
  baslangic,
  baslangicEtiketi,
  tema = 'emerald',
  depoAnahtari,
  bittiMesaji,
  saatGoster = true,
  bitisEtiketi,
}) {
  const t = temalar[tema];
  const [secimAdi, setSecimAdi] = useState(null);

  // Son seçilen oturumu hatırla (sunucuda ve tarayıcı izin vermezse null döner).
  const kayitliAd = useSyncExternalStore(
    depoyuDinle,
    () => depodanOku(depoAnahtari),
    () => null,
  );

  function sec(i) {
    setSecimAdi(oturumlar[i].ad);
    try {
      if (depoAnahtari) localStorage.setItem(depoAnahtari, oturumlar[i].ad);
    } catch {}
  }

  const aktifAd = secimAdi ?? kayitliAd;
  const secili = Math.max(0, oturumlar.findIndex((o) => o.ad === aktifAd));
  const oturum = oturumlar[secili];

  return (
    <>
      {oturumlar.length > 1 && (
        <div className="flex flex-wrap justify-center gap-1 p-1.5 mb-6 bg-zinc-900/80 border border-zinc-700/60 rounded-full" role="tablist" aria-label="Oturum seç">
          {oturumlar.map((o, i) => (
            <button
              key={o.ad}
              role="tab"
              aria-selected={i === secili}
              onClick={() => sec(i)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${i === secili ? t.secili : 'text-zinc-400 hover:text-white'}`}
            >
              {o.ad}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-x-5 gap-y-1 text-zinc-300 font-medium mb-10 text-center">
        <span className="flex items-center gap-2">
          <Calendar size={16} className={t.ikon} />
          {tarihMetni(oturum.tarih)}
        </span>
        {saatGoster && (
          <span className="flex items-center gap-2">
            <Clock size={16} className={t.ikon} />
            {saatMetni(oturum.tarih)}
            {oturumlar.length > 1 && <span className="text-zinc-400">· {oturum.tamAd}</span>}
          </span>
        )}
      </div>

      <GeriSayim
        hedef={oturum.tarih}
        baslangic={baslangic}
        baslangicEtiketi={baslangicEtiketi}
        bitisEtiketi={bitisEtiketi ?? (oturumlar.length > 1 ? `${oturum.ad} Günü` : 'Sınav Günü')}
        tema={tema}
        bittiMesaji={bittiMesaji}
      />
    </>
  );
}
