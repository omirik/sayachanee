'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BookmarkPlus, Check } from 'lucide-react';
import { depodanOku, depoyaYaz } from '@/lib/depo';

const DEPO = 'sayachane_ozel_sayaclar';

// Paylaşılan bir sayacı ziyaretçinin kendi "Sayaçlarım" listesine ekler.
export default function KaydetDugmesi({ isim, hedef }) {
  const [durum, setDurum] = useState('bekliyor'); // bekliyor | eklendi | hata

  function kaydet() {
    try {
      const liste = JSON.parse(depodanOku(DEPO) || '[]');
      const zatenVar = liste.some((s) => s.isim === isim && s.hedef === hedef);
      if (!zatenVar) {
        liste.push({ id: Date.now().toString(), isim, hedef, baslangic: Date.now() });
        depoyaYaz(DEPO, JSON.stringify(liste));
      }
      setDurum('eklendi');
    } catch {
      setDurum('hata');
    }
  }

  if (durum === 'eklendi') {
    return (
      <Link href="/ozel" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
        <Check size={16} /> Sayaçlarına eklendi · Listeyi gör
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={kaydet}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 transition-colors"
      >
        <BookmarkPlus size={16} /> Sayaçlarıma Ekle
      </button>
      {durum === 'hata' && <p className="text-sm text-red-400">Tarayıcın kaydetmeye izin vermedi.</p>}
    </div>
  );
}
