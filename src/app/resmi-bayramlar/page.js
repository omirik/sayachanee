import { sayfaMeta } from '@/lib/site';
import { KategoriSayfasi } from '@/components/sayac/KategoriListesi';

export const metadata = sayfaMeta('/resmi-bayramlar');
export const revalidate = 3600;

export default function ResmiBayramlarSayfasi() {
  return (
    <KategoriSayfasi
      baslik="Resmi"
      vurgu="Bayramlar"
      vurguRengi="text-red-500"
      aciklama="23 Nisan, 19 Mayıs, 30 Ağustos ve 29 Ekim'e kalan süre. Sayaçlar bayram geçince kendiliğinden bir sonraki yıla geçer."
      kategori="milli"
    />
  );
}
