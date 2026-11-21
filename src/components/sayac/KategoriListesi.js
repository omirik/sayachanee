import { yaklasanlar } from '@/lib/katalog';
import { sunucuZamani } from '@/lib/zaman';
import { Fragment } from 'react';
import SayacKarti from './SayacKarti';
import ReklamAlani from '@/components/ReklamAlani';

// Bir kategorideki (ya da tüm) sayaçları en yakından uzağa canlı kartlarla listeler.
export default function KategoriListesi({ kategori }) {
  const simdi = sunucuZamani();
  const liste = yaklasanlar(simdi, kategori);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {liste.map((s, i) => (
        <Fragment key={s.yol}>
          <SayacKarti sayac={s} sunucuZamani={simdi} />
          {/* 6. karttan sonra reklam (listede daha fazla kart varsa) */}
          {i === 5 && liste.length > 6 && (
            <div className="col-span-full flex justify-center">
              <ReklamAlani alan="liste" className="my-2" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

// Kategori sayfalarının ortak başlık + liste düzeni.
export function KategoriSayfasi({ baslik, vurgu, vurguRengi, aciklama, kategori, children }) {
  return (
    <div className="flex flex-col items-center px-4 pt-14 md:pt-20 pb-20">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
          {baslik} <span className={vurguRengi}>{vurgu}</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed text-balance">{aciklama}</p>
      </div>
      <div className="w-full max-w-6xl">
        {kategori !== undefined && <KategoriListesi kategori={kategori} />}
        {children}
      </div>
    </div>
  );
}
