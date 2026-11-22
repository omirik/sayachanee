import { Fragment } from 'react';
import Link from 'next/link';
import ReklamAlani from '@/components/ReklamAlani';
import { ArrowRight, CalendarHeart, Clock, ShieldCheck, Smartphone } from 'lucide-react';
import { sayfaMeta } from '@/lib/site';
import { yaklasanlar, kategoriler } from '@/lib/katalog';
import { temalar } from '@/lib/tema';
import { tarihMetni, sunucuZamani } from '@/lib/zaman';
import SayacKarti from '@/components/sayac/SayacKarti';
import KalanSure from '@/components/sayac/KalanSure';

export const metadata = sayfaMeta('/');

// Sıralama ve "kaç gün kaldı" sayıları saatte bir sunucuda yenilenir;
// tarayıcıda ise saniye saniye canlı akar.
export const revalidate = 3600;

const ozellikler = [
  {
    Ikon: Clock,
    baslik: 'Türkiye saatiyle canlı',
    metin: 'Tüm sayaçlar Türkiye saatine göre hesaplanır; yurt dışından bakarken bile doğru süreyi görürsün.',
  },
  {
    Ikon: ShieldCheck,
    baslik: 'Resmi takvimlerden',
    metin: 'Sınav tarihleri ÖSYM ve MEB, dini günler Diyanet, resmi bayramlar kanunla belirlenen tarihlere dayanır.',
  },
  {
    Ikon: Smartphone,
    baslik: 'Her ekranda rahat',
    metin: 'Telefonda, tablette ve bilgisayarda hızlı açılır; karanlık tasarımı gözü yormaz.',
  },
];

export default function AnaSayfa() {
  const simdi = sunucuZamani();
  const liste = yaklasanlar(simdi);
  const [siradaki, ...digerleri] = liste;
  const t = temalar[siradaki.tema];

  return (
    <div className="w-full flex flex-col pb-20">
      {/* GİRİŞ + SIRADAKİ SAYAÇ */}
      <section className="relative w-full px-4 pt-14 md:pt-20 pb-14 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/30 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] max-w-full h-[500px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.14),transparent)] -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight text-balance max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            Sınavlara ve bayramlara{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">ne kadar kaldı?</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400 max-w-2xl text-balance">
            YKS, KPSS, LGS, Ramazan ve resmi bayramlar için canlı geri sayım sayaçları. Kendi özel gününü de ekleyebilirsin.
          </p>

          {/* Sıradaki etkinlik */}
          <Link
            href={siradaki.yol}
            className="group mt-10 w-full max-w-3xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 md:p-8 text-left bg-zinc-900/60 border border-zinc-800 rounded-3xl hover:border-zinc-700 transition-colors animate-in fade-in zoom-in-95 duration-500"
          >
            <div className="flex flex-col gap-3">
              <span className={`inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${t.ikonKutu}`}>
                <siradaki.Ikon size={14} /> Sıradaki
              </span>
              <span className="text-2xl md:text-3xl font-bold text-white">{siradaki.ad}</span>
              <span className="text-zinc-400">{tarihMetni(siradaki.hedef)}</span>
            </div>
            <div className="flex items-end justify-between md:flex-col md:items-end gap-4">
              <KalanSure hedef={siradaki.hedef} sunucuZamani={simdi} tekrar={siradaki.tekrar} vurgu={t.metin} boyut="buyuk" />
              <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-300 group-hover:text-white">
                Sayaca git <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* YAKLAŞAN TÜM SAYAÇLAR */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-6">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Yaklaşan günler</h2>
            <p className="text-zinc-400 mt-1">En yakından en uzağa, canlı geri sayım.</p>
          </div>
          <Link href="/tum-sayaclar" className="hidden sm:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold">
            Tüm sayaçlar <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {digerleri.map((s, i) => (
            <Fragment key={s.yol}>
              <SayacKarti sayac={s} sunucuZamani={simdi} />
              {i === 5 && (
                <div className="col-span-full flex justify-center">
                  <ReklamAlani alan="liste" className="my-2" />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {Object.values(kategoriler).map((k) => (
            <Link key={k.yol} href={k.yol} className="px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors">
              {k.ad}
            </Link>
          ))}
        </div>
      </section>

      {/* ÖZEL SAYAÇ */}
      <section className="w-full max-w-6xl mx-auto px-4 mt-20">
        <div className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 md:p-10 rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-950/40 via-zinc-900/60 to-zinc-900/60">
          <div className="flex items-start gap-5">
            <span className="shrink-0 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <CalendarHeart size={28} strokeWidth={1.5} />
            </span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Kendi sayacını kur</h2>
              <p className="text-zinc-400 mt-2 max-w-xl">
                Doğum günü, tatil, askerlik, düğün ya da yıldönümü… Tarihi gir, geri sayım hazır.
              </p>
            </div>
          </div>
          <Link href="/ozel" className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-semibold transition-colors">
            Özel Sayaç Oluştur <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* NEDEN SAYAÇHANE */}
      <section className="w-full max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-center mb-10">Neden Sayaçhane?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ozellikler.map(({ Ikon, baslik, metin }) => (
            <div key={baslik} className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80">
              <Ikon size={24} className="text-emerald-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{baslik}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{metin}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
