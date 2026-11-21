import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Moon, MapPin, CalendarDays } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import SehirVakitSayaci from '@/components/sayac/SehirVakitSayaci';
import SSS from '@/components/sayac/SSS';
import { iller, ilBul } from '@/data/iller';
import { ramazan, ramazanBayrami } from '@/data/sayaclar';
import { sehirVakitleri, trBugun, tarihAraligi } from '@/lib/vakitler';
import { tarihMetni, sunucuZamani } from '@/lib/zaman';
import { SITE_URL, SITE_NAME } from '@/lib/site';

// 81 il önceden oluşturulur; "bugün" değişsin diye saatte bir yenilenir.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return iller.map((il) => ({ il: il.slug }));
}

const YIL = ramazan.yil;
const RAMAZAN_GUNLERI = tarihAraligi(ramazan.baslangicTarihi.slice(0, 10), ramazan.bitisTarihi);

async function veriGetir(il) {
  try {
    return await sehirVakitleri(il);
  } catch (hata) {
    console.error(`[ramazan/${il.slug}] vakitler alınamadı:`, hata.message);
    return { gunler: new Map(), kaynak: 'yok' };
  }
}

export async function generateMetadata({ params }) {
  const { il: slug } = await params;
  const il = ilBul(slug);
  if (!il) return {};
  const { gunler } = await veriGetir(il);
  const bugun = gunler.get(trBugun(sunucuZamani()));

  const title = `${il.ad} İftar Vakti ve Sahur Saati ${YIL} – İmsakiye`;
  const description = bugun
    ? `${il.ad} bugün imsak ${bugun.imsak}, iftar ${bugun.aksam}. ${il.ad} ${YIL} Ramazan imsakiyesi, iftara ve sahura kalan süre. Vakitler Diyanet İşleri Başkanlığı verilerine göre.`
    : `${il.ad} iftar ve sahur vakitleri, ${YIL} Ramazan imsakiyesi ve iftara kalan süre. Vakitler Diyanet İşleri Başkanlığı verilerine göre.`;
  const url = `${SITE_URL}/ramazan/${il.slug}`;

  return {
    title,
    description,
    keywords: [`${il.ad} iftar vakti`, `${il.ad} sahur vakti`, `${il.ad} imsakiye ${YIL}`, `${il.ad} iftar saati`, `${il.ad} akşam ezanı`],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'tr_TR',
      type: 'website',
      images: [{ url: '/ramazan/opengraph-image', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

const VAKIT_ADLARI = [
  ['imsak', 'İmsak'],
  ['gunes', 'Güneş'],
  ['ogle', 'Öğle'],
  ['ikindi', 'İkindi'],
  ['aksam', 'Akşam'],
  ['yatsi', 'Yatsı'],
];

const kisaTarih = (iso) =>
  new Date(`${iso}T12:00:00+03:00`).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'short', timeZone: 'Europe/Istanbul' });

export default async function SehirRamazanSayfasi({ params }) {
  const { il: slug } = await params;
  const il = ilBul(slug);
  if (!il) notFound();

  const simdi = sunucuZamani();
  const { gunler, kaynak } = await veriGetir(il);
  const bugunTarih = trBugun(simdi);
  const bugun = gunler.get(bugunTarih);

  // Geri sayım için bugün ve sonraki 2 gün
  const yakinGunler = [0, 1, 2]
    .map((n) => trBugun(simdi, n))
    .filter((t) => gunler.has(t))
    .map((t) => ({ tarih: t, imsak: gunler.get(t).imsak, aksam: gunler.get(t).aksam }));

  // 2027 Ramazan imsakiyesi: yalnızca Diyanet'in resmi verisi tamamsa gösterilir.
  const imsakiye = RAMAZAN_GUNLERI.map((t, i) => ({ gun: i + 1, tarih: t, v: gunler.get(t) }));
  const imsakiyeHazir = kaynak === 'diyanet' && imsakiye.every((s) => s.v);

  const kaynakNotu =
    kaynak === 'diyanet'
      ? `Vakitler Diyanet İşleri Başkanlığı'nın ${il.ad} il merkezi için yayımladığı resmi vakitlerdir. İlçelerde birkaç dakika fark olabilir.`
      : `Diyanet'in sitesine şu an ulaşılamadığı için vakitler Diyanet hesaplama yöntemiyle hesaplanmıştır; resmi vakitlerden 1-2 dakika sapabilir.`;

  const sorular = [
    {
      soru: `Bugün ${il.ad} iftar saati kaç?`,
      cevap: bugun
        ? `${tarihMetni(`${bugunTarih}T12:00:00+03:00`)} günü ${il.ad} için akşam ezanı (iftar) saat ${bugun.aksam}'de okunuyor.`
        : `${il.ad} için güncel iftar saatini yukarıdaki sayaçtan takip edebilirsiniz.`,
    },
    {
      soru: `${il.ad} sahur saat kaçta bitiyor?`,
      cevap: bugun
        ? `Sahur, imsak vaktinde sona erer. Bugün ${il.ad} için imsak vakti ${bugun.imsak}.`
        : 'Sahur, imsak vaktinde sona erer. Güncel imsak vaktini yukarıda görebilirsiniz.',
    },
    {
      soru: `${YIL} Ramazan ne zaman başlıyor?`,
      cevap: `Diyanet takvimine göre ${YIL} Ramazan ayı ${tarihMetni(ramazan.baslangicTarihi)} günü başlıyor; ilk sahur bir önceki gece yapılır. Ramazan Bayramı ${tarihMetni(ramazanBayrami.oturumlar[0].tarih)} günü.`,
    },
    {
      soru: 'İlçelerde iftar vakti farklı mı?',
      cevap: `Evet. Bu sayfadaki vakitler ${il.ad} il merkezi içindir. İlçeler doğuya ya da batıya göre birkaç dakika erken veya geç olabilir.`,
    },
  ];

  return (
    <SayacSayfasi
      tema="amber"
      Ikon={Moon}
      rozet={kaynak === 'diyanet' ? 'Diyanet vakitleri' : 'Hesaplanan'}
      geriLink="/ramazan"
      geriEtiket="Ramazan"
      baslik={`${il.ad} İftar ve Sahur Vakti`}
      altBaslik={`${tarihMetni(`${bugunTarih}T12:00:00+03:00`)} · ${il.ad} il merkezi`}
    >
      {/* Bugünün vakitleri (sunucuda hazır; Google da görür) */}
      {bugun && (
        <dl className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full max-w-3xl mt-4 mb-8">
          {VAKIT_ADLARI.map(([k, ad]) => (
            <div
              key={k}
              className={`flex flex-col items-center py-3 rounded-2xl border ${
                k === 'aksam' || k === 'imsak' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-zinc-900/50 border-zinc-800/80'
              }`}
            >
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{ad}</dt>
              <dd className="text-lg font-bold text-white tabular-nums">{bugun[k]}</dd>
            </div>
          ))}
        </dl>
      )}

      {yakinGunler.length > 0 && <SehirVakitSayaci sehir={il.ad} yol={`/ramazan/${il.slug}`} gunler={yakinGunler} />}

      <p className="w-full max-w-3xl text-sm text-zinc-400 mb-12 text-center text-balance">{kaynakNotu}</p>

      {/* 2027 Ramazan imsakiyesi */}
      <section className="w-full max-w-3xl mb-16">
        <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
          <CalendarDays size={22} className="text-amber-500" /> {il.ad} {YIL} Ramazan İmsakiyesi
        </h2>
        {imsakiyeHazir ? (
          <div className="overflow-x-auto rounded-2xl border border-zinc-800/80">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80 text-zinc-400">
                <tr>
                  <th className="px-3 py-3 text-left font-semibold">Gün</th>
                  <th className="px-3 py-3 text-left font-semibold">Tarih</th>
                  <th className="px-3 py-3 text-right font-semibold">İmsak</th>
                  <th className="px-3 py-3 text-right font-semibold">İftar</th>
                </tr>
              </thead>
              <tbody>
                {imsakiye.map(({ gun, tarih, v }) => {
                  const kadir = tarih === ramazan.kadirGecesi;
                  const bugunMu = tarih === bugunTarih;
                  return (
                    <tr key={tarih} className={`border-t border-zinc-800/60 ${bugunMu ? 'bg-amber-500/15' : kadir ? 'bg-amber-500/5' : ''}`}>
                      <td className="px-3 py-2.5 text-zinc-400 tabular-nums">{gun}</td>
                      <td className="px-3 py-2.5 text-zinc-200">
                        {kisaTarih(tarih)}
                        {kadir && <span className="ml-2 text-xs text-amber-400">Kadir Gecesi</span>}
                      </td>
                      <td className="px-3 py-2.5 text-right text-white font-semibold tabular-nums">{v.imsak}</td>
                      <td className="px-3 py-2.5 text-right text-amber-300 font-semibold tabular-nums">{v.aksam}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 text-zinc-300 leading-relaxed">
            {YIL} Ramazan ayı {tarihMetni(ramazan.baslangicTarihi)} günü başlıyor. Diyanet İşleri Başkanlığı {YIL} yılı vakitlerini
            yayımladığında {il.ad} için 29 günlük imsakiye tablosu (her günün imsak ve iftar saati) burada otomatik olarak yer alacak.
          </div>
        )}
      </section>

      <SSS sorular={sorular} tema="amber" />

      {/* Diğer şehirler */}
      <section className="w-full max-w-4xl mt-16">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
          <MapPin size={20} className="text-amber-500" /> Diğer şehirlerin iftar ve sahur vakitleri
        </h2>
        <div className="flex flex-wrap gap-2">
          {iller
            .filter((x) => x.slug !== il.slug)
            .map((x) => (
              <Link
                key={x.slug}
                href={`/ramazan/${x.slug}`}
                className="px-3 py-1.5 rounded-full text-sm bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
              >
                {x.ad}
              </Link>
            ))}
        </div>
      </section>
    </SayacSayfasi>
  );
}
