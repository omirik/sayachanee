'use client';
import { useState } from 'react';
import { Check, Link2, MessageCircle, Share2 } from 'lucide-react';
import { paylasimYolu } from '@/lib/ozel';

/**
 * Özel sayacı paylaşma düğmeleri: telefonda sistem paylaşım menüsü,
 * WhatsApp ve bağlantıyı kopyala.
 */
export default function PaylasDugmeleri({ isim, hedef }) {
  const [kopyalandi, setKopyalandi] = useState(false);

  const baglanti = () => `${window.location.origin}${paylasimYolu(isim, hedef)}`;
  const metin = `${isim} için geri sayım:`;

  async function paylas() {
    const url = baglanti();
    if (navigator.share) {
      try {
        await navigator.share({ title: isim, text: metin, url });
        return;
      } catch {
        // Kullanıcı vazgeçtiyse ya da desteklenmiyorsa kopyalamaya düş.
      }
    }
    kopyala();
  }

  async function kopyala() {
    try {
      await navigator.clipboard.writeText(baglanti());
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2500);
    } catch {
      window.prompt('Bağlantıyı kopyala:', baglanti());
    }
  }

  function whatsapp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${metin} ${baglanti()}`)}`, '_blank', 'noopener');
  }

  const dugme = 'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors';

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button type="button" onClick={paylas} className={`${dugme} bg-rose-500 hover:bg-rose-400 text-white`}>
        <Share2 size={16} /> Paylaş
      </button>
      <button type="button" onClick={whatsapp} className={`${dugme} bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-zinc-200`}>
        <MessageCircle size={16} className="text-emerald-400" /> WhatsApp
      </button>
      <button type="button" onClick={kopyala} className={`${dugme} bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200`} aria-live="polite">
        {kopyalandi ? <Check size={16} className="text-emerald-400" /> : <Link2 size={16} />}
        {kopyalandi ? 'Kopyalandı' : 'Bağlantıyı Kopyala'}
      </button>
    </div>
  );
}
