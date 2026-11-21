import SayacSayfasi from './SayacSayfasi';
import GeriSayim from './GeriSayim';
import { milliBayramlar } from '@/data/sayaclar';
import { tarihMetni, yillikTarihler } from '@/lib/zaman';
import { paylasimBilgisi } from '@/lib/site';
import PaylasimDugmeleri from '@/components/PaylasimDugmeleri';

/**
 * Her yıl aynı gün kutlanan resmi bayramların ortak sayfası.
 * Başlıktaki yıl sunucuda hesaplanır (sayfa saatlik yenilenir);
 * geri sayım ise tarayıcıda her saniye kendini hesaplar ve tarih geçince
 * otomatik olarak bir sonraki yıla geçer.
 */
export default function MilliBayramSayfasi({ slug, Ikon, sorular, metin }) {
  const bayram = milliBayramlar[slug];
  const { yil, hedef } = yillikTarihler(bayram.ay, bayram.gun);
  const yilDonumu = bayram.yilDonumu?.replace('{n}', yil - bayram.kurulus);
  const paylasim = paylasimBilgisi(`/${slug}`);

  return (
    <SayacSayfasi
      tema="red"
      Ikon={Ikon}
      rozet={bayram.rozet ?? 'Milli Bayram'}
      geriLink="/resmi-bayramlar"
      geriEtiket="Resmi Tatiller"
      baslik={`${bayram.ad} ${yil}`}
      altBaslik={yilDonumu ? `${bayram.tamAd} · ${yilDonumu}` : bayram.tamAd}
      sorular={sorular}
      metin={metin}
    >
      <p className="text-zinc-300 font-medium mb-10">{tarihMetni(hedef)}</p>
      <GeriSayim tekrar={{ ay: bayram.ay, gun: bayram.gun, ad: bayram.ad }} tema="red" />
      {paylasim && (
        <div className="mb-14">
          <PaylasimDugmeleri
            yol={paylasim.yol}
            baslik={paylasim.baslik}
            ifade={paylasim.ifade}
            hedef={hedef}
            tekrar={{ ay: bayram.ay, gun: bayram.gun }}
          />
        </div>
      )}
    </SayacSayfasi>
  );
}
