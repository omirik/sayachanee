import { Coffee } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { okul } from '@/data/sayaclar';
import { tarihMetni } from '@/lib/zaman';

const { araTatil2 } = okul;
const oturumlar = [{ ad: '2. Dönem Ara Tatili', tamAd: 'Mart ara tatili', tarih: araTatil2.baslangic }];

const bilgiler = [
  { etiket: '2. dönem ara tatili', deger: `${tarihMetni(araTatil2.baslangic, { gunAdi: false })} – ${tarihMetni(araTatil2.bitis, { gunAdi: false })}`, not: '1 hafta' },
  { etiket: '1. dönem ara tatili', deger: '16 – 20 Kasım 2026', not: 'Tamamlandı' },
  { etiket: 'Not', deger: 'Ramazan Bayramı ile aynı hafta', not: 'Bayram 9-11 Mart 2027' },
];

const sorular = [
  {
    soru: 'Ara tatil ne zaman?',
    cevap: `MEB'in ${okul.donem} takvimine göre ikinci dönem ara tatili ${tarihMetni(araTatil2.baslangic)} günü başlayıp ${tarihMetni(araTatil2.bitis)} günü sona eriyor.`,
  },
  {
    soru: 'Ara tatil kaç gün?',
    cevap: 'Ara tatil hafta içi 5 iş günüdür. Önceki ve sonraki hafta sonlarıyla birlikte öğrenciler 9 gün okula gitmez.',
  },
  {
    soru: 'Ara tatil Ramazan Bayramı ile çakışıyor mu?',
    cevap: '2027 Mart ara tatili, Ramazan Bayramı (9-11 Mart 2027) ile aynı haftaya denk geliyor.',
  },
];

export default function AraTatilSayfasi() {
  return (
    <SayacSayfasi
      tema="indigo"
      Ikon={Coffee}
      rozet="MEB"
      geriLink="/okul-takvimi"
      geriEtiket="Okul Takvimi"
      baslik="Ara Tatil"
      altBaslik={`${okul.donem} ikinci dönem ara tatiline kalan süre`}
      bilgiler={bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={oturumlar}
        tema="indigo"
        saatGoster={false}
        bitisEtiketi="Ara Tatil"
        baslangic="2026-11-21T00:00:00+03:00"
        baslangicEtiketi="1. Ara Tatil Sonu"
        bittiMesaji="Ara tatil başladı, iyi tatiller!"
      />
    </SayacSayfasi>
  );
}
