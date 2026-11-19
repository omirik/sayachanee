import { FileText } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { ales } from '@/data/sayaclar';
import { tarihMetni, saatMetni, siradakiIndeks, sunucuZamani } from '@/lib/zaman';

// Sıradaki oturumun seçili gelmesi için sayfa saatlik yenilenir.
export const revalidate = 3600;

const [a1, a2, a3] = ales.oturumlar;

const sorular = [
  {
    soru: `ALES ${ales.yil} ne zaman?`,
    cevap: `ÖSYM'nin ${ales.yil} takvimine göre ALES yılda üç kez yapılacak: ALES/1 ${tarihMetni(a1.tarih)}, ALES/2 ${tarihMetni(a2.tarih)}, ALES/3 ise ${tarihMetni(a3.tarih)} günü. Sınavlar saat ${saatMetni(a1.tarih)}'te başlar.`,
  },
  {
    soru: "ALES'e kaç gün kaldı?",
    cevap: 'Yukarıdaki sayaçtan ALES/1, ALES/2 veya ALES/3 oturumunu seçerek kalan gün, saat, dakika ve saniyeyi Türkiye saatine göre canlı takip edebilirsin.',
  },
  {
    soru: 'ALES puanı ne kadar geçerli?',
    cevap: 'ALES sonuç belgesi, sonuçların açıklandığı tarihten itibaren 5 yıl geçerlidir.',
  },
  {
    soru: 'ALES tarihi değişebilir mi?',
    cevap: "Tarihler ÖSYM'nin yayımladığı resmi sınav takvimine dayanıyor. ÖSYM bir değişiklik duyurursa sayacımız da güncellenir.",
  },
];

export default function AlesSayfasi() {
  return (
    <SayacSayfasi
      tema="purple"
      Ikon={FileText}
      rozet="ÖSYM"
      geriLink="/sinavlar"
      geriEtiket="Sınavlar"
      baslik={`ALES ${ales.yil}`}
      altBaslik="Akademik Personel ve Lisansüstü Eğitimi Giriş Sınavı'na kalan süre"
      metin="ALES; yüksek lisans ve doktora programlarına başvurmak, araştırma görevlisi ya da öğretim görevlisi olmak isteyenlerin girdiği bir sınavdır. Sayısal ve sözel olmak üzere iki bölümden oluşur ve yılda üç kez yapılır."
      bilgiler={ales.bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={ales.oturumlar}
        baslangic={ales.baslangic}
        baslangicEtiketi={ales.baslangicEtiketi}
        tema="purple"
        depoAnahtari="sayachane_ales_oturum"
        varsayilan={siradakiIndeks(ales.oturumlar, sunucuZamani())}
        bittiMesaji="Bu ALES oturumu tamamlandı. Yukarıdan sıradaki oturumu seçebilirsin."
      />
    </SayacSayfasi>
  );
}
