import { Landmark } from 'lucide-react';
import MilliBayramSayfasi from '@/components/sayac/MilliBayramSayfasi';

// Başlıktaki yıl, gün geçince kendiliğinden güncellensin diye saatte bir yenilenir.
export const revalidate = 3600;

const sorular = [
  {
    soru: '15 Temmuz neden anılıyor?',
    cevap: '15 Temmuz 2016 darbe girişimine karşı gösterilen direniş ve hayatını kaybedenler, Demokrasi ve Milli Birlik Günü olarak anılır.',
  },
  {
    soru: '15 Temmuz resmi tatil mi?',
    cevap: 'Evet, 15 Temmuz Demokrasi ve Milli Birlik Günü 2017’den bu yana tam gün resmi tatildir.',
  },
  {
    soru: 'Sayaç her yıl otomatik yenileniyor mu?',
    cevap: '15 Temmuz geçtiği anda sayaç kendiliğinden bir sonraki yıl için geri saymaya başlar.',
  },
];

export default function Page() {
  return <MilliBayramSayfasi slug="15-temmuz" Ikon={Landmark} sorular={sorular} />;
}
