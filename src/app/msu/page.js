import { Shield } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { msu } from '@/data/sayaclar';
import { tarihMetni, saatMetni, siradakiIndeks, sunucuZamani, sonucluOturumlar } from '@/lib/zaman';

// Sıradaki oturum (sınav bitince Sonuç sekmesi) seçili gelsin diye sayfa saatlik yenilenir.
export const revalidate = 3600;

const sinav = msu.oturumlar[0];

const sorular = [
  {
    soru: `MSÜ ${msu.yil} ne zaman?`,
    cevap: `ÖSYM'nin ${msu.yil} sınav takvimine göre MSÜ sınavı ${tarihMetni(sinav.tarih)} günü saat ${saatMetni(sinav.tarih)}'te yapılacak.`,
  },
  {
    soru: 'MSÜ başvuruları ne zaman?',
    cevap: `Başvurular 13 Ocak – 10 Şubat ${msu.yil} tarihleri arasında ÖSYM Aday İşlemleri Sistemi üzerinden alınacak. Geç başvuru günü 16 Şubat ${msu.yil}.`,
  },
  {
    soru: "MSÜ'ye kaç gün kaldı?",
    cevap: "Yukarıdaki canlı sayaç, MSÜ sınavına kalan gün, saat, dakika ve saniyeyi Türkiye saatine göre anlık gösterir.",
  },
  {
    soru: 'MSÜ tarihi değişebilir mi?',
    cevap: "Tarihler ÖSYM'nin yayımladığı resmi sınav takvimine dayanıyor. ÖSYM bir değişiklik duyurursa sayacımız da güncellenir.",
  },
];

export default function MsuSayfasi() {
  const simdi = sunucuZamani();
  const oturumlar = sonucluOturumlar(msu, simdi);
  return (
    <SayacSayfasi
      tema="emerald"
      Ikon={Shield}
      rozet="ÖSYM"
      geriLink="/sinavlar"
      geriEtiket="Sınavlar"
      baslik={`MSÜ ${msu.yil}`}
      altBaslik="Millî Savunma Üniversitesi Askerî Öğrenci Aday Belirleme Sınavı'na kalan süre"
      metin="MSÜ sınavı; Kara, Deniz ve Hava Harp Okulları ile Astsubay Meslek Yüksekokullarına öğrenci adayı belirlemek için ÖSYM tarafından yapılır. Sınavı geçen adaylar ardından Millî Savunma Üniversitesi'nin seçme aşamalarına (sağlık, fiziki yeterlilik ve mülakat) çağrılır."
      bilgiler={msu.bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={oturumlar}
        varsayilan={siradakiIndeks(oturumlar, simdi)}
        baslangic={msu.baslangic}
        baslangicEtiketi={msu.baslangicEtiketi}
        tema="emerald"
        bittiMesaji={`MSÜ ${msu.yil} tamamlandı. Tüm adaylara başarılar!`}
      />
    </SayacSayfasi>
  );
}
