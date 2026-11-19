import Link from 'next/link';
import { Timer } from 'lucide-react';
import { kategoriler, sayaclar } from '@/lib/katalog';

const kurumsal = [
  { ad: 'Hakkımızda', yol: '/hakkimizda' },
  { ad: 'İletişim', yol: '/iletisim' },
  { ad: 'Gizlilik Politikası', yol: '/gizlilik-politikasi' },
  { ad: 'Kullanım Koşulları', yol: '/kullanim-kosullari' },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-zinc-200">
            <Timer size={20} className="text-emerald-500" />
            <span className="font-bold text-lg tracking-tight">Sayaçhane</span>
          </Link>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            Sınavlar, bayramlar ve özel günler için Türkiye saatiyle canlı geri sayım.
          </p>
        </div>

        {Object.entries(kategoriler).map(([anahtar, k]) => (
          <div key={anahtar}>
            <Link href={k.yol} className="text-sm font-semibold text-zinc-200 hover:text-white">
              {k.ad}
            </Link>
            <ul className="mt-3 space-y-2">
              {sayaclar
                .filter((s) => s.kategori === anahtar)
                .map((s) => (
                  <li key={s.yol}>
                    <Link href={s.yol} className="text-sm text-zinc-400 hover:text-white transition-colors">
                      {s.ad} Sayacı
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}

        <div>
          <span className="text-sm font-semibold text-zinc-200">Sayaçhane</span>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/ozel" className="text-sm text-zinc-400 hover:text-white transition-colors">Özel Sayaç</Link>
            </li>
            <li>
              <Link href="/tum-sayaclar" className="text-sm text-zinc-400 hover:text-white transition-colors">Tüm Sayaçlar</Link>
            </li>
            {kurumsal.map((l) => (
              <li key={l.yol}>
                <Link href={l.yol} className="text-sm text-zinc-400 hover:text-white transition-colors">{l.ad}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <p className="max-w-6xl mx-auto px-4 py-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} Sayaçhane. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
