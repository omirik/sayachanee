import { sayfaMeta } from '@/lib/site';
import { KategoriSayfasi } from '@/components/sayac/KategoriListesi';

export const metadata = sayfaMeta('/resmi-bayramlar');
export const revalidate = 3600;

export default function ResmiBayramlarSayfasi() {
  return (
    <KategoriSayfasi
      baslik="Resmi"
      vurgu="Tatiller"
      vurguRengi="text-red-500"
      aciklama="Milli bayramlara, yılbaşına, 1 Mayıs'a ve 15 Temmuz'a kalan süre. Sayaçlar gün geçince kendiliğinden bir sonraki yıla geçer."
      kategori="milli"
    />
  );
}
