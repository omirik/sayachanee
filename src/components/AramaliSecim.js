'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const HARFLER = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };

/** "Şanlıurfa" → "sanliurfa": aramada Türkçe karakter ve büyük/küçük harf farkı gözetilmez. */
export const sadelestir = (metin) =>
  String(metin)
    .toLocaleLowerCase('tr-TR')
    .replace(/[çğıöşüâîû]/g, (h) => HARFLER[h])
    .trim();

/**
 * Arama kutusu yalnızca fare kullanılan masaüstünde kendiliğinden odaklanır. Telefonda ve TV
 * kutularında odaklanırsa ekran klavyesi açılıp listeyi kapatır; orada kullanıcı kutuya dokununca açılır.
 */
function aramaOdaklansinMi() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(pointer: fine)').matches && !/Android|TV|Tizen|Web0S|CrKey|AFT/i.test(navigator.userAgent);
}

const SECILI = {
  rose: 'bg-rose-500/20 text-rose-400 font-bold',
  notr: 'bg-zinc-800 text-white font-semibold',
};

/**
 * Aramalı açılır liste: tıklanınca üstte arama kutusu, altında kaydırılabilir seçenekler açılır.
 * - Sayılarda baştan eşleşir ("2" → 2, 20–29), metinlerde Türkçe karakter duyarsız arar.
 * - Enter ilk/işaretli sonucu seçer, ↑↓ gezinir, Esc kapatır.
 * - ▲▼ düğmeleri imleçle kullanılan TV tarayıcılarında kaydırmayı kolaylaştırır.
 */
export default function AramaliSecim({
  secenekler, // [{ etiket, deger }]
  deger,
  onSec,
  etiket, // ekran okuyucu adı (ör. "Gün")
  aramaTuru = 'metin', // 'metin' | 'sayi'
  aramaIpucu = 'Ara…',
  vurgu = 'notr',
  sinif = 'w-full',
  dugmeSinifi, // string ya da (acik) => string
  panelSinifi = 'left-0 w-full',
  listeYuksekligi = 'max-h-48',
  children, // düğme içeriği: node ya da (acik) => node
}) {
  const [acik, setAcik] = useState(false);
  const [arama, setArama] = useState('');
  const [aktif, setAktif] = useState(0);
  const kutu = useRef(null);
  const dugme = useRef(null);
  const girdi = useRef(null);
  const liste = useRef(null);

  const filtreli = useMemo(() => {
    const q = sadelestir(arama);
    if (!q) return secenekler;
    if (aramaTuru === 'sayi') {
      return secenekler.filter((s) => String(s.deger).startsWith(q) || String(s.etiket).startsWith(q));
    }
    const baslayan = [];
    const iceren = [];
    for (const s of secenekler) {
      const e = sadelestir(s.etiket);
      if (e.startsWith(q)) baslayan.push(s);
      else if (e.includes(q)) iceren.push(s);
    }
    return [...baslayan, ...iceren];
  }, [arama, secenekler, aramaTuru]);

  function ac() {
    setArama('');
    setAktif(Math.max(0, secenekler.findIndex((s) => s.deger === deger)));
    setAcik(true);
  }

  function kapat(odagiGeriVer) {
    setAcik(false);
    setArama('');
    if (odagiGeriVer) dugme.current?.focus();
  }

  function sec(s) {
    onSec(s.deger);
    kapat(true);
  }

  function kaydir(yon) {
    const l = liste.current;
    if (l) l.scrollBy({ top: yon * l.clientHeight * 0.8, behavior: 'smooth' });
  }

  function tus(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!acik) return ac();
      const adim = e.key === 'ArrowDown' ? 1 : -1;
      setAktif((a) => Math.min(filtreli.length - 1, Math.max(0, a + adim)));
    } else if (e.key === 'Escape' && acik) {
      e.preventDefault();
      kapat(true);
    } else if (e.key === 'Enter' && acik && e.target === girdi.current) {
      e.preventDefault(); // formu göndermesin
      const s = filtreli[aktif] ?? filtreli[0];
      if (s) sec(s);
    } else if (acik && e.key.length === 1 && e.key !== ' ' && !e.ctrlKey && !e.metaKey && !e.altKey && e.target !== girdi.current) {
      // Liste açıkken klavyeden yazılan harf doğrudan arama kutusuna gider.
      girdi.current?.focus();
    }
  }

  // Klavyeyle işaretlenen seçeneği listede görünür tut (sayfayı kaydırmadan).
  useEffect(() => {
    const l = liste.current;
    const el = l?.querySelector('[data-aktif="true"]');
    if (!el) return;
    const ust = el.offsetTop;
    const alt = ust + el.offsetHeight;
    if (ust < l.scrollTop) l.scrollTop = ust;
    else if (alt > l.scrollTop + l.clientHeight) l.scrollTop = alt - l.clientHeight;
  }, [aktif, arama]);

  // Açılınca: seçili değeri ortala, masaüstünde aramaya odaklan, dışarı tıklanınca kapan.
  useEffect(() => {
    if (!acik) return;
    const l = liste.current;
    const el = l?.querySelector('[aria-selected="true"]');
    if (l && el) l.scrollTop = el.offsetTop - l.clientHeight / 2 + el.offsetHeight / 2;
    if (aramaOdaklansinMi()) girdi.current?.focus({ preventScroll: true });

    const disari = (e) => {
      if (!kutu.current?.contains(e.target)) {
        setAcik(false);
        setArama('');
      }
    };
    document.addEventListener('mousedown', disari);
    document.addEventListener('touchstart', disari, { passive: true });
    return () => {
      document.removeEventListener('mousedown', disari);
      document.removeEventListener('touchstart', disari);
    };
  }, [acik]);

  const kaydirmaDugmesi = 'w-full flex justify-center py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors';

  return (
    <div ref={kutu} onKeyDown={tus} className={`relative ${sinif} ${acik ? 'z-50' : 'z-10'}`}>
      <button
        ref={dugme}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={acik}
        aria-label={etiket}
        onClick={() => (acik ? kapat(false) : ac())}
        className={typeof dugmeSinifi === 'function' ? dugmeSinifi(acik) : dugmeSinifi}
      >
        {typeof children === 'function' ? children(acik) : children}
      </button>

      {acik && (
        <div className={`absolute top-full mt-2 ${panelSinifi} min-w-[9rem] bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150`}>
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-zinc-800 bg-zinc-950">
            <Search size={14} className="text-zinc-500 shrink-0" />
            <input
              ref={girdi}
              type="text"
              inputMode={aramaTuru === 'sayi' ? 'numeric' : 'search'}
              enterKeyHint="go"
              autoComplete="off"
              value={arama}
              onChange={(e) => {
                setArama(e.target.value);
                setAktif(0);
              }}
              placeholder={aramaIpucu}
              aria-label={`${etiket} ara`}
              className="w-full min-w-0 bg-transparent text-sm text-white placeholder-zinc-500 outline-none focus-visible:outline-none"
            />
          </div>

          <button type="button" tabIndex={-1} aria-label="Yukarı kaydır" onMouseDown={(e) => e.preventDefault()} onClick={() => kaydir(-1)} className={`${kaydirmaDugmesi} border-b border-zinc-800`}>
            <ChevronUp size={16} />
          </button>

          <div ref={liste} role="listbox" aria-label={etiket} className={`relative ${listeYuksekligi} overflow-y-auto py-1`}>
            {filtreli.length === 0 ? (
              <p className="px-4 py-3 text-sm text-zinc-500">Sonuç yok</p>
            ) : (
              filtreli.map((s, i) => {
                const secili = s.deger === deger;
                const isaretli = i === aktif;
                return (
                  <button
                    key={s.deger}
                    type="button"
                    role="option"
                    aria-selected={secili}
                    data-aktif={isaretli}
                    onClick={() => sec(s)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      secili ? SECILI[vurgu] : isaretli ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    } ${isaretli && !secili ? 'ring-1 ring-inset ring-zinc-500' : ''}`}
                  >
                    {s.etiket}
                  </button>
                );
              })
            )}
          </div>

          <button type="button" tabIndex={-1} aria-label="Aşağı kaydır" onMouseDown={(e) => e.preventDefault()} onClick={() => kaydir(1)} className={`${kaydirmaDugmesi} border-t border-zinc-800`}>
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
