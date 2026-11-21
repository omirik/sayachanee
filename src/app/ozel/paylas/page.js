import Link from 'next/link';
import { CalendarHeart, CalendarPlus } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import GeriSayim from '@/components/sayac/GeriSayim';
import PaylasDugmeleri from '@/components/ozel/PaylasDugmeleri';
import KaydetDugmesi from '@/components/ozel/KaydetDugmesi';
import { paylasimCoz, paylasimYolu } from '@/lib/ozel';
import { tarihMetni, saatMetni } from '@/lib/zaman';
import { SITE_URL, SITE_NAME } from '@/lib/site';

// Kişisel sayaç bağlantıları sınırsız sayıda olabilir; Google'da listelenmesin.
const ROBOTS = { index: false, follow: true };

export async function generateMetadata({ searchParams }) {
  const { ad, t } = await searchParams;
  const sayac = paylasimCoz(ad, t);
  if (!sayac) return { title: 'Özel Sayaç', robots: ROBOTS };

  const baslik = `${sayac.isim} · Geri Sayım`;
  const aciklama = `${sayac.isim}: ${tarihMetni(sayac.hedef)} saat ${saatMetni(sayac.hedef)}. Kalan süreyi Sayaçhane'de canlı takip et.`;
  const gorsel = {
    url: paylasimYolu(sayac.isim, sayac.hedef).replace('/ozel/paylas', '/api/og/ozel'),
    width: 1200,
    height: 630,
    alt: baslik,
  };
  return {
    title: baslik,
    description: aciklama,
    robots: ROBOTS,
    openGraph: {
      title: baslik,
      description: aciklama,
      url: `${SITE_URL}${paylasimYolu(sayac.isim, sayac.hedef)}`,
      siteName: SITE_NAME,
      locale: 'tr_TR',
      type: 'website',
      images: [gorsel],
    },
    twitter: { card: 'summary_large_image', title: baslik, description: aciklama, images: [gorsel.url] },
  };
}

export default async function PaylasilanSayac({ searchParams }) {
  const { ad, t } = await searchParams;
  const sayac = paylasimCoz(ad, t);

  if (!sayac) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <CalendarHeart size={40} className="text-rose-400 mb-5" />
        <h1 className="text-3xl font-bold text-white mb-3">Bu sayaç bağlantısı geçersiz</h1>
        <p className="text-zinc-400 max-w-md mb-8">Bağlantı eksik kopyalanmış olabilir. Kendi sayacını birkaç saniyede oluşturabilirsin.</p>
        <Link href="/ozel" className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-semibold">
          Özel Sayaç Oluştur
        </Link>
      </div>
    );
  }

  return (
    <SayacSayfasi
      tema="rose"
      Ikon={CalendarHeart}
      rozet="Özel Sayaç"
      geriLink="/ozel"
      geriEtiket="Sayaçlarım"
      baslik={sayac.isim}
      altBaslik={`${tarihMetni(sayac.hedef)} · ${saatMetni(sayac.hedef)}`}
    >
      <div className="h-6" />
      <GeriSayim
        hedef={new Date(sayac.hedef).toISOString()}
        tema="rose"
        bittiMesaji={`${sayac.isim} geldi! 🎉`}
        kutlama={`${sayac.isim} geldi! 🎉`}
      />

      <div className="flex flex-col items-center gap-4 mb-12">
        <PaylasDugmeleri isim={sayac.isim} hedef={sayac.hedef} />
        <KaydetDugmesi isim={sayac.isim} hedef={sayac.hedef} />
      </div>

      <Link
        href="/ozel"
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <CalendarPlus size={16} /> Sen de kendi sayacını oluştur
      </Link>
    </SayacSayfasi>
  );
}
