'use client';
import PaylasimDugmeleri from '@/components/PaylasimDugmeleri';
import { paylasimYolu } from '@/lib/ozel';

// Özel sayacın paylaşım düğmeleri. Metin: "⏳ Yaz Tatili için 223 gün kaldı!"
export default function PaylasDugmeleri({ isim, hedef }) {
  return (
    <PaylasimDugmeleri
      yol={paylasimYolu(isim, hedef)}
      baslik={isim}
      ifade={`${isim} için`}
      hedef={hedef}
    />
  );
}
