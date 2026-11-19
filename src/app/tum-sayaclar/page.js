import Link from 'next/link';
import { ArrowRight, CalendarHeart } from 'lucide-react';
import { sayfaMeta } from '@/lib/site';
import { kategoriler } from '@/lib/katalog';
import KategoriListesi, { KategoriSayfasi } from '@/components/sayac/KategoriListesi';

export const metadata = sayfaMeta('/tum-sayaclar');
export const revalidate = 3600;

export default function TumSayaclarSayfasi() {
  return (
    <KategoriSayfasi
      baslik="Tüm"
      vurgu="Sayaçlar"
      vurguRengi="text-zinc-400"
      aciklama="Sayaçhane'deki tüm geri sayımlar, kategorilere göre ve en yakından en uzağa sıralı."
    >
      <div className="space-y-14">
        {Object.entries(kategoriler).map(([anahtar, k]) => (
          <section key={anahtar}>
            <div className="flex items-end justify-between gap-4 mb-5 border-b border-zinc-800/60 pb-3">
              <h2 className="text-2xl font-bold text-white">{k.ad}</h2>
              <Link href={k.yol} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white">
                Kategoriye git <ArrowRight size={14} />
              </Link>
            </div>
            <KategoriListesi kategori={anahtar} />
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-bold text-white mb-5 border-b border-zinc-800/60 pb-3">Kişisel Araçlar</h2>
          <Link
            href="/ozel"
            className="flex items-center justify-between gap-4 p-6 rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-950/40 to-zinc-900/60 hover:border-rose-500/40 transition-colors"
          >
            <span className="flex items-center gap-4">
              <span className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
                <CalendarHeart size={20} />
              </span>
              <span>
                <span className="block text-lg font-semibold text-white">Özel Sayaç</span>
                <span className="block text-sm text-zinc-400">Kendi tarihini gir, geri sayımını oluştur.</span>
              </span>
            </span>
            <ArrowRight size={18} className="text-rose-300 shrink-0" />
          </Link>
        </section>
      </div>
    </KategoriSayfasi>
  );
}
