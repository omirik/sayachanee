import Link from 'next/link';
import { Timer } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 py-8 relative z-50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo Kısmı */}
        <div className="flex items-center gap-2 text-zinc-300">
          <Timer size={20} className="text-emerald-500" />
          <span className="font-bold text-lg tracking-tight">Sayaçhane</span>
        </div>
        
        {/* AdSense İçin Zorunlu Linkler */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-medium text-zinc-400">
          <Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link>
          <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
          <Link href="/kullanim-kosullari" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
          <Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link>
        </div>

        {/* Telif Hakkı */}
        <div className="text-zinc-600 text-xs text-center md:text-right">
          © {new Date().getFullYear()} Sayaçhane.<br/>
          Tüm hakları saklıdır.
        </div>
        
      </div>
    </footer>
  );
}