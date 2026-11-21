'use client';
import { useState } from 'react';
import { Check, ImagePlus, Link2, Loader2, MessageCircle, Share2 } from 'lucide-react';
import { track } from '@vercel/analytics';
import { kalanSure, yillikTarihler, tarihMetni } from '@/lib/zaman';

const iki = (n) => String(n).padStart(2, '0');

/**
 * Paylaş · WhatsApp · Hikâye · Bağlantıyı Kopyala düğmeleri.
 *
 * Paylaşım metni tıklama anında hesaplanır ve canlı gün sayısını içerir:
 *   "⏳ YKS'ye 210 gün kaldı!  Sen de takip et 👉 https://www.sayachane.com.tr/yks"
 *
 * Kullanım:
 *  - Sunucu sayfalarından: yol + hedef (veya tekrar) + ifade ("YKS'ye", "Yılbaşına")
 *  - İstemci sayfalarından: yol + metin (o anki metni döndüren fonksiyon) + hikaye (görsel bilgisi döndüren fonksiyon)
 */
export default function PaylasimDugmeleri({ yol, baslik, hedef, tekrar, ifade, ek, metin, hikaye, tema = 'emerald' }) {
  const [kopyalandi, setKopyalandi] = useState(false);
  const [hikayeDurumu, setHikayeDurumu] = useState('bos'); // bos | hazirlaniyor | hazir | bitti
  const [hazirDosya, setHazirDosya] = useState(null);

  const baglanti = () => `${window.location.origin}${yol}`;

  // Hedef ve kalan süre (hedef verilen sayfalarda)
  function kalan() {
    const simdi = Date.now();
    let hedefMs = typeof hedef === 'number' ? hedef : new Date(hedef).getTime();
    if (tekrar && hedefMs <= simdi) hedefMs = yillikTarihler(tekrar.ay, tekrar.gun, simdi).hedef;
    return { hedefMs, fark: hedefMs - simdi };
  }

  function paylasimMetni() {
    if (typeof metin === 'function') return metin();
    if (typeof metin === 'string') return metin;

    const { fark } = kalan();
    if (fark <= 0) return `${baslik} geri sayımı Sayaçhane'de`;
    const { gun } = kalanSure(fark);
    const sure = gun > 0 ? `${gun} gün kaldı!` : '1 günden az kaldı!';
    return `${gun > 0 ? '⏳' : '⏰'} ${ifade} ${sure}${ek ? ` (${ek})` : ''}`;
  }

  // Hikâye görselinde yazacaklar: { ust, sayi, birim, alt }
  function hikayeBilgisi() {
    if (typeof hikaye === 'function') return hikaye();
    if (!hedef) return null;
    const { hedefMs, fark } = kalan();
    if (fark <= 0) return null;
    const k = kalanSure(fark);
    return {
      ust: ifade,
      sayi: k.gun > 0 ? String(k.gun) : `${k.saat}:${iki(k.dakika)}`,
      birim: k.gun > 0 ? 'gün kaldı' : 'saat kaldı',
      alt: `${tarihMetni(hedefMs)}${ek ? ` · ${ek}` : ''}`,
    };
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

  // Görseli telefonun paylaşım menüsüne gönder (Instagram > Hikâye); olmazsa indir.
  async function dosyayiPaylas(dosya) {
    if (navigator.canShare?.({ files: [dosya] })) {
      try {
        await navigator.share({ files: [dosya] });
        setHikayeDurumu('bitti');
        setHazirDosya(null);
      } catch (hata) {
        if (hata?.name === 'NotAllowedError') {
          // Görsel hazırlanırken tarayıcı "kullanıcı dokunuşu" süresini aştı: ikinci dokunuşta paylaşılır
          setHazirDosya(dosya);
          setHikayeDurumu('hazir');
        } else {
          setHikayeDurumu('bos');
        }
      }
      return;
    }
    // Bilgisayar ya da dosya paylaşımı desteklenmiyor: indir
    const url = URL.createObjectURL(dosya);
    const a = document.createElement('a');
    a.href = url;
    a.download = dosya.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    setHikayeDurumu('bitti');
  }

  async function hikayeyePaylas() {
    if (hikayeDurumu === 'hazir' && hazirDosya) return dosyayiPaylas(hazirDosya);
    const bilgi = hikayeBilgisi();
    if (!bilgi) return;
    kaydet('hikaye');
    setHikayeDurumu('hazirlaniyor');
    try {
      const q = new URLSearchParams({ ...bilgi, adres: yol, tema });
      const yanit = await fetch(`/api/hikaye?${q}`);
      if (!yanit.ok) throw new Error(`HTTP ${yanit.status}`);
      const blob = await yanit.blob();
      const ad = `sayachane${yol.split('?')[0].replace(/\//g, '-')}.png`;
      await dosyayiPaylas(new File([blob], ad, { type: 'image/png' }));
    } catch {
      setHikayeDurumu('bos');
    }
  }

  const dugme = 'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={paylas} className={`${dugme} bg-rose-500 hover:bg-rose-400 text-white`}>
          <Share2 size={16} /> Paylaş
        </button>
        <button type="button" onClick={whatsapp} className={`${dugme} bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-zinc-200`}>
          <MessageCircle size={16} className="text-emerald-400" /> WhatsApp
        </button>
        <button
          type="button"
          onClick={hikayeyePaylas}
          disabled={hikayeDurumu === 'hazirlaniyor'}
          className={`${dugme} border text-white disabled:opacity-70 ${
            hikayeDurumu === 'hazir'
              ? 'bg-fuchsia-600 border-fuchsia-500 animate-pulse'
              : 'bg-gradient-to-r from-fuchsia-600/80 via-rose-500/80 to-amber-500/80 border-transparent hover:from-fuchsia-600 hover:to-amber-500'
          }`}
        >
          {hikayeDurumu === 'hazirlaniyor' ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
          {hikayeDurumu === 'hazir' ? 'Görsel hazır, paylaş' : 'Hikâye'}
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
      {hikayeDurumu === 'bitti' && (
        <p className="text-xs text-zinc-400 text-center max-w-sm" aria-live="polite">
          İpucu: Instagram hikâyesinde <span className="text-zinc-200">bağlantı çıkartması</span> ekleyip sayaç adresini de paylaşabilirsin.
        </p>
      )}
    </div>
  );
}
