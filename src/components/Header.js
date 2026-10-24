"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-black text-emerald-400 tracking-tighter hover:text-emerald-300 transition-colors">
            SAYAÇHANE
          </Link>

          {/* Masaüstü Menü (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            {/* Sınavlar Dropdown */}
            <div className="relative group">
              <button className="text-zinc-300 hover:text-emerald-400 font-medium py-5">
                Sınavlar ▾
              </button>
              <div className="absolute top-full left-0 w-40 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden transform group-hover:translate-y-0 translate-y-2">
                <Link href="/yks" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors">YKS Sayacı</Link>
                <Link href="/kpss" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors">KPSS Sayacı</Link>
                <Link href="/lgs" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors">LGS Sayacı</Link>
                <Link href="/dgs" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors">DGS Sayacı</Link>
              </div>
            </div>

            {/* Bayramlar Dropdown */}
            <div className="relative group">
              <button className="text-zinc-300 hover:text-emerald-400 font-medium py-5">
                Resmi Bayramlar ▾
              </button>
              <div className="absolute top-full left-0 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden transform group-hover:translate-y-0 translate-y-2">
                <Link href="/29-ekim" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors">29 Ekim Cumhuriyet B.</Link>
                <Link href="/23-nisan" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors">23 Nisan Ulusal E. ve Ç. B.</Link>
              </div>
            </div>

            {/* Dini Günler Dropdown */}
            <div className="relative group">
              <button className="text-zinc-300 hover:text-emerald-400 font-medium py-5">
                Dini Günler ▾
              </button>
              <div className="absolute top-full left-0 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden transform group-hover:translate-y-0 translate-y-2">
                <Link href="/ramazan" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors">Ramazan Sayacı</Link>
                <Link href="/kurban-bayrami" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors">Kurban Bayramı</Link>
              </div>
            </div>

            {/* Özel Sayaç Butonu */}
            <Link href="/ozel" className="text-zinc-300 hover:text-emerald-400 font-medium py-5">
              Özel Sayaç
            </Link>
          </nav>

          {/* Mobil Menü Butonu (Hamburger) */}
          <button 
            className="md:hidden text-zinc-300 hover:text-white p-2"
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

      {/* Mobil Açılır Menü (Telefonlar için) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-4 pt-2 pb-6 space-y-1 overflow-y-auto max-h-[80vh]">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 mt-4">Sınavlar</div>
            <Link href="/yks" className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">YKS Sayacı</Link>
            <Link href="/kpss" className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">KPSS Sayacı</Link>
            <Link href="/lgs" className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">LGS Sayacı</Link>
            <Link href="/dgs" className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">DGS Sayacı</Link>
            
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 mt-6">Resmi Bayramlar</div>
            <Link href="/29-ekim" className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">29 Ekim Cumhuriyet Bayramı</Link>
            <Link href="/23-nisan" className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">23 Nisan Ulusal Egemenlik</Link>

            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 mt-6">Dini Günler</div>
            <Link href="/ramazan" className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">Ramazan Sayacı</Link>
            
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 mt-6">Araçlar</div>
            <Link href="/ozel" className="block px-3 py-2 text-base font-medium text-emerald-400 hover:bg-zinc-800 rounded-lg">Kendi Sayacını Oluştur</Link>
          </div>
        </div>
      )}
    </header>
  );
}