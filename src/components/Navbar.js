'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Timer } from 'lucide-react';

export default function Navbar() {
  const [menuAcik, setMenuAcik] = useState(false);
  const pathname = usePathname(); // Hangi sayfadaysak o linki parlatmak için

  const linkler = [
    { ad: 'Ana Sayfa', yol: '/' },
    { ad: 'Ramazan', yol: '/ramazan' },
    { ad: 'YKS', yol: '/yks' },
    { ad: 'KPSS', yol: '/kpss' },
    { ad: 'Özel Sayaç', yol: '/ozel' },
    { ad: 'İletişim', yol: '/iletisim' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 group">
          <Timer className="text-emerald-400 group-hover:rotate-12 transition-transform" /> 
          Sayaçhane
        </Link>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {linkler.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.yol} 
              className={`transition-colors relative ${pathname === link.yol ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              {link.ad}
              {/* Aktif sayfadaysa altına parlayan çizgi atar */}
              {pathname === link.yol && (
                <span className="absolute -bottom-6 left-0 w-full h-[2px] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobil Hamburger Butonu */}
        <button 
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMenuAcik(!menuAcik)}
        >
          {menuAcik ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobil Açılır Menü */}
      {menuAcik && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800 shadow-2xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 gap-2">
            {linkler.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.yol}
                onClick={() => setMenuAcik(false)}
                className={`p-4 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.yol ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                {link.ad}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}