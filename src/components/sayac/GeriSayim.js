'use client';
import { useEffect, useState } from 'react';
import { Activity, PartyPopper } from 'lucide-react';
import { temalar } from '@/lib/tema';
import { kalanSure, yillikTarihler } from '@/lib/zaman';
import TamEkranDugmesi from '@/components/TamEkran';

const BIRIMLER = [
  { anahtar: 'gun', etiket: 'Gün' },
  { anahtar: 'saat', etiket: 'Saat' },
  { anahtar: 'dakika', etiket: 'Dakika' },
  { anahtar: 'saniye', etiket: 'Saniye' },
];

const ikiHane = (n) => String(n).padStart(2, '0');

/**
 * Canlı geri sayım + ilerleme çubuğu.
 *
 * Sabit tarih için:   <GeriSayim hedef="2027-06-13T09:30:00+03:00" baslangic="2026-09-01T00:00:00+03:00" />
 * Her yıl tekrar için: <GeriSayim tekrar={{ ay: 10, gun: 29, ad: '29 Ekim' }} />
 */
export default function GeriSayim({
  hedef,
  baslangic,
  tekrar,
  baslangicEtiketi = 'Başlangıç',
  bitisEtiketi = 'Hedef',
  tema = 'emerald',
  bittiMesaji = 'Geri sayım tamamlandı.',
  altBaslik, // tam ekranda başlığın altında (ör. "TYT")
  kutlama, // tam ekranda sıfırda görünen kutlama yazısı
}) {
  const t = temalar[tema];
  // Sunucuda ve ilk yüklemede "--" gösterilir; saat ancak tarayıcıda bilinir.
  const [durum, setDurum] = useState(null);
  const tekrarAy = tekrar?.ay;
  const tekrarGun = tekrar?.gun;
  const tekrarAd = tekrar?.ad;

  useEffect(() => {
    function hesapla() {
      const simdi = Date.now();
      let hedefMs, baslangicMs, etiketler;

      if (tekrarAy) {
        const y = yillikTarihler(tekrarAy, tekrarGun, simdi);
        hedefMs = y.hedef;
        baslangicMs = y.onceki;
        etiketler = [`${tekrarAd} ${y.yil - 1}`, `${tekrarAd} ${y.yil}`];
      } else {
        hedefMs = new Date(hedef).getTime();
        baslangicMs = baslangic ? new Date(baslangic).getTime() : null;
        etiketler = [baslangicEtiketi, bitisEtiketi];
      }

      const fark = hedefMs - simdi;
      const yuzde = baslangicMs
        ? Math.min(100, Math.max(0, ((simdi - baslangicMs) / (hedefMs - baslangicMs)) * 100))
        : null;

      setDurum({ kalan: kalanSure(fark), bitti: fark <= 0, yuzde, etiketler });
      return fark > 0;
    }

    if (!hesapla()) return;
    const zamanlayici = setInterval(() => {
      if (!hesapla()) clearInterval(zamanlayici);
    }, 1000);
    return () => clearInterval(zamanlayici);
  }, [hedef, baslangic, tekrarAy, tekrarGun, tekrarAd, baslangicEtiketi, bitisEtiketi]);

  // Tam ekran düğmesi her iki durumda da aynı anahtarla durur: sayaç bitince
  // açık olan tam ekran kapanmaz, kutlamayı gösterir.
  const tamEkran = (
    <div key="tam-ekran" className="mb-6">
      <TamEkranDugmesi
        hedef={hedef}
        tekrar={tekrarAy ? { ay: tekrarAy, gun: tekrarGun } : undefined}
        baslangic={baslangic}
        tema={tema}
        altBaslik={altBaslik}
        kutlama={kutlama}
      />
    </div>
  );

  if (durum?.bitti) {
    return (
      <>
        <div key="bitti" className="w-full max-w-2xl mb-8 flex flex-col items-center text-center gap-3 p-8 bg-zinc-900/60 border border-zinc-800/80 rounded-3xl">
          <PartyPopper size={32} className={t.metin} />
          <p className="text-lg text-zinc-200">{bittiMesaji}</p>
        </div>
        {tamEkran}
      </>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-4xl mb-12"
        role="timer"
        aria-live="off"
      >
        {BIRIMLER.map(({ anahtar, etiket }) => {
          const vurgu = anahtar === 'saniye';
          return (
            <div
              key={anahtar}
              className={`flex flex-col items-center p-5 md:p-8 bg-zinc-900/60 border rounded-3xl shadow-lg ${vurgu ? t.vurguKart : 'border-zinc-800/80'}`}
            >
              <span className={`text-4xl md:text-6xl font-bold tabular-nums tracking-tight ${vurgu ? t.metin : 'text-white'}`}>
                {durum ? ikiHane(durum.kalan[anahtar]) : '--'}
              </span>
              <span className="text-zinc-400 text-xs md:text-sm mt-3 uppercase tracking-widest font-semibold">{etiket}</span>
            </div>
          );
        })}
      </div>

      {durum?.yuzde != null && (
        <div className="w-full max-w-4xl flex flex-col mb-8">
          <div className="flex justify-between items-end mb-3 px-1">
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5">
              <Activity size={14} className={t.ikon} /> Süreç İlerlemesi
            </span>
            <span className={`${t.metin} font-mono text-sm font-bold tracking-wider`}>%{durum.yuzde.toFixed(2)}</span>
          </div>
          <div
            className="w-full h-3 bg-zinc-900/80 rounded-full border border-zinc-800/80 overflow-hidden relative"
            role="progressbar"
            aria-valuenow={Math.round(durum.yuzde)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Geçen süre"
          >
            <div
              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${t.cubuk} rounded-full transition-[width] duration-1000 ease-linear`}
              style={{ width: `${durum.yuzde}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 px-1 text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest font-semibold">
            <span>{durum.etiketler[0]}</span>
            <span>{durum.etiketler[1]}</span>
          </div>
        </div>
      )}

      {tamEkran}
    </>
  );
}
