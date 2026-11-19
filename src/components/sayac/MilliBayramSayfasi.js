import SayacSayfasi from './SayacSayfasi';
import GeriSayim from './GeriSayim';
import { milliBayramlar } from '@/data/sayaclar';
import { tarihMetni, yillikTarihler } from '@/lib/zaman';

/**
 * Her yıl aynı gün kutlanan resmi bayramların ortak sayfası.
 * Başlıktaki yıl sunucuda hesaplanır (sayfa saatlik yenilenir);
 * geri sayım ise tarayıcıda her saniye kendini hesaplar ve tarih geçince
 * otomatik olarak bir sonraki yıla geçer.
 */
export default function MilliBayramSayfasi({ slug, Ikon, sorular }) {
  const bayram = milliBayramlar[slug];
  const { yil, hedef } = yillikTarihler(bayram.ay, bayram.gun);
  const yilDonumu = bayram.yilDonumu.replace('{n}', yil - bayram.kurulus);

  return (
    <SayacSayfasi
      tema="red"
      Ikon={Ikon}
      rozet="Milli Bayram"
      geriLink="/resmi-bayramlar"
      geriEtiket="Resmi Bayramlar"
      baslik={`${bayram.ad} ${yil}`}
      altBaslik={`${bayram.tamAd} · ${yilDonumu}`}
      sorular={sorular}
    >
      <p className="text-zinc-300 font-medium mb-10">{tarihMetni(hedef)}</p>
      <GeriSayim tekrar={{ ay: bayram.ay, gun: bayram.gun, ad: bayram.ad }} tema="red" />
    </SayacSayfasi>
  );
}
