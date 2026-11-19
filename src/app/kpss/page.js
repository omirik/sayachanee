import { Briefcase } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { kpss } from '@/data/sayaclar';
import { tarihMetni, saatMetni } from '@/lib/zaman';

const gygk = kpss.oturumlar[0];

const sorular = [
  {
    soru: `KPSS ${kpss.yil} ne zaman?`,
    cevap: `ÖSYM'nin ${kpss.yil} sınav takvimine göre KPSS Lisans Genel Yetenek - Genel Kültür oturumu ${tarihMetni(gygk.tarih)} günü saat ${saatMetni(gygk.tarih)}'te yapılacak. A Grubu Alan Bilgisi oturumları ise 18-19 Eylül ${kpss.yil} tarihlerinde.`,
  },
  {
    soru: `${kpss.yil}'de KPSS Ön Lisans ve Ortaöğretim var mı?`,
    cevap: `Hayır. Ön Lisans ve Ortaöğretim KPSS'leri yalnızca çift yıllarda yapılır. Bir sonraki Ön Lisans ve Ortaöğretim KPSS'si ${kpss.sonrakiBGrubuYili} yılında.`,
  },
  {
    soru: "KPSS'ye kaç gün kaldı?",
    cevap: 'Yukarıdaki canlı sayaç, KPSS Lisans GY-GK oturumuna kalan gün, saat, dakika ve saniyeyi Türkiye saatine göre anlık gösterir.',
  },
  {
    soru: 'KPSS tarihi değişebilir mi?',
    cevap: "Tarihler ÖSYM'nin yayımladığı resmi sınav takvimine dayanıyor. ÖSYM bir değişiklik duyurursa sayacımız da güncellenir.",
  },
];

export default function KpssSayfasi() {
  return (
    <SayacSayfasi
      tema="blue"
      Ikon={Briefcase}
      rozet="ÖSYM"
      geriLink="/sinavlar"
      geriEtiket="Sınavlar"
      baslik={`KPSS ${kpss.yil}`}
      altBaslik="KPSS Lisans Genel Yetenek - Genel Kültür oturumuna kalan süre"
      metin={`KPSS (Kamu Personeli Seçme Sınavı), kamu kurumlarına memur alımında kullanılan ÖSYM sınavıdır. ${kpss.yil} yılında yalnızca lisans mezunlarına yönelik oturumlar yapılır; Genel Yetenek - Genel Kültür tüm lisans adayları için ortaktır, Alan Bilgisi oturumları ise A Grubu kadrolar içindir.`}
      bilgiler={kpss.bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={kpss.oturumlar}
        baslangic={kpss.baslangic}
        baslangicEtiketi={kpss.baslangicEtiketi}
        tema="blue"
        bittiMesaji={`KPSS ${kpss.yil} tamamlandı. Tüm adaylara başarılar!`}
      />
    </SayacSayfasi>
  );
}
