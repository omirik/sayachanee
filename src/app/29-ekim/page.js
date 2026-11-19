import { Flag } from 'lucide-react';
import MilliBayramSayfasi from '@/components/sayac/MilliBayramSayfasi';

// Başlıktaki yıl, bayram geçince kendiliğinden güncellensin diye saatte bir yenilenir.
export const revalidate = 3600;

const sorular = [
  {
    soru: '29 Ekim Cumhuriyet Bayramı nedir?',
    cevap: "29 Ekim 1923'te Cumhuriyetin ilan edilmesinin yıl dönümü olarak her yıl kutlanan milli bayramımızdır.",
  },
  {
    soru: 'Cumhuriyet Bayramı resmi tatil mi?',
    cevap: "Evet. Cumhuriyet Bayramı tatili 28 Ekim saat 13.00'te başlar ve 29 Ekim günü tam gün devam eder; toplam 1,5 gündür.",
  },
  {
    soru: 'Sayaç her yıl otomatik yenileniyor mu?',
    cevap: '29 Ekim geçtiği anda sayaç kendiliğinden bir sonraki yılın Cumhuriyet Bayramı için geri saymaya başlar.',
  },
];

export default function Page() {
  return <MilliBayramSayfasi slug="29-ekim" Ikon={Flag} sorular={sorular} />;
}
