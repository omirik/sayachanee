import { Star } from 'lucide-react';
import SayacSayfasi from '@/components/sayac/SayacSayfasi';
import OturumluSayac from '@/components/sayac/OturumluSayac';
import { kurbanBayrami as b } from '@/data/sayaclar';
import { tarihMetni } from '@/lib/zaman';

const gunler = b.bayramGunleri;

const sorular = [
  {
    soru: `${b.yil} Kurban Bayramı ne zaman?`,
    cevap: `Diyanet takvimine göre ${b.yil} Kurban Bayramı ${tarihMetni(gunler[0])} günü başlıyor ve ${tarihMetni(gunler[gunler.length - 1])} günü sona eriyor. Arefe günü ${tarihMetni(b.arefe)}.`,
  },
  {
    soru: 'Kurban Bayramı tatili kaç gün sürer?',
    cevap: 'Kurban Bayramı resmi tatili arefe günü öğleden sonra (yarım gün) ve bayramın 4 günü olmak üzere toplam 4,5 gündür. Ek tatil (köprü) kararları ayrıca açıklanır.',
  },
  {
    soru: 'Kurban Bayramına kaç gün kaldı?',
    cevap: 'Yukarıdaki canlı sayaç, bayramın ilk gününe kalan gün, saat, dakika ve saniyeyi Türkiye saatine göre anlık gösterir.',
  },
];

export default function KurbanBayramiSayfasi() {
  return (
    <SayacSayfasi
      tema="amber"
      Ikon={Star}
      rozet="Dini Bayram"
      geriLink="/dini-gunler"
      geriEtiket="Dini Günler"
      baslik={`Kurban Bayramı ${b.yil}`}
      altBaslik={`Arefe: ${tarihMetni(b.arefe, { gunAdi: false })} · Bayram: ${gunler.length} gün`}
      sorular={sorular}
    >
      <OturumluSayac
        oturumlar={b.oturumlar}
        baslangic={b.baslangic}
        baslangicEtiketi={b.baslangicEtiketi}
        bitisEtiketi="Bayram"
        saatGoster={false}
        kutlama="İyi bayramlar! 🎉"
        tema="amber"
        bittiMesaji="Bayramınız mübarek olsun! Yeni yılın tarihi için sayaç yakında güncellenecek."
      />
    </SayacSayfasi>
  );
}
