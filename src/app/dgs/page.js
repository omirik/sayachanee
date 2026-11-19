import { GraduationCap } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { dgs } from '@/data/sayaclar';
import { tarihMetni, saatMetni } from '@/lib/zaman';

const sinav = dgs.oturumlar[0];

const sorular = [
  {
    soru: `DGS ${dgs.yil} ne zaman?`,
    cevap: `ÖSYM'nin ${dgs.yil} sınav takvimine göre Dikey Geçiş Sınavı ${tarihMetni(sinav.tarih)} günü saat ${saatMetni(sinav.tarih)}'te yapılacak.`,
  },
  {
    soru: "DGS'ye kaç gün kaldı?",
    cevap: "Yukarıdaki canlı sayaç, DGS'ye kalan gün, saat, dakika ve saniyeyi Türkiye saatine göre anlık gösterir.",
  },
  {
    soru: "DGS'ye kimler girebilir?",
    cevap: 'DGS, ön lisans (2 yıllık) programlardan mezun olan veya son sınıfta okuyan adayların lisans programlarına dikey geçiş yapabilmesi için ÖSYM tarafından düzenlenir.',
  },
  {
    soru: 'DGS tarihi değişebilir mi?',
    cevap: "Tarih, ÖSYM'nin yayımladığı resmi sınav takvimine dayanıyor. ÖSYM bir değişiklik duyurursa sayacımız da güncellenir.",
  },
];

export default function DgsSayfasi() {
  return (
    <SayacSayfasi
      tema="purple"
      Ikon={GraduationCap}
      rozet="ÖSYM"
      geriLink="/sinavlar"
      geriEtiket="Sınavlar"
      baslik={`DGS ${dgs.yil}`}
      altBaslik="Dikey Geçiş Sınavı'na kalan süre"
      metin="DGS, ön lisans (2 yıllık) mezunlarının ve son sınıf öğrencilerinin lisans programlarının 3. sınıfına geçiş yapabilmesi için ÖSYM tarafından yılda bir kez yapılan sınavdır. Yerleştirmede sınav puanının yanında ön lisans diploma notu da hesaba katılır."
      bilgiler={dgs.bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={dgs.oturumlar}
        baslangic={dgs.baslangic}
        baslangicEtiketi={dgs.baslangicEtiketi}
        tema="purple"
        bittiMesaji={`DGS ${dgs.yil} tamamlandı. Tüm adaylara başarılar! Yeni yılın tarihi açıklanınca sayaç güncellenecek.`}
      />
    </SayacSayfasi>
  );
}
