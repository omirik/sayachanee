'use client'
import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Moon, Briefcase, CalendarHeart, Zap, ShieldCheck, ChevronRight, ChevronLeft, Timer, ChevronDown } from 'lucide-react';

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);

  // SAYAÇLARA ÖZEL DİNAMİK KAHRAMAN (HERO) İÇERİKLERİ EKLENDİ
  const sayaclar = [
    { 
      baslik: 'Ramazan Sayacı', kisa: 'Ramazan', aciklama: 'Diyanet verileriyle iftar ve sahur vakitleri.', link: '/ramazan', ikon: Moon, 
      renkText: 'text-amber-400', renkBg: 'bg-amber-400', renkGlow: 'bg-amber-500/30', cardHover: 'hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]',
      heroTitle1: 'On Bir Ayın', heroHighlight: 'Sultanına', heroTitle2: 'Hazırlan.',
      heroHighlightColor: 'from-amber-400 to-orange-500',
      heroSubtext: 'İftar ve sahur vakitlerini saniyesi saniyesine takip et, bereketli zamana odaklan.',
      heroBgGlow: 'from-amber-900/15', heroBlurCircle: 'bg-amber-500/10'
    },
    { 
      baslik: 'YKS Sayacı', kisa: 'YKS', aciklama: 'Üniversite sınavı için kalan zamanı takip et.', link: '/yks', ikon: BookOpen, 
      renkText: 'text-emerald-400', renkBg: 'bg-emerald-400', renkGlow: 'bg-emerald-500/30', cardHover: 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]',
      heroTitle1: 'Hayallerindeki', heroHighlight: 'Üniversiteye', heroTitle2: 'Odaklan.',
      heroHighlightColor: 'from-emerald-400 to-teal-500',
      heroSubtext: 'YKS maratonunda zamanı yönetmek başarının anahtarıdır. Kalan süreni anlık takip et.',
      heroBgGlow: 'from-emerald-900/15', heroBlurCircle: 'bg-emerald-500/10'
    },
    { 
      baslik: 'KPSS Sayacı', kisa: 'KPSS', aciklama: 'Memurluk hedefi için geri sayımı başlat.', link: '/kpss', ikon: Briefcase, 
      renkText: 'text-blue-400', renkBg: 'bg-blue-400', renkGlow: 'bg-blue-500/30', cardHover: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]',
      heroTitle1: 'Memurluk Hedefine', heroHighlight: 'Adım', heroTitle2: 'At.',
      heroHighlightColor: 'from-blue-400 to-indigo-500',
      heroSubtext: 'Geleceğini garanti altına almak için KPSS sürecinde her saniyeni değerli kıl.',
      heroBgGlow: 'from-blue-900/15', heroBlurCircle: 'bg-blue-500/10'
    },
    { 
      baslik: 'Özel Sayaç', kisa: 'Özel Gün', aciklama: 'Kendi özel gününü ve saatini belirle.', link: '/ozel', ikon: CalendarHeart, 
      renkText: 'text-rose-400', renkBg: 'bg-rose-400', renkGlow: 'bg-rose-500/30', cardHover: 'hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]',
      heroTitle1: 'Senin İçin', heroHighlight: 'Özel Olanı', heroTitle2: 'Kaçırma.',
      heroHighlightColor: 'from-rose-400 to-pink-500',
      heroSubtext: 'Doğum günü, askerlik, tatil veya yıldönümü... Önemli anlarınıza ne kadar kaldığını görün.',
      heroBgGlow: 'from-rose-900/15', heroBlurCircle: 'bg-rose-500/10'
    },
  ];

  const sonraki = () => setHeroIndex((prev) => (prev + 1) % sayaclar.length);
  const onceki = () => setHeroIndex((prev) => (prev - 1 + sayaclar.length) % sayaclar.length);
  const AktifIkon = sayaclar[heroIndex].ikon;
  const aktifSayac = sayaclar[heroIndex];

  return (
    <div className="w-full flex flex-col pb-16">
      
      <header className="w-full max-w-6xl mx-auto px-4 py-6 flex items-center justify-between relative z-50 animate-in fade-in slide-in-from-top-4 duration-500">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:border-emerald-500/50 group-hover:bg-zinc-800 transition-all shadow-lg">
            <Timer size={22} className="text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">Sayaçhane</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400 relative">
          
          <div className="relative group py-2">
            <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              Sayaçlar 
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-0 w-full h-4"></div>
            <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-48 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex flex-col p-2 z-50">
              <Link href="/yks" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800/80 hover:text-emerald-400 transition-colors text-zinc-300 group/link">
                <BookOpen size={16} className="text-zinc-500 group-hover/link:text-emerald-400 transition-colors" /> YKS Sayacı
              </Link>
              <Link href="/kpss" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800/80 hover:text-blue-400 transition-colors text-zinc-300 group/link">
                <Briefcase size={16} className="text-zinc-500 group-hover/link:text-blue-400 transition-colors" /> KPSS Sayacı
              </Link>
              <Link href="/ramazan" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800/80 hover:text-amber-400 transition-colors text-zinc-300 group/link">
                <Moon size={16} className="text-zinc-500 group-hover/link:text-amber-400 transition-colors" /> Ramazan Sayacı
              </Link>
              <Link href="/ozel" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800/80 hover:text-rose-400 transition-colors text-zinc-300 group/link">
                <CalendarHeart size={16} className="text-zinc-500 group-hover/link:text-rose-400 transition-colors" /> Özel Sayaç
              </Link>
            </div>
          </div>

          <Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link>
          <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik</Link>
          <Link href="/kullanim-kosullari" className="hover:text-white transition-colors">Koşullar</Link>
          <Link href="/iletisim" className="px-5 py-2 bg-zinc-900 border border-zinc-700/50 rounded-full hover:bg-zinc-800 hover:text-white transition-all shadow-lg">İletişim</Link>
        </nav>

        <Link href="/iletisim" className="md:hidden text-sm font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 px-5 py-2 rounded-full shadow-lg">
          İletişim
        </Link>
      </header>

      <section className="relative w-full px-4 py-12 md:py-20 flex flex-col items-center justify-center overflow-hidden">
        {/* DİNAMİK ARKA PLAN EFEKTLERİ */}
        <div className={`absolute inset-0 bg-gradient-to-b ${aktifSayac.heroBgGlow} via-zinc-950 to-zinc-950 -z-10 transition-colors duration-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${aktifSayac.heroBlurCircle} rounded-full blur-[120px] -z-10 pointer-events-none transition-colors duration-1000`}></div>
        
        {/* DİNAMİK METİNLER (key={heroIndex} sayesinde değiştiğinde yumuşak animasyonla gelir) */}
        <div key={heroIndex} className="animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tighter text-center max-w-4xl">
            {aktifSayac.heroTitle1} <span className={`text-transparent bg-clip-text bg-gradient-to-r ${aktifSayac.heroHighlightColor}`}>{aktifSayac.heroHighlight}</span> {aktifSayac.heroTitle2}
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto text-center mb-12 leading-relaxed h-20 md:h-14">
            {aktifSayac.heroSubtext}
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-7">
          <div className="relative group">
            <div className={`absolute -inset-2 rounded-full blur-xl transition-all duration-1000 opacity-40 group-hover:opacity-80 ${aktifSayac.renkGlow}`}></div>

            <div className="relative flex items-center bg-zinc-950/80 border border-zinc-800/80 rounded-full p-2 shadow-2xl backdrop-blur-xl">
              <button onClick={onceki} className="p-3 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none">
                <ChevronLeft size={22} />
              </button>

              <Link href={aktifSayac.link} className="flex items-center justify-center gap-3 px-8 py-3.5 mx-2 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 w-56 md:w-64 bg-zinc-900 border border-zinc-800/50 hover:bg-zinc-800 text-white shadow-inner">
                <AktifIkon size={20} className={`transition-colors duration-500 ${aktifSayac.renkText}`} />
                <span className="tracking-wide text-base">{aktifSayac.kisa}'a Başla</span>
              </Link>

              <button onClick={sonraki} className="p-3 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {sayaclar.map((sayac, index) => (
              <div 
                key={index} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === heroIndex ? `w-8 ${sayac.renkBg}` : 'w-2 bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sayaclar.map((sayac, index) => {
            const Icon = sayac.ikon;
            return (
              <Link key={index} href={sayac.link} className={`group flex items-start p-8 bg-zinc-900/50 border border-zinc-800/80 rounded-[2rem] transition-all duration-300 ${sayac.cardHover} backdrop-blur-sm`}>
                <div className={`p-4 rounded-2xl bg-zinc-950 border border-zinc-800 group-hover:scale-110 transition-transform duration-300 shadow-xl ${sayac.renkText}`}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-white transition-colors mb-2">{sayac.baslik}</h3>
                  <p className="text-zinc-500 leading-relaxed">{sayac.aciklama}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-4 pt-16 pb-8 border-t border-zinc-800/50 mt-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Neden Sayaçhane?</h2>
          <p className="text-zinc-400">Pürüzsüz bir deneyim için en son teknolojilerle geliştirildi.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="p-4 bg-zinc-900 rounded-full mb-6 text-yellow-400"><Zap size={28} /></div>
            <h4 className="text-xl font-semibold text-white mb-3">Anlık Senkronizasyon</h4>
            <p className="text-zinc-500 text-sm">Saniyenin onda biri kadar bile sapma olmadan zamanı anlık olarak hesaplar ve ekrana yansıtır.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="p-4 bg-zinc-900 rounded-full mb-6 text-emerald-400"><ShieldCheck size={28} /></div>
            <h4 className="text-xl font-semibold text-white mb-3">Diyanet ile Tam Uyum</h4>
            <p className="text-zinc-500 text-sm">Ramazan vakitleri doğrudan Diyanet İşleri Başkanlığı'nın güncel API metodolojisi ile çekilir.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="p-4 bg-zinc-900 rounded-full mb-6 text-purple-400"><Moon size={28} /></div>
            <h4 className="text-xl font-semibold text-white mb-3">Göz Yormayan Tasarım</h4>
            <p className="text-zinc-500 text-sm">Karanlık mod (Dark Mode) odaklı, OLED ekran dostu ve şık arayüzü ile saati takip etmek bir keyif.</p>
          </div>
        </div>
      </section>
      
    </div>
  );
}