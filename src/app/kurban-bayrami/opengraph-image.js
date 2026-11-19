import { OG_BOYUT } from '@/lib/og';
import { ogSayfalar, sayfaGorseli } from '@/lib/ogSayfalar';

export const size = OG_BOYUT;
export const contentType = 'image/png';
export const alt = ogSayfalar['/kurban-bayrami'].baslik;

export default function Image() {
  return sayfaGorseli('/kurban-bayrami');
}
