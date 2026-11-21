import { sayfaMeta } from '@/lib/site';
import { KategoriSayfasi } from '@/components/sayac/KategoriListesi';

export const metadata = sayfaMeta('/sinavlar');
export const revalidate = 3600;

export default function SinavlarSayfasi() {
  return (
    <KategoriSayfasi
      baslik="Sınav"
      vurgu="Sayaçları"
      vurguRengi="text-emerald-500"
      aciklama="YKS, KPSS, LGS, DGS, ALES, YDS, MSÜ ve AGS'ye kaç gün kaldığını canlı takip et. Tarihler ÖSYM ve MEB'in resmi takvimlerine dayanır."
      kategori="sinav"
    />
  );
}
