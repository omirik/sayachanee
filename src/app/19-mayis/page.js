import { Sun } from 'lucide-react';
import MilliBayramSayfasi from '@/components/sayac/MilliBayramSayfasi';

// Başlıktaki yıl, bayram geçince kendiliğinden güncellensin diye saatte bir yenilenir.
export const revalidate = 3600;

const sorular = [
  {
    soru: "19 Mayıs'ın önemi nedir?",
    cevap: "Mustafa Kemal Atatürk'ün 19 Mayıs 1919'da Samsun'a çıkarak Milli Mücadele'yi başlattığı gündür. Atatürk bu günü Türk gençliğine armağan etmiştir.",
  },
  {
    soru: '19 Mayıs resmi tatil mi?',
    cevap: "Evet, 19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı Türkiye genelinde tam gün resmi tatildir.",
  },
  {
    soru: 'Sayaç her yıl otomatik yenileniyor mu?',
    cevap: '19 Mayıs geçtiği anda sayaç kendiliğinden bir sonraki yılın bayramı için geri saymaya başlar.',
  },
];

export default function Page() {
  return <MilliBayramSayfasi slug="19-mayis" Ikon={Sun} sorular={sorular} />;
}
