import { Presentation } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { ags } from '@/data/sayaclar';
import { tarihMetni, saatMetni, siradakiIndeks, sunucuZamani, sonucluOturumlar } from '@/lib/zaman';

// Sıradaki oturumun seçili gelmesi için sayfa saatlik yenilenir.
export const revalidate = 3600;

const [agsOturumu, oabt] = ags.oturumlar;

const sorular = [
  {
    soru: `AGS ${ags.yil} ne zaman?`,
    cevap: `ÖSYM'nin ${ags.yil} takvimine göre MEB Akademi Giriş Sınavı (AGS) ${tarihMetni(agsOturumu.tarih)} günü saat ${saatMetni(agsOturumu.tarih)}'te, Öğretmenlik Alan Bilgisi Testi (ÖABT) ise ertesi gün, ${tarihMetni(oabt.tarih)} günü yapılacak.`,
  },
  {
    soru: 'AGS başvuruları ne zaman?',
    cevap: `Başvurular 19-29 Mart ${ags.yil} tarihleri arasında ÖSYM üzerinden alınacak. Geç başvuru günü 6 Nisan ${ags.yil}.`,
  },
  {
    soru: 'AGS sonuçları ne zaman açıklanacak?',
    cevap: `ÖSYM'nin planına göre sonuçlar 11 Haziran ${ags.yil} tarihinde açıklanacak.`,
  },
  {
    soru: "AGS'ye kaç gün kaldı?",
    cevap: "Yukarıdaki sayaçtan AGS veya ÖABT'yi seçerek kalan süreyi Türkiye saatine göre canlı takip edebilirsin.",
  },
];

export default function AgsSayfasi() {
  const simdi = sunucuZamani();
  const oturumlar = sonucluOturumlar(ags, simdi);
  return (
    <SayacSayfasi
      tema="indigo"
      Ikon={Presentation}
      rozet="ÖSYM · MEB"
      geriLink="/sinavlar"
      geriEtiket="Sınavlar"
      baslik={`AGS ${ags.yil}`}
      altBaslik="MEB Akademi Giriş Sınavı ve ÖABT'ye kalan süre"
      metin="AGS (Akademi Giriş Sınavı), öğretmen olmak isteyen adayların Millî Eğitim Akademisi'ne girişi için ÖSYM tarafından MEB adına yapılan sınavdır. Alan öğretmenliği adayları, ertesi gün yapılan Öğretmenlik Alan Bilgisi Testi'ne (ÖABT) de girer."
      bilgiler={ags.bilgiler}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={oturumlar}
        baslangic={ags.baslangic}
        baslangicEtiketi={ags.baslangicEtiketi}
        tema="indigo"
        depoAnahtari="sayachane_ags_oturum"
        varsayilan={siradakiIndeks(oturumlar, simdi)}
        bittiMesaji="Bu oturum tamamlandı. Tüm adaylara başarılar!"
      />
    </SayacSayfasi>
  );
}
