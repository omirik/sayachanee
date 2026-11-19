import { sayfaMeta } from '@/lib/site';
import { KategoriSayfasi } from '@/components/sayac/KategoriListesi';

export const metadata = sayfaMeta('/dini-gunler');
export const revalidate = 3600;

export default function DiniGunlerSayfasi() {
  return (
    <KategoriSayfasi
      baslik="Dini"
      vurgu="Günler"
      vurguRengi="text-amber-500"
      aciklama="Ramazan, Ramazan Bayramı ve Kurban Bayramı'na kalan süre. Tarihler Diyanet İşleri Başkanlığı takvimine dayanır."
      kategori="dini"
    />
  );
}
