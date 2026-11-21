import { BookOpen } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { yks } from '@/data/sayaclar';
import { tarihMetni, saatMetni, siradakiIndeks, sunucuZamani, sonucluOturumlar } from '@/lib/zaman';

// Sıradaki oturumun seçili gelmesi için sayfa saatlik yenilenir.
export const revalidate = 3600;

const [tyt, ayt, ydt] = yks.oturumlar;

const sorular = [
  {
    soru: `YKS ${yks.yil} ne zaman?`,
    cevap: `ÖSYM'nin ${yks.yil} sınav takvimine göre YKS iki gün sürecek: TYT ${tarihMetni(tyt.tarih)}, AYT ve YDT ise ${tarihMetni(ayt.tarih)} günü yapılacak.`,
  },
  {
    soru: 'TYT saat kaçta başlıyor?',
    cevap: `TYT (Temel Yeterlilik Testi) ${tarihMetni(tyt.tarih)} günü saat ${saatMetni(tyt.tarih)}'te başlar.`,
  },
  {
    soru: 'AYT ve YDT saat kaçta?',
    cevap: `AYT (Alan Yeterlilik Testleri) ${tarihMetni(ayt.tarih)} günü saat ${saatMetni(ayt.tarih)}'te, YDT (Yabancı Dil Testi) ise aynı gün saat ${saatMetni(ydt.tarih)}'te başlar.`,
  },
  {
    soru: "YKS'ye kaç gün kaldı?",
    cevap: "Yukarıdaki sayaçtan TYT, AYT veya YDT'yi seçerek her oturuma kalan gün, saat, dakika ve saniyeyi Türkiye saatine göre canlı takip edebilirsiniz.",
  },
  {
    soru: 'YKS tarihi değişebilir mi?',
    cevap: "Tarihler ÖSYM'nin yayımladığı resmi sınav takvimine dayanıyor. ÖSYM bir değişiklik duyurursa sayacımız da güncellenir.",
  },
];

export default function YksSayfasi() {
  const simdi = sunucuZamani();
  const oturumlar = sonucluOturumlar(yks, simdi);
  return (
    <SayacSayfasi
      tema="emerald"
      Ikon={BookOpen}
      rozet="ÖSYM"
      geriLink="/sinavlar"
      geriEtiket="Sınavlar"
      baslik={`YKS ${yks.yil}`}
      altBaslik="TYT, AYT ve YDT oturumlarına kalan süre"
      metin="YKS (Yükseköğretim Kurumları Sınavı), üniversiteye girmek için ÖSYM tarafından yılda bir kez yapılan sınavdır. Üç oturumdan oluşur: herkesin girdiği TYT, alan puanları için AYT ve dil puanı için YDT. Yerleştirme puanında diploma notu (OBP) da hesaba katılır."
      bilgiler={yks.bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={oturumlar}
        baslangic={yks.baslangic}
        baslangicEtiketi={yks.baslangicEtiketi}
        tema="emerald"
        depoAnahtari="sayachane_yks_seviye"
        varsayilan={siradakiIndeks(oturumlar, simdi)}
        bittiMesaji="Bu oturum tamamlandı. Tüm adaylara başarılar!"
      />
    </SayacSayfasi>
  );
}
