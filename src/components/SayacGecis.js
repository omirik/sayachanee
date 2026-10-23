'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Moon, BookOpen, Briefcase, CalendarHeart } from 'lucide-react';

export default function SayacGecis() {
  const pathname = usePathname(); // Kullanıcının o an hangi sayfada olduğunu buluyoruz

  // Sayaçlarımızın sırası ve bilgileri
  const sayaclar = [
    { kisa: 'Ramazan', link: '/ramazan', ikon: Moon, renk: 'text-amber-400' },
    { kisa: 'YKS', link: '/yks', ikon: BookOpen, renk: 'text-emerald-400' },
    { kisa: 'KPSS', link: '/kpss', ikon: Briefcase, renk: 'text-blue-400' },
    { kisa: 'Özel', link: '/ozel', ikon: CalendarHeart, renk: 'text-rose-400' },
  ];

  // O anki sayfanın bu listede kaçıncı sırada olduğunu bul
  const currentIndex = sayaclar.findIndex(s => s.link === pathname);
  
  // Eğer kullanıcı ana sayfada veya iletişim sayfasındaysa bu butonu GİZLE
  if (currentIndex === -1) return null;

  // Matematiksel olarak bir önceki ve bir sonraki sayacı hesapla (Sonsuz döngü)
  const onceki = sayaclar[(currentIndex - 1 + sayaclar.length) % sayaclar.length];
  const sonraki = sayaclar[(currentIndex + 1) % sayaclar.length];
  const suanki = sayaclar[currentIndex];
  const SuankiIkon = suanki.ikon;

  return (
    <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-zinc-900/90 p-2 rounded-full border border-zinc-700/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-8">
      
      {/* Sol Ok (Önceki Sayaç) */}
      <Link href={onceki.link} className="flex items-center gap-1 p-3 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
      </Link>

      {/* Ortadaki Mevcut Sayaç Bilgisi */}
      <div className="flex items-center justify-center gap-2 px-4 md:px-8 py-2 border-x border-zinc-700/50 min-w-[140px]">
         <SuankiIkon size={18} className={suanki.renk} />
         <span className="font-bold text-white tracking-wide">{suanki.kisa}</span>
      </div>

      {/* Sağ Ok (Sonraki Sayaç) */}
      <Link href={sonraki.link} className="flex items-center gap-1 p-3 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all group">
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </Link>

    </div>
  );
}