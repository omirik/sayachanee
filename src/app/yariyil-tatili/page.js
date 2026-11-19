import { Snowflake } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { okul } from '@/data/sayaclar';
import { tarihMetni } from '@/lib/zaman';

const oturumlar = [{ ad: 'Karne Günü', tamAd: '1. dönem sonu', tarih: okul.karne1 }];

const bilgiler = [
  { etiket: 'Karne günü', deger: tarihMetni(okul.karne1), not: '1. dönemin son günü' },
  { etiket: 'Yarıyıl tatili', deger: `25 Ocak – ${tarihMetni(okul.yariyilBitis, { gunAdi: false })}`, not: '2 hafta' },
  { etiket: '2. dönem başlıyor', deger: tarihMetni(okul.donem2) },
];

const sorular = [
  {
    soru: 'Yarıyıl tatili ne zaman başlıyor?',
    cevap: `MEB'in ${okul.donem} çalışma takvimine göre birinci dönem ${tarihMetni(okul.karne1)} günü karne ile sona eriyor. Yarıyıl tatili 25 Ocak 2027 Pazartesi başlayıp ${tarihMetni(okul.yariyilBitis)} günü bitiyor.`,
  },
  {
    soru: 'Karneler ne zaman verilecek?',
    cevap: `Birinci dönem karneleri ${tarihMetni(okul.karne1)} günü dağıtılacak.`,
  },
  {
    soru: 'İkinci dönem ne zaman başlıyor?',
    cevap: `İkinci dönemin ilk ders günü ${tarihMetni(okul.donem2)}.`,
  },
];

export default function YariyilTatiliSayfasi() {
  return (
    <SayacSayfasi
      tema="indigo"
      Ikon={Snowflake}
      rozet="MEB"
      geriLink="/okul-takvimi"
      geriEtiket="Okul Takvimi"
      baslik="Yarıyıl Tatili"
      altBaslik={`${okul.donem} eğitim öğretim yılı · karne gününe kalan süre`}
      bilgiler={bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={oturumlar}
        tema="indigo"
        saatGoster={false}
        bitisEtiketi="Karne Günü"
        baslangic={okul.acilis}
        baslangicEtiketi="Okulların Açılışı"
        bittiMesaji="İyi tatiller! Yarıyıl tatili başladı."
      />
    </SayacSayfasi>
  );
}
