import { TreePalm } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { okul } from '@/data/sayaclar';
import { tarihMetni } from '@/lib/zaman';

const oturumlar = [{ ad: 'Okulların Kapanışı', tamAd: 'Ders yılı sonu', tarih: okul.kapanis }];

const bilgiler = [
  { etiket: 'Son ders günü', deger: tarihMetni(okul.kapanis), not: 'Karne günü' },
  { etiket: 'Ders yılı', deger: `${tarihMetni(okul.acilis, { gunAdi: false })} – ${tarihMetni(okul.kapanis, { gunAdi: false })}` },
  { etiket: 'Öğretmenler', deger: '28 – 30 Haziran 2027', not: 'Sene sonu mesleki çalışma' },
];

const sorular = [
  {
    soru: 'Okullar ne zaman kapanıyor?',
    cevap: `MEB'in ${okul.donem} çalışma takvimine göre ders yılı ${tarihMetni(okul.kapanis)} günü karne ile sona eriyor.`,
  },
  {
    soru: 'Yaz tatiline kaç gün kaldı?',
    cevap: 'Yukarıdaki canlı sayaç, okulların kapanış gününe kalan gün, saat, dakika ve saniyeyi gösterir.',
  },
  {
    soru: 'Yeni ders yılı ne zaman başlayacak?',
    cevap: 'MEB, bir sonraki eğitim öğretim yılının takvimini genellikle yaz aylarında açıklar. Açıklandığında buraya ekleyeceğiz.',
  },
];

export default function OkullarinKapanmasiSayfasi() {
  return (
    <SayacSayfasi
      tema="indigo"
      Ikon={TreePalm}
      rozet="MEB"
      geriLink="/okul-takvimi"
      geriEtiket="Okul Takvimi"
      baslik="Okulların Kapanışı"
      altBaslik={`${okul.donem} ders yılının son gününe ve yaz tatiline kalan süre`}
      bilgiler={bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={oturumlar}
        tema="indigo"
        saatGoster={false}
        kutlama="İyi tatiller! 🎉"
        bitisEtiketi="Karne Günü"
        baslangic={okul.acilis}
        baslangicEtiketi="Okulların Açılışı"
        bittiMesaji="Okullar kapandı, iyi yazlar!"
      />
    </SayacSayfasi>
  );
}
