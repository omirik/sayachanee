import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import KalanSure from './KalanSure';
import { temalar } from '@/lib/tema';
import { tarihMetni } from '@/lib/zaman';

// Bir sayacın canlı kalan süreyle gösterildiği kart (ana sayfa ve kategori sayfaları).
export default function SayacKarti({ sayac, sunucuZamani }) {
  const t = temalar[sayac.tema];
  const { Ikon } = sayac;
  return (
    <Link
      href={sayac.yol}
      className="group flex flex-col gap-5 p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-3xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`shrink-0 p-2.5 rounded-xl border ${t.ikonKutu}`}>
            <Ikon size={20} strokeWidth={1.75} />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-semibold text-white leading-tight">{sayac.ad}</span>
            <span className="block text-sm text-zinc-400 truncate">{sayac.aciklama}</span>
          </span>
        </div>
        <ChevronRight size={18} className="shrink-0 mt-1 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition" />
      </div>

      <KalanSure hedef={sayac.hedef} sunucuZamani={sunucuZamani} tekrar={sayac.tekrar} vurgu={t.metin} />

      <span className="text-sm text-zinc-400 border-t border-zinc-800/80 pt-4">{tarihMetni(sayac.hedef)}</span>
    </Link>
  );
}
