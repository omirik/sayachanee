import { sayfaMeta } from '@/lib/site';
import { KategoriSayfasi } from '@/components/sayac/KategoriListesi';

export const metadata = sayfaMeta('/okul-takvimi');
export const revalidate = 3600;

export default function OkulTakvimiSayfasi() {
  return (
    <KategoriSayfasi
      baslik="Okul"
      vurgu="Takvimi"
      vurguRengi="text-indigo-400"
      aciklama="Karneye, ara tatile ve yaz tatiline kaç gün kaldı? Tarihler MEB'in 2026-2027 eğitim öğretim yılı çalışma takvimine dayanır."
      kategori="okul"
    />
  );
}
