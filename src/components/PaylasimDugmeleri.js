'use client';
import { useState } from 'react';
import { Check, Link2, MessageCircle, Share2 } from 'lucide-react';
import { track } from '@vercel/analytics';
import { kalanSure, yillikTarihler } from '@/lib/zaman';

/**
 * Paylaş · WhatsApp · Bağlantıyı Kopyala düğmeleri.
 *
 * Paylaşım metni tıklama anında hesaplanır ve canlı gün sayısını içerir:
 *   "⏳ YKS'ye 210 gün kaldı!  Sen de takip et 👉 https://www.sayachane.com.tr/yks"
 *
 * Kullanım:
 *  - Sunucu sayfalarından: yol + hedef (veya tekrar) + ifade ("YKS'ye", "Yılbaşına")
 *  - İstemci sayfalarından: yol + metin (o anki metni döndüren fonksiyon)
 */
export default function PaylasimDugmeleri({ yol, baslik, hedef, tekrar, ifade, ek, metin }) {
  const [kopyalandi, setKopyalandi] = useState(false);

  const baglanti = () => `${window.location.origin}${yol}`;

  function paylasimMetni() {
    if (typeof metin === 'function') return metin();
    if (typeof metin === 'string') return metin;

    const simdi = Date.now();
    let hedefMs = typeof hedef === 'number' ? hedef : new Date(hedef).getTime();
    if (tekrar && hedefMs <= simdi) hedefMs = yillikTarihler(tekrar.ay, tekrar.gun, simdi).hedef;

    const fark = hedefMs - simdi;
    if (fark <= 0) return `${baslik} geri sayımı Sayaçhane'de`;
    const { gun } = kalanSure(fark);
    const sure = gun > 0 ? `${gun} gün kaldı!` : '1 günden az kaldı!';
    return `${gun > 0 ? '⏳' : '⏰'} ${ifade} ${sure}${ek ? ` (${ek})` : ''}`;
  }

  // Hangi sayfanın, hangi yolla paylaşıldığını Vercel Analytics'te görmek için.
  function kaydet(yontem) {
    try {
      track('paylas', { sayfa: yol.split('?')[0], yontem });
    } catch {}
  }

  async function kopyala() {
    kaydet('kopyala');
    try {
      await navigator.clipboard.writeText(baglanti());
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2500);
    } catch {
      window.prompt('Bağlantıyı kopyala:', baglanti());
    }
  }

  async function paylas() {
    const url = baglanti();
    if (navigator.share) {
      kaydet('sistem');
      try {
        await navigator.share({ title: baslik, text: `${paylasimMetni()}\nSen de takip et 👉`, url });
        return;
      } catch (hata) {
        if (hata?.name === 'AbortError') return; // kullanıcı vazgeçti
      }
    }
    kopyala();
  }

  function whatsapp() {
    kaydet('whatsapp');
    const yazi = `${paylasimMetni()}\nSen de takip et 👉 ${baglanti()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(yazi)}`, '_blank', 'noopener');
  }

  const dugme = 'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors';

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button type="button" onClick={paylas} className={`${dugme} bg-rose-500 hover:bg-rose-400 text-white`}>
        <Share2 size={16} /> Paylaş
      </button>
      <button type="button" onClick={whatsapp} className={`${dugme} bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-zinc-200`}>
        <MessageCircle size={16} className="text-emerald-400" /> WhatsApp
      </button>
      <button
        type="button"
        onClick={kopyala}
        className={`${dugme} bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200`}
        aria-live="polite"
      >
        {kopyalandi ? <Check size={16} className="text-emerald-400" /> : <Link2 size={16} />}
        {kopyalandi ? 'Kopyalandı' : 'Bağlantıyı Kopyala'}
      </button>
    </div>
  );
}
