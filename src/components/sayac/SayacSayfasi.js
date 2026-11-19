import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { temalar } from '@/lib/tema';
import SSS from './SSS';

/**
 * Tüm sayaç sayfalarının ortak iskeleti: üst bar, başlık, sayaç alanı, SSS.
 * Sunucuda çalışır; böylece başlık ve SSS metinleri HTML'de hazır gelir.
 */
export default function SayacSayfasi({
  tema = 'emerald',
  geriLink = '/tum-sayaclar',
  geriEtiket = 'Tüm Sayaçlar',
  rozet,
  Ikon,
  baslik,
  altBaslik,
  sorular,
  children,
}) {
  const t = temalar[tema];
  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 pb-24 relative">
      <div className={`fixed inset-0 bg-gradient-to-br ${t.arkaPlan} bg-[length:400%_400%] animate-gradient -z-10`} />

      <div className="w-full max-w-4xl flex flex-col items-center pt-8">
        <div className="w-full flex justify-between items-center gap-3 mb-10">
          <Link
            href={geriLink}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-zinc-900/60 hover:bg-zinc-800 py-2 px-4 rounded-full border border-zinc-800"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">{geriEtiket}</span>
          </Link>
          {rozet && (
            <span className="flex items-center gap-2 px-4 py-2 bg-zinc-900/90 border border-zinc-700/60 rounded-full text-zinc-200 text-sm font-medium">
              <Ikon size={16} className={t.ikon} />
              {rozet}
            </span>
          )}
        </div>

        <header className="text-center mb-6">
          <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-6 border ${t.ikonKutu}`}>
            <Ikon size={28} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">{baslik}</h1>
          {altBaslik && <p className="text-zinc-400 text-base md:text-lg text-balance">{altBaslik}</p>}
        </header>

        {children}

        {sorular?.length > 0 && <SSS sorular={sorular} tema={tema} />}
      </div>
    </div>
  );
}
