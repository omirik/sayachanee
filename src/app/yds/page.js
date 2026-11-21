import { Languages } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { yds } from '@/data/sayaclar';
import { tarihMetni, saatMetni, siradakiIndeks, sunucuZamani, sonucluOturumlar } from '@/lib/zaman';

// Sıradaki oturumun seçili gelmesi için sayfa saatlik yenilenir.
export const revalidate = 3600;

const [y1, y2] = yds.oturumlar;

const sorular = [
  {
    soru: `YDS ${yds.yil} ne zaman?`,
    cevap: `ÖSYM'nin ${yds.yil} takvimine göre kağıt tabanlı YDS iki kez yapılacak: YDS/1 ${tarihMetni(y1.tarih)}, YDS/2 ise ${tarihMetni(y2.tarih)} günü. Sınavlar saat ${saatMetni(y1.tarih)}'te başlar.`,
  },
  {
    soru: "YDS'ye kaç gün kaldı?",
    cevap: 'Yukarıdaki sayaçtan YDS/1 veya YDS/2 oturumunu seçerek kalan süreyi Türkiye saatine göre canlı takip edebilirsin.',
  },
  {
    soru: 'e-YDS nedir?',
    cevap: "e-YDS, YDS'nin ÖSYM elektronik sınav merkezlerinde bilgisayar üzerinden yapılan versiyonudur ve yıl içinde çok sayıda oturumu vardır. Bu sayaç kağıt tabanlı YDS oturumlarını gösterir.",
  },
  {
    soru: 'YDS tarihi değişebilir mi?',
    cevap: "Tarihler ÖSYM'nin yayımladığı resmi sınav takvimine dayanıyor. ÖSYM bir değişiklik duyurursa sayacımız da güncellenir.",
  },
];

export default function YdsSayfasi() {
  const simdi = sunucuZamani();
  const oturumlar = sonucluOturumlar(yds, simdi);
  return (
    <SayacSayfasi
      tema="cyan"
      Ikon={Languages}
      rozet="ÖSYM"
      geriLink="/sinavlar"
      geriEtiket="Sınavlar"
      baslik={`YDS ${yds.yil}`}
      altBaslik="Yabancı Dil Bilgisi Seviye Tespit Sınavı'na kalan süre"
      metin="YDS; akademik kadrolar, lisansüstü programlar ve kamu kurumlarındaki yabancı dil tazminatı gibi durumlarda yabancı dil seviyesini belgelemek için kullanılır. Kağıt tabanlı YDS yılda iki kez yapılır."
      bilgiler={yds.bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={oturumlar}
        baslangic={yds.baslangic}
        baslangicEtiketi={yds.baslangicEtiketi}
        tema="cyan"
        depoAnahtari="sayachane_yds_oturum"
        varsayilan={siradakiIndeks(oturumlar, simdi)}
        bittiMesaji="Bu YDS oturumu tamamlandı. Yukarıdan sıradaki oturumu seçebilirsin."
      />
    </SayacSayfasi>
  );
}
