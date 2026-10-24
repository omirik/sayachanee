"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-zinc-950 border-b border-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* SOL TARAF: Logo ve Sayaçhane Yazısı */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center transition-colors group-hover:border-emerald-500/50">
              {/* Saat İkonu */}
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Sayaçhane</span>
          </Link>

          {/* SAĞ TARAF: Masaüstü Linkleri */}
          <nav className="hidden md:flex items-center space-x-8">
            
            {/* 1. Sayaçlar (Açılır Menü) */}
            <div className="relative group">
              <button className="text-sm font-medium text-zinc-400 hover:text-white py-8 flex items-center gap-1.5 transition-colors">
                Sayaçlar
                <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {/* Dropdown Kutusu */}
              <div className="absolute top-full right-0 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden transform group-hover:translate-y-0 translate-y-2">
                <Link href="/sinavlar" className="block px-5 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors border-b border-zinc-800/50">
                  Sınavlar
                </Link>
                <Link href="/resmi-bayramlar" className="block px-5 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors border-b border-zinc-800/50">
                  Resmi Bayramlar
                </Link>
                <Link href="/dini-gunler" className="block px-5 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors border-b border-zinc-800/50">
                  Dini Günler
                </Link>
                <Link href="/ozel" className="block px-5 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors">
                  Özel Sayaç
                </Link>
              </div>
            </div>

            {/* 2. 3. ve 4. Linkler */}
            <Link href="/hakkimizda" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Hakkımızda</Link>
            <Link href="/gizlilik-politikasi" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Gizlilik</Link>
            <Link href="/kullanim-kosullari" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Koşullar</Link>
            
            {/* 5. İletişim Butonu (Hap şeklinde tasarım) */}
            <Link href="/iletisim" className="text-sm font-medium px-5 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all">
              İletişim
            </Link>
          </nav>

          {/* Mobil Menü Butonu (Telefonda görünür) */}
          <button 
            className="md:hidden text-zinc-400 hover:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobil Açılır Menü */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-2">
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 mt-4 ml-3">Sayaçlar</div>
          <Link href="/sinavlar" className="block px-3 py-2 text-sm font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">Sınavlar</Link>
          <Link href="/resmi-bayramlar" className="block px-3 py-2 text-sm font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">Resmi Bayramlar</Link>
          <Link href="/dini-gunler" className="block px-3 py-2 text-sm font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">Dini Günler</Link>
          <Link href="/ozel" className="block px-3 py-2 text-sm font-medium text-emerald-400 hover:bg-zinc-800 rounded-lg">Özel Sayaç</Link>
          
          <div className="h-px bg-zinc-800 my-4 mx-2"></div>
          
          <Link href="/hakkimizda" className="block px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white">Hakkımızda</Link>
          <Link href="/gizlilik-politikasi" className="block px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white">Gizlilik</Link>
          <Link href="/kullanim-kosullari" className="block px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white">Koşullar</Link>
          <Link href="/iletisim" className="block px-3 py-2 mt-2 text-sm font-medium text-white bg-zinc-800 border border-zinc-700 rounded-lg text-center">İletişim</Link>
        </div>
      )}
    </header>
  );
}