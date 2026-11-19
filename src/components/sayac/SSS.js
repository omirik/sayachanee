import { Plus } from 'lucide-react';
import { temalar } from '@/lib/tema';

// Sıkça Sorulan Sorular. Tarayıcının yerleşik <details> öğesini kullanır:
// JavaScript gerektirmez ve cevaplar Google'ın okuyabileceği şekilde HTML'de durur.
export default function SSS({ sorular, tema = 'emerald', baslik = 'Sıkça Sorulan Sorular' }) {
  const t = temalar[tema];
  return (
    <section className="w-full max-w-3xl flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center tracking-tight">{baslik}</h2>
      <div className="flex flex-col gap-4">
        {sorular.map(({ soru, cevap }) => (
          <details
            key={soru}
            className={`group border rounded-2xl bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 open:bg-zinc-900/80 transition-colors ${t.sssAcik}`}
          >
            <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className={`font-semibold text-zinc-200 transition-colors ${t.sssBaslik}`}>{soru}</span>
              <span className={`shrink-0 p-1.5 rounded-full bg-zinc-800 text-zinc-400 transition-all group-open:rotate-45 ${t.sssIkon}`}>
                <Plus size={18} />
              </span>
            </summary>
            <p className="px-5 pb-5 text-zinc-400 text-sm md:text-base leading-relaxed">{cevap}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
