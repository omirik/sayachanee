import { Info } from 'lucide-react';
import { temalar } from '@/lib/tema';

// "Önemli Bilgiler" bölümü: başvuru, süre, soru sayısı, sonuç gibi kısa bilgiler.
export default function BilgiKartlari({ bilgiler, tema = 'emerald', baslik = 'Önemli Bilgiler' }) {
  const t = temalar[tema];
  return (
    <section className="w-full max-w-4xl mb-16">
      <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
        <Info size={22} className={t.ikon} /> {baslik}
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {bilgiler.map(({ etiket, deger, not }) => (
          <div key={etiket} className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
            <dt className={`text-xs font-semibold uppercase tracking-widest ${t.metin}`}>{etiket}</dt>
            <dd className="mt-1.5 text-lg font-semibold text-white">{deger}</dd>
            {not && <dd className="mt-1 text-sm text-zinc-400">{not}</dd>}
          </div>
        ))}
      </dl>
    </section>
  );
}
