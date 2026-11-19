import { PenTool } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { lgs } from '@/data/sayaclar';
import { tarihMetni, saatMetni } from '@/lib/zaman';

const sinav = lgs.oturumlar[0];

const sorular = [
  {
    soru: `LGS ${lgs.yil} ne zaman?`,
    cevap: `MEB'in ${lgs.yil} sınav takvimine göre LGS merkezi sınavı ${tarihMetni(sinav.tarih)} günü yapılacak. İlk oturum saat ${saatMetni(sinav.tarih)}'da başlıyor.`,
  },
  {
    soru: "LGS'ye kaç gün kaldı?",
    cevap: "Yukarıdaki canlı sayaç, LGS'ye kalan gün, saat, dakika ve saniyeyi Türkiye saatine göre anlık gösterir.",
  },
  {
    soru: 'LGS kaç oturumdan oluşuyor?',
    cevap: 'LGS aynı gün yapılan iki oturumdan oluşur: sözel bölüm (Türkçe, T.C. İnkılap Tarihi ve Atatürkçülük, Din Kültürü, Yabancı Dil) ve sayısal bölüm (Matematik, Fen Bilimleri).',
  },
  {
    soru: 'LGS tarihi değişebilir mi?',
    cevap: "Tarih, MEB'in yayımladığı resmi sınav takvimine dayanıyor. Bakanlık bir değişiklik duyurursa sayacımız da güncellenir.",
  },
];

export default function LgsSayfasi() {
  return (
    <SayacSayfasi
      tema="cyan"
      Ikon={PenTool}
      rozet="MEB"
      geriLink="/sinavlar"
      geriEtiket="Sınavlar"
      baslik={`LGS ${lgs.yil}`}
      altBaslik="Liselere Geçiş Sistemi merkezi sınavına kalan süre"
      metin="LGS, 8. sınıf öğrencilerinin fen liseleri, Anadolu liseleri ve sosyal bilimler liseleri gibi sınavla öğrenci alan okullara yerleşmesi için MEB tarafından yapılan merkezi sınavdır. Sınav aynı gün iki oturumda yapılır; sınava girmek zorunlu değildir."
      bilgiler={lgs.bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={lgs.oturumlar}
        baslangic={lgs.baslangic}
        baslangicEtiketi={lgs.baslangicEtiketi}
        tema="cyan"
        bittiMesaji={`LGS ${lgs.yil} tamamlandı. Tüm adaylara başarılar! Yeni yılın tarihi açıklanınca sayaç güncellenecek.`}
      />
    </SayacSayfasi>
  );
}
