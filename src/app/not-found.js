import Link from 'next/link';
import { Timer } from 'lucide-react';

export const metadata = {
  title: 'Sayfa Bulunamadı',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6">
        <Timer size={32} className="text-emerald-500" />
      </div>
      <p className="text-emerald-400 font-mono font-bold mb-2">404</p>
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Bu sayfa bulunamadı</h1>
      <p className="text-zinc-400 max-w-md mb-8">
        Aradığın sayaç taşınmış ya da hiç var olmamış olabilir. Tüm sayaçlara aşağıdan ulaşabilirsin.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/tum-sayaclar" className="px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 transition-colors">
          Tüm Sayaçlar
        </Link>
        <Link href="/" className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold hover:bg-zinc-800 transition-colors">
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
