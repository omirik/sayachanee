import { Award } from 'lucide-react';
import MilliBayramSayfasi from '@/components/sayac/MilliBayramSayfasi';

// Başlıktaki yıl, bayram geçince kendiliğinden güncellensin diye saatte bir yenilenir.
export const revalidate = 3600;

const sorular = [
  {
    soru: "30 Ağustos Zafer Bayramı'nın anlamı nedir?",
    cevap: "Başkomutan Mustafa Kemal Atatürk komutasında başlatılan Büyük Taarruz'un 30 Ağustos 1922'de Başkomutanlık Meydan Muharebesi ile zaferle sonuçlandığı gündür.",
  },
  {
    soru: '30 Ağustos resmi tatil mi?',
    cevap: 'Evet, 30 Ağustos Zafer Bayramı Türkiye genelinde tam gün resmi tatildir.',
  },
  {
    soru: 'Sayaç her yıl otomatik yenileniyor mu?',
    cevap: '30 Ağustos geçtiği anda sayaç kendiliğinden bir sonraki yılın Zafer Bayramı için geri saymaya başlar.',
  },
];

export default function Page() {
  return <MilliBayramSayfasi slug="30-agustos" Ikon={Award} sorular={sorular} />;
}
