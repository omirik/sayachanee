"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Timer, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSayaclarOpen, setIsMobileSayaclarOpen] = useState(false);
  
  // Tablet/Masaüstü için menü durumu
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tablette menü dışına dokunulduğunda açılır menüyü kapatan sistem
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDesktopDropdownOpen(false);
      }
    }
    // Hem fare tıklamasını hem de tablet/telefon dokunmasını dinler
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSayaclarOpen(false);
    setIsDesktopDropdownOpen(false);
  };

  return (
    <header className="bg-zinc-950 border-b border-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* SOL TARAF: Logo */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center transition-colors group-hover:border-emerald-500/50">
              <Timer className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Sayaçhane</span>
          </Link>

          {/* SAĞ TARAF: Masaüstü & Tablet Linkleri */}
          <nav className="hidden md:flex items-center space-x-8">
            
            {/* Sayaçlar Açılır Menüsü (Touch ve Mouse uyumlu) */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setIsDesktopDropdownOpen(true)}
              onMouseLeave={() => setIsDesktopDropdownOpen(false)}
            >
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsDesktopDropdownOpen(!isDesktopDropdownOpen);
                }}
                className="text-sm font-medium text-zinc-400 hover:text-white py-8 flex items-center gap-1.5 transition-colors"
              >
                Sayaçlar
                <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isDesktopDropdownOpen ? 'opacity-100 rotate-180 text-emerald-400' : 'opacity-50'}`} />
              </button>
              
              <div className={`absolute top-[85%] right-0 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl transition-all duration-200 overflow-hidden transform ${isDesktopDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <Link onClick={closeMenu} href="/sinavlar" className="block px-5 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors border-b border-zinc-800/50">Sınavlar</Link>
                <Link onClick={closeMenu} href="/resmi-bayramlar" className="block px-5 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors border-b border-zinc-800/50">Resmi Bayramlar</Link>
                <Link onClick={closeMenu} href="/dini-gunler" className="block px-5 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors border-b border-zinc-800/50">Dini Günler</Link>
                <Link onClick={closeMenu} href="/ozel" className="block px-5 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors">Özel Sayaç</Link>
              </div>
            </div>

            <Link onClick={closeMenu} href="/hakkimizda" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Hakkımızda</Link>
            <Link onClick={closeMenu} href="/gizlilik-politikasi" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Gizlilik</Link>
            <Link onClick={closeMenu} href="/kullanim-kosullari" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Koşullar</Link>
            <Link onClick={closeMenu} href="/iletisim" className="text-sm font-medium px-5 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all">İletişim</Link>
          </nav>

          {/* Mobil Menü Hamburger Butonu (Telefonlar için) */}
          <button 
            className="md:hidden text-zinc-400 hover:text-white p-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobil Açılır Menü (Telefonlar İçin Akordeon Yapılı) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-2 shadow-2xl">
          
          <button 
            onClick={() => setIsMobileSayaclarOpen(!isMobileSayaclarOpen)}
            className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2"><Timer size={18} className={isMobileSayaclarOpen ? "text-emerald-400" : ""} /> Sayaçlar</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileSayaclarOpen ? 'rotate-180 text-emerald-400' : ''}`} />
          </button>

          {isMobileSayaclarOpen && (
            <div className="pl-6 pr-3 py-2 space-y-1 bg-zinc-950/50 border border-zinc-800/50 rounded-lg mb-2">
              <Link onClick={closeMenu} href="/sinavlar" className="block px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">Sınavlar</Link>
              <Link onClick={closeMenu} href="/resmi-bayramlar" className="block px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">Resmi Bayramlar</Link>
              <Link onClick={closeMenu} href="/dini-gunler" className="block px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-lg">Dini Günler</Link>
              <Link onClick={closeMenu} href="/ozel" className="block px-3 py-2.5 text-sm font-medium text-emerald-400 hover:bg-zinc-800 rounded-lg">Özel Sayaç</Link>
            </div>
          )}
          
          <div className="h-px bg-zinc-800 my-4 mx-2"></div>
          
          <Link onClick={closeMenu} href="/hakkimizda" className="block px-3 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">Hakkımızda</Link>
          <Link onClick={closeMenu} href="/gizlilik-politikasi" className="block px-3 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">Gizlilik</Link>
          <Link onClick={closeMenu} href="/kullanim-kosullari" className="block px-3 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">Koşullar</Link>
          <Link onClick={closeMenu} href="/iletisim" className="block px-3 py-3 mt-2 text-sm font-medium text-white bg-zinc-800 border border-zinc-700 rounded-lg text-center shadow-lg transition-colors hover:bg-zinc-700">İletişim</Link>
        </div>
      )}
    </header>
  );
}