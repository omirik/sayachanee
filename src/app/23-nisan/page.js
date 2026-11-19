import { Star } from 'lucide-react';
import MilliBayramSayfasi from '@/components/sayac/MilliBayramSayfasi';

// Başlıktaki yıl, bayram geçince kendiliğinden güncellensin diye saatte bir yenilenir.
export const revalidate = 3600;

const sorular = [
  {
    soru: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı nedir?',
    cevap: "Türkiye Büyük Millet Meclisi'nin 23 Nisan 1920'de açılışının yıl dönümüdür. Atatürk bu günü dünya çocuklarına armağan etmiştir.",
  },
  {
    soru: '23 Nisan resmi tatil mi?',
    cevap: 'Evet, 23 Nisan Türkiye genelinde tam gün resmi tatildir.',
  },
  {
    soru: 'Sayaç her yıl otomatik yenileniyor mu?',
    cevap: '23 Nisan geçtiği anda sayaç kendiliğinden bir sonraki yılın bayramı için geri saymaya başlar.',
  },
];

export default function Page() {
  return <MilliBayramSayfasi slug="23-nisan" Ikon={Star} sorular={sorular} />;
}
