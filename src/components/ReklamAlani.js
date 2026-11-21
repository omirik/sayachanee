'use client';
import { useEffect, useRef } from 'react';
import { REKLAM } from '@/lib/reklam';

/**
 * AdSense reklam alanı. Reklamlar kapalıyken ya da alanın slot numarası yokken hiçbir şey göstermez.
 * Sayfa reklam yüklenince kaymasın diye alan için önceden yükseklik ayrılır.
 */
export default function ReklamAlani({ alan, className = '' }) {
  const slot = REKLAM.alanlar[alan];
  const itildi = useRef(false);
  const aktif = REKLAM.acik && Boolean(slot);

  useEffect(() => {
    if (!aktif || itildi.current) return;
    itildi.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [aktif]);

  if (!aktif) return null;

  return (
    <aside className={`w-full max-w-4xl my-10 ${className}`} aria-label="Reklam">
      <p className="text-[10px] uppercase tracking-widest text-zinc-600 text-center mb-1">Reklam</p>
      <div className="min-h-[280px] flex items-center justify-center">
        <ins
          className="adsbygoogle block w-full"
          data-ad-client={REKLAM.istemci}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
