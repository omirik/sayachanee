import { Handshake } from 'lucide-react';
import MilliBayramSayfasi from '@/components/sayac/MilliBayramSayfasi';

// Başlıktaki yıl, gün geçince kendiliğinden güncellensin diye saatte bir yenilenir.
export const revalidate = 3600;

const sorular = [
  {
    soru: '1 Mayıs resmi tatil mi?',
    cevap: '1 Mayıs Emek ve Dayanışma Günü, 2009’dan bu yana Türkiye’de tam gün resmi tatildir.',
  },
  {
    soru: "1 Mayıs'a kaç gün kaldı?",
    cevap: 'Yukarıdaki canlı sayaç, 1 Mayıs’a kalan gün, saat, dakika ve saniyeyi Türkiye saatine göre gösterir.',
  },
  {
    soru: 'Sayaç her yıl otomatik yenileniyor mu?',
    cevap: '1 Mayıs geçtiği anda sayaç kendiliğinden bir sonraki yıl için geri saymaya başlar.',
  },
];

export default function Page() {
  return <MilliBayramSayfasi slug="1-mayis" Ikon={Handshake} sorular={sorular} />;
}
