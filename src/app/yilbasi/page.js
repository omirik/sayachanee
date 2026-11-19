import { PartyPopper } from 'lucide-react';
import MilliBayramSayfasi from '@/components/sayac/MilliBayramSayfasi';

// Başlıktaki yıl, yılbaşı geçince kendiliğinden güncellensin diye saatte bir yenilenir.
export const revalidate = 3600;

const sorular = [
  {
    soru: 'Yılbaşına kaç gün kaldı?',
    cevap: 'Yukarıdaki canlı sayaç, yeni yıla (1 Ocak 00:00, Türkiye saati) kalan gün, saat, dakika ve saniyeyi gösterir.',
  },
  {
    soru: '1 Ocak resmi tatil mi?',
    cevap: 'Evet, 1 Ocak Yılbaşı Türkiye’de tam gün resmi tatildir. 31 Aralık ise resmi tatil değildir.',
  },
  {
    soru: 'Sayaç her yıl otomatik yenileniyor mu?',
    cevap: 'Yeni yıla girildiği anda sayaç kendiliğinden bir sonraki yılbaşı için geri saymaya başlar.',
  },
];

export default function Page() {
  return <MilliBayramSayfasi slug="yilbasi" Ikon={PartyPopper} sorular={sorular} />;
}
