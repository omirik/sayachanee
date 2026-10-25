import Link from "next/link";
import { BookOpen, Briefcase, PenTool, GraduationCap, Flag, Star, Sun, Award, Moon, Heart, CalendarHeart } from "lucide-react";

export default function TumSayaclar() {
  const kategoriler = [
    {
      baslik: "Sınav Sayaçları",
      renk: "text-emerald-500",
      sayaclar: [
        { isim: "YKS Sayacı", link: "/yks", ikon: BookOpen, iconColor: "text-emerald-400", hoverBorder: "hover:border-emerald-500/50" },
        { isim: "KPSS Sayacı", link: "/kpss", ikon: Briefcase, iconColor: "text-blue-400", hoverBorder: "hover:border-blue-500/50" },
        { isim: "LGS Sayacı", link: "/lgs", ikon: PenTool, iconColor: "text-cyan-400", hoverBorder: "hover:border-cyan-500/50" },
        { isim: "DGS Sayacı", link: "/dgs", ikon: GraduationCap, iconColor: "text-purple-400", hoverBorder: "hover:border-purple-500/50" },
      ]
    },
    {
      baslik: "Resmi Bayramlar",
      renk: "text-red-500",
      sayaclar: [
        { isim: "29 Ekim Cumhuriyet B.", link: "/29-ekim", ikon: Flag, iconColor: "text-red-500", hoverBorder: "hover:border-red-500/50" },
        { isim: "23 Nisan Ulusal E.", link: "/23-nisan", ikon: Star, iconColor: "text-red-500", hoverBorder: "hover:border-red-500/50" },
        { isim: "19 Mayıs Gençlik", link: "/19-mayis", ikon: Sun, iconColor: "text-red-500", hoverBorder: "hover:border-red-500/50" },
        { isim: "30 Ağustos Zafer B.", link: "/30-agustos", ikon: Award, iconColor: "text-red-500", hoverBorder: "hover:border-red-500/50" },
      ]
    },
    {
      baslik: "Dini Günler ve Bayramlar",
      renk: "text-amber-500",
      sayaclar: [
        { isim: "Ramazan Sayacı", link: "/ramazan", ikon: Moon, iconColor: "text-amber-500", hoverBorder: "hover:border-amber-500/50" },
        { isim: "Ramazan Bayramı", link: "/ramazan-bayrami", ikon: Heart, iconColor: "text-amber-500", hoverBorder: "hover:border-amber-500/50" },
        { isim: "Kurban Bayramı", link: "/kurban-bayrami", ikon: Star, iconColor: "text-amber-500", hoverBorder: "hover:border-amber-500/50" },
      ]
    },
    {
      baslik: "Kişisel Araçlar",
      renk: "text-rose-500",
      sayaclar: [
        { isim: "Özel Sayaç Kur", link: "/ozel", ikon: CalendarHeart, iconColor: "text-rose-500", hoverBorder: "hover:border-rose-500/50" },
      ]
    }
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-950 flex flex-col items-center pt-20 pb-20 px-4">
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Tüm <span className="text-zinc-400">Sayaçlar</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Sayaçhane'de bulunan tüm aktif geri sayım araçlarını aşağıdan keşfedebilirsin.
        </p>
      </div>

      <div className="w-full max-w-6xl space-y-16">
        {kategoriler.map((kategori, catIndex) => (
          <div key={catIndex} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-3">
              <h2 className={`text-2xl font-bold ${kategori.renk}`}>{kategori.baslik}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kategori.sayaclar.map((sayac, index) => {
                const Icon = sayac.ikon;
                return (
                  <Link key={index} href={sayac.link} className={`bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex flex-col items-center text-center gap-4 group transition-all duration-300 ${sayac.hoverBorder} hover:bg-zinc-900/80`}>
                    <div className={`w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform ${sayac.iconColor}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {sayac.isim}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}