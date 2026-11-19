// Paylaşılan özel sayaçların önizleme görseli: /api/og/ozel?ad=Tatil&t=2027-07-01T09:00
// "Kaç gün kaldı" bilgisi istek anında hesaplanır.
import { ogResim } from '@/lib/og';
import { paylasimCoz } from '@/lib/ozel';
import { tarihMetni, saatMetni, kalanSure } from '@/lib/zaman';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sayac = paylasimCoz(searchParams.get('ad'), searchParams.get('t'));

  if (!sayac) {
    return ogResim({ etiket: 'Özel Sayaç', baslik: 'Kendi geri sayımını oluştur', tema: 'rose' });
  }

  const fark = sayac.hedef - Date.now();
  const gun = kalanSure(fark).gun;
  const vurgu = fark <= 0 ? 'Geldi!' : gun > 0 ? `${gun} gün` : 'Bugün!';

  return ogResim(
    {
      etiket: 'Geri sayım',
      baslik: sayac.isim,
      alt: `${tarihMetni(sayac.hedef)} · ${saatMetni(sayac.hedef)}`,
      vurgu,
      tema: 'rose',
    },
    // Gün sayısı değiştiği için en fazla 1 saat önbellekte kalsın.
    { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } },
  );
}
