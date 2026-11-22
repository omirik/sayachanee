'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Maximize2, Timer, X } from 'lucide-react';
import { temalar } from '@/lib/tema';
import { kalanSure, yillikTarihler, tarihMetni } from '@/lib/zaman';

const iki = (n) => String(n).padStart(2, '0');
const KUTLAMA_SURESI = 60 * 1000; // tekrar eden günlerde (yılbaşı vb.) kutlama 1 dakika ekranda kalır

// Konfeti parçaları: rastgele yerine sıraya bağlı sabit değerler (her açılışta aynı, saf render).
const RENKLER = ['#34d399', '#fbbf24', '#f87171', '#60a5fa', '#c084fc', '#fb7185'];
const KONFETI = Array.from({ length: 70 }, (_, i) => ({
  sol: (i * 37) % 100,
  gecikme: ((i * 13) % 20) / 10,
  sure: 2.6 + ((i * 7) % 10) / 4,
  boyut: 8 + ((i * 5) % 8),
  renk: RENKLER[i % RENKLER.length],
  yuvarlak: i % 3 === 0,
}));

/**
 * "Tam ekran" düğmesi + tam ekran geri sayım görünümü.
 * Televizyona/projeksiyona yansıtmak için: dev rakamlar, menü/reklam yok, ekran uyumaz,
 * son 10 saniyede büyük sayaç, sıfırda kutlama ve konfeti.
 *
 * hedef: ISO tarih ya da ms   |   tekrar: { ay, gun } (her yıl tekrar eden günler)
 * baslangic: ilerleme çubuğu için başlangıç (isteğe bağlı)
 */
export default function TamEkranDugmesi({ hedef, tekrar, baslangic, tema = 'emerald', altBaslik, kutlama = 'Zaman geldi! 🎉' }) {
  const [acik, setAcik] = useState(false);
  const [baslik, setBaslik] = useState('');
  // Açıldığı andaki hedef sabitlenir: iftar/sahur gibi hedefi sonradan değişen sayfalarda
  // vakit girince kutlama gösterilsin, hemen bir sonraki vakte atlanmasın.
  const [sabitHedef, setSabitHedef] = useState(null);

  function ac() {
    setBaslik(document.querySelector('main h1')?.textContent ?? '');
    setSabitHedef(hedef);
    setAcik(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={ac}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
      >
        <Maximize2 size={15} /> Tam ekran
      </button>
      {acik && (
        <TamEkranGorunumu
          hedef={sabitHedef}
          tekrar={tekrar}
          baslangic={baslangic}
          tema={tema}
          baslik={baslik}
          altBaslik={altBaslik}
          kutlama={kutlama}
          kapat={() => setAcik(false)}
        />
      )}
    </>
  );
}

// Değişince hafifçe aşağıdan kayarak gelen rakam grubu (yarı saydam başlar, hiç kaybolmaz → titremez)
function Rakam({ deger, className = '', style }) {
  return (
    <span key={deger} className={`inline-block animate-in fade-in-50 slide-in-from-bottom-1 duration-200 ease-out ${className}`} style={style}>
      {deger}
    </span>
  );
}

function TamEkranGorunumu({ hedef, tekrar, baslangic, tema, baslik, altBaslik, kutlama, kapat }) {
  const t = temalar[tema] ?? temalar.emerald;
  const renk = t.hex;
  const kutu = useRef(null);
  const [simdi, setSimdi] = useState(() => Date.now());
  const [kontroller, setKontroller] = useState(true);
  const gizleZamani = useRef(null);

  // Saniyede 4 kez güncelle (saniye geçişleri tam zamanında görünsün)
  useEffect(() => {
    const z = setInterval(() => setSimdi(Date.now()), 250);
    return () => clearInterval(z);
  }, []);

  const kapatTamamen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    kapat();
  }, [kapat]);

  // Gerçek tam ekran (destekleyen tarayıcılarda), ekranın uyumasını engelleme, Esc ile kapatma
  useEffect(() => {
    const el = kutu.current;
    el?.requestFullscreen?.().catch(() => {}); // iPhone Safari desteklemez: sayfayı kaplayan görünüm yeterli

    let kilit = null;
    const kilitAl = async () => {
      try {
        kilit = await navigator.wakeLock?.request('screen');
      } catch {}
    };
    kilitAl();
    const gorunurluk = () => document.visibilityState === 'visible' && kilitAl();
    const tamEkranDegisti = () => !document.fullscreenElement && kapat();
    const tus = (e) => e.key === 'Escape' && kapatTamamen();

    document.addEventListener('visibilitychange', gorunurluk);
    document.addEventListener('fullscreenchange', tamEkranDegisti);
    document.addEventListener('keydown', tus);
    document.body.style.overflow = 'hidden';
    return () => {
      kilit?.release?.().catch(() => {});
      document.removeEventListener('visibilitychange', gorunurluk);
      document.removeEventListener('fullscreenchange', tamEkranDegisti);
      document.removeEventListener('keydown', tus);
      document.body.style.overflow = '';
    };
  }, [kapat, kapatTamamen]);

  // Fare/dokunma yokken kapatma düğmesini ve imleci gizle
  const hareket = () => {
    setKontroller(true);
    clearTimeout(gizleZamani.current);
    gizleZamani.current = setTimeout(() => setKontroller(false), 3000);
  };
  useEffect(() => {
    gizleZamani.current = setTimeout(() => setKontroller(false), 3000);
    return () => clearTimeout(gizleZamani.current);
  }, []);

  // Hedef, ilerleme ve kutlama durumu
  let hedefMs;
  let oncekiMs = baslangic ? new Date(baslangic).getTime() : null;
  let kutlamaVar = false;
  if (tekrar) {
    const y = yillikTarihler(tekrar.ay, tekrar.gun, simdi);
    hedefMs = y.hedef;
    oncekiMs = y.onceki;
    kutlamaVar = simdi - y.onceki < KUTLAMA_SURESI;
  } else {
    hedefMs = typeof hedef === 'number' ? hedef : new Date(hedef).getTime();
    kutlamaVar = hedefMs <= simdi;
  }
  const fark = hedefMs - simdi;
  const k = kalanSure(fark);
  const sonOnSaniye = !kutlamaVar && fark > 0 && fark <= 10000;
  const yuzde = oncekiMs && !kutlamaVar ? Math.min(100, Math.max(0, ((simdi - oncekiMs) / (hedefMs - oncekiMs)) * 100)) : null;

  const isilti = { textShadow: `0 0 60px ${renk}55, 0 0 140px ${renk}30` };

  return (
    <div
      ref={kutu}
      onMouseMove={hareket}
      onTouchStart={hareket}
      className={`fixed inset-0 z-[100] flex flex-col overflow-hidden bg-zinc-950 text-white select-none ${kontroller ? '' : 'cursor-none'}`}
      role="dialog"
      aria-modal="true"
      aria-label="Tam ekran geri sayım"
    >
      {/* Arka plan: yavaşça süzülen renkli ışıklar + kenar karartması */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-[25vh] -left-[15vw] h-[80vh] w-[80vh] rounded-full blur-[120px] opacity-25"
          style={{ background: renk, animation: 'suzul 22s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-[30vh] -right-[10vw] h-[90vh] w-[90vh] rounded-full blur-[140px] opacity-[0.18]"
          style={{ background: renk, animation: 'suzul 28s ease-in-out -9s infinite reverse' }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)' }} />
      </div>

      {/* Üst şerit */}
      <header className={`relative z-10 flex items-center justify-between px-[4vw] pt-[3vh] transition-opacity duration-500 ${kontroller ? 'opacity-100' : 'opacity-40'}`}>
        <span className="flex items-center gap-2 text-zinc-300 font-semibold tracking-tight text-[clamp(0.9rem,1.4vw,1.4rem)]">
          <Timer className="text-emerald-500 w-[1.2em] h-[1.2em]" /> Sayaçhane
        </span>
        <button
          type="button"
          onClick={kapatTamamen}
          aria-label="Tam ekrandan çık"
          className={`p-3 rounded-full bg-white/5 border border-white/10 text-zinc-200 hover:bg-white/10 transition-opacity ${kontroller ? 'opacity-100' : 'opacity-0'}`}
        >
          <X size={22} />
        </button>
      </header>

      {/* Orta alan */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-[4vw] text-center">
        <p className="text-[clamp(1.4rem,3.6vw,3.4rem)] font-bold tracking-tight leading-tight">{baslik}</p>
        <p className="mt-[1vh] text-[clamp(0.9rem,1.6vw,1.5rem)] text-zinc-400">
          {altBaslik ? `${altBaslik} · ` : ''}
          {tarihMetni(hedefMs)}
        </p>

        {kutlamaVar ? (
          <p
            className="mt-[6vh] text-[clamp(3rem,10vw,11rem)] font-extrabold leading-[1.05] animate-in zoom-in-50 fade-in duration-700"
            style={isilti}
          >
            {kutlama}
          </p>
        ) : sonOnSaniye ? (
          <span
            key={Math.ceil(fark / 1000)}
            className="mt-[2vh] font-black tabular-nums leading-none text-[min(48vw,58vh)] animate-in zoom-in-75 fade-in duration-300"
            style={{ color: renk, ...isilti }}
          >
            {Math.ceil(fark / 1000)}
          </span>
        ) : k.gun > 0 ? (
          <>
            {/* Gün: kahraman sayı */}
            <div className="mt-[3vh] flex flex-col items-center">
              <span
                className="font-black tabular-nums leading-[0.82] tracking-[-0.05em] text-[min(30vw,30vh)] bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent"
                style={{ filter: `drop-shadow(0 0 50px ${renk}40)` }}
              >
                {k.gun}
              </span>
              <span className="mt-[2vh] uppercase tracking-[0.6em] pl-[0.6em] text-zinc-400 font-semibold text-[clamp(0.85rem,1.5vw,1.4rem)]">
                gün
              </span>
            </div>

            {/* Saat / dakika / saniye kartları */}
            <div className="mt-[4vh] grid grid-cols-3 gap-[1.6vw] w-full max-w-[min(80vw,1100px)]">
              {[
                ['saat', 'Saat'],
                ['dakika', 'Dakika'],
                ['saniye', 'Saniye'],
              ].map(([anahtar, etiket]) => (
                <div
                  key={anahtar}
                  className="flex flex-col items-center justify-center py-[1.8vh] rounded-[clamp(1rem,1.8vw,2rem)] border border-white/10 bg-white/[0.035] backdrop-blur-md"
                  style={anahtar === 'saniye' ? { borderColor: `${renk}55`, boxShadow: `0 0 50px ${renk}1f inset` } : undefined}
                >
                  <span className="font-bold tabular-nums leading-none text-[min(10vw,10vh)] overflow-hidden" style={anahtar === 'saniye' ? { color: renk } : undefined}>
                    <Rakam deger={iki(k[anahtar])} />
                  </span>
                  <span className="mt-[1.2vh] uppercase tracking-[0.35em] pl-[0.35em] text-zinc-500 font-semibold text-[clamp(0.6rem,1vw,1rem)]">
                    {etiket}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Son gün: saat:dakika:saniye kahraman */
          <div className="mt-[5vh] flex flex-col items-center">
          <div className="flex items-baseline justify-center font-black tabular-nums leading-none tracking-[-0.03em] text-[min(18vw,30vh)]">
            <span>{iki(k.saat)}</span>
            <span className="text-zinc-600 px-[0.5vw]">:</span>
            <span>{iki(k.dakika)}</span>
            <span className="text-zinc-600 px-[0.5vw]">:</span>
            <span className="overflow-hidden" style={{ color: renk, ...isilti }}>
              <Rakam deger={iki(k.saniye)} />
            </span>
          </div>
          <span className="mt-[2.5vh] uppercase tracking-[0.45em] pl-[0.45em] text-zinc-500 font-semibold text-[clamp(0.7rem,1.3vw,1.2rem)]">
            saat · dakika · saniye
          </span>
          </div>
        )}
      </main>

      {/* Alt şerit: ilerleme + adres */}
      <footer className="relative z-10 px-[4vw] pb-[3vh] pt-[3vh]">
        {yuzde != null && (
          <div className="mx-auto max-w-[min(80vw,1100px)] mb-[2.5vh]">
            <div className="h-[3px] rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full transition-[width] duration-1000 ease-linear" style={{ width: `${yuzde}%`, background: renk }} />
            </div>
            <p className="mt-2 text-right text-[clamp(0.65rem,1vw,0.9rem)] text-zinc-500 tabular-nums">%{yuzde.toFixed(1)}</p>
          </div>
        )}
        <p className="text-center text-[clamp(0.75rem,1.1vw,1.05rem)] text-zinc-500 font-medium tracking-wide">sayachane.com.tr</p>
      </footer>

      {/* Kutlama konfetisi */}
      {kutlamaVar && (
        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          {KONFETI.map((p, i) => (
            <span
              key={i}
              className="absolute -top-6 block"
              style={{
                left: `${p.sol}%`,
                width: p.boyut,
                height: p.yuvarlak ? p.boyut : p.boyut * 1.6,
                background: p.renk,
                borderRadius: p.yuvarlak ? '9999px' : '2px',
                animation: `konfeti ${p.sure}s linear ${p.gecikme}s infinite`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
