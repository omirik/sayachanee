"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Timer, Menu, X, CalendarHeart } from "lucide-react";
import { kategoriler, sayaclar } from "@/lib/katalog";
import { temalar } from "@/lib/tema";

// Masaüstü menü bağlantıları
const menu = [
  { ad: "Sınavlar", yol: "/sinavlar", kategori: "sinav" },
  { ad: "Okul Takvimi", yol: "/okul-takvimi", kategori: "okul" },
  { ad: "Resmi Tatiller", yol: "/resmi-bayramlar", kategori: "milli" },
  { ad: "Dini Günler", yol: "/dini-gunler", kategori: "dini" },
  { ad: "Özel Sayaç", yol: "/ozel" },
];

export default function Header() {
  const [acik, setAcik] = useState(false);
  const yol = usePathname();

  // Bir sayaç sayfasındayken o sayacın kategorisini de aktif göster.
  const aktifKategori = sayaclar.find((s) => s.yol === yol)?.kategori;
  const aktifMi = (m) => yol === m.yol || (m.kategori && m.kategori === aktifKategori);
  const kapat = () => setAcik(false);

  return (
    <header className="bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" onClick={kapat} className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center transition-colors group-hover:border-emerald-500/50">
              <Timer className="w-5 h-5 text-emerald-500" />
            </span>
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight">Sayaçhane</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Ana menü">
            {menu.map((m) => (
              <Link
                key={m.yol}
                href={m.yol}
                aria-current={yol === m.yol ? "page" : undefined}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  aktifMi(m) ? "text-white bg-zinc-900" : "text-zinc-400 hover:text-white"
                }`}
              >
                {m.ad}
              </Link>
            ))}
            <Link
              href="/tum-sayaclar"
              className="ml-3 px-5 py-2.5 rounded-full text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-colors"
            >
              Tüm Sayaçlar
            </Link>
          </nav>

          <button
            className="lg:hidden text-zinc-300 hover:text-white p-2 -mr-2"
            onClick={() => setAcik(!acik)}
            aria-expanded={acik}
            aria-controls="mobil-menu"
            aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
          >
            {acik ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobil menü: tüm sayaçlar kategorilere göre */}
      {acik && (
        <nav
          id="mobil-menu"
          aria-label="Mobil menü"
          className="lg:hidden border-t border-zinc-900 bg-zinc-950 max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 pt-4 pb-8 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {Object.entries(kategoriler).map(([anahtar, k]) => (
            <div key={anahtar} className="mb-5">
              <Link href={k.yol} onClick={kapat} className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 mb-2 px-2">
                {k.ad}
              </Link>
              <div className="grid grid-cols-2 gap-2">
                {sayaclar
                  .filter((s) => s.kategori === anahtar)
                  .map((s) => (
                    <Link
                      key={s.yol}
                      href={s.yol}
                      onClick={kapat}
                      aria-current={yol === s.yol ? "page" : undefined}
                      className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border text-sm font-medium transition-colors ${
                        yol === s.yol ? "bg-zinc-800 border-zinc-700 text-white" : "bg-zinc-900/60 border-zinc-800/80 text-zinc-300"
                      }`}
                    >
                      <s.Ikon size={16} className={temalar[s.tema].ikon} />
                      {s.ad}
                    </Link>
                  ))}
              </div>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link href="/ozel" onClick={kapat} className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm font-semibold">
              <CalendarHeart size={16} /> Özel Sayaç
            </Link>
            <Link href="/tum-sayaclar" onClick={kapat} className="flex items-center justify-center px-3 py-3 rounded-xl bg-emerald-500 text-zinc-950 text-sm font-semibold">
              Tüm Sayaçlar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
