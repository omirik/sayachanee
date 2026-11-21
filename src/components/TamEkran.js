'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { temalar } from '@/lib/tema';
import { kalanSure, yillikTarihler } from '@/lib/zaman';

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
 */
export default function TamEkranDugmesi({ hedef, tekrar, tema = 'emerald', altBaslik, kutlama = 'Zaman geldi! 🎉' }) {
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

function TamEkranGorunumu({ hedef, tekrar, tema, baslik, altBaslik, kutlama, kapat }) {
  const t = temalar[tema] ?? temalar.emerald;
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

  // Fare/dokunma yokken kapatma düğmesini gizle
  const hareket = () => {
    setKontroller(true);
    clearTimeout(gizleZamani.current);
    gizleZamani.current = setTimeout(() => setKontroller(false), 3000);
  };
  useEffect(() => {
    gizleZamani.current = setTimeout(() => setKontroller(false), 3000);
    return () => clearTimeout(gizleZamani.current);
  }, []);

  // Hedef ve kutlama durumu
  let hedefMs;
  let kutlamaVar = false;
  if (tekrar) {
    const y = yillikTarihler(tekrar.ay, tekrar.gun, simdi);
    hedefMs = y.hedef;
    kutlamaVar = simdi - y.onceki < KUTLAMA_SURESI;
  } else {
    hedefMs = typeof hedef === 'number' ? hedef : new Date(hedef).getTime();
    kutlamaVar = hedefMs <= simdi;
  }
  const fark = hedefMs - simdi;
  const k = kalanSure(fark);
  const sonOnSaniye = !kutlamaVar && fark > 0 && fark <= 10000;

  const birimler = [
    ...(k.gun > 0 ? [['gun', 'Gün']] : []),
    ['saat', 'Saat'],
    ['dakika', 'Dakika'],
    ['saniye', 'Saniye'],
  ];

  return (
    <div
      ref={kutu}
      onMouseMove={hareket}
      onTouchStart={hareket}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-zinc-950 bg-gradient-to-br ${t.arkaPlan} select-none ${kontroller ? '' : 'cursor-none'}`}
      role="dialog"
      aria-modal="true"
      aria-label="Tam ekran geri sayım"
    >
      <button
        type="button"
        onClick={kapatTamamen}
        aria-label="Tam ekrandan çık"
        className={`absolute top-4 right-4 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-200 transition-opacity ${kontroller ? 'opacity-100' : 'opacity-0'}`}
      >
        <X size={24} />
      </button>

      <div className="text-center px-6 mb-[4vh]">
        <p className="text-[clamp(1.5rem,4.5vw,4rem)] font-bold text-white tracking-tight leading-tight">{baslik}</p>
        {altBaslik && <p className="text-[clamp(1rem,2.2vw,2rem)] text-zinc-400 mt-2">{altBaslik}</p>}
      </div>

      {kutlamaVar ? (
        <>
          <p className="text-[clamp(3rem,11vw,12rem)] font-extrabold text-white text-center leading-none px-6 animate-in zoom-in-50 fade-in duration-700">
            {kutlama}
          </p>
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
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
        </>
      ) : sonOnSaniye ? (
        <span key={Math.ceil(fark / 1000)} className={`text-[min(55vw,70vh)] font-black tabular-nums leading-none ${t.metin} animate-in zoom-in-50 fade-in duration-300`}>
          {Math.ceil(fark / 1000)}
        </span>
      ) : (
        <div className={`grid gap-[2vw] px-[3vw] w-full max-w-[1600px] ${birimler.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
          {birimler.map(([anahtar, etiket]) => (
            <div key={anahtar} className="flex flex-col items-center">
              <span className={`font-bold tabular-nums tracking-tight leading-none text-[clamp(3rem,15vw,16rem)] ${anahtar === 'saniye' ? t.metin : 'text-white'}`}>
                {anahtar === 'gun' ? k.gun : iki(k[anahtar])}
              </span>
              <span className="mt-[1.5vh] text-[clamp(0.8rem,1.6vw,1.6rem)] uppercase tracking-[0.3em] text-zinc-400 font-semibold">{etiket}</span>
            </div>
          ))}
        </div>
      )}

      <p className="absolute bottom-[3vh] text-[clamp(0.8rem,1.3vw,1.2rem)] text-zinc-500 font-medium">sayachane.com.tr</p>
    </div>
  );
}
