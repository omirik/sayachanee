import Link from "next/link";
import { Flag, Star, Sun, Award } from "lucide-react";

export default function ResmiBayramlarKategori() {
  const bayramListesi = [
    { isim: "29 Ekim Sayacı", aciklama: "Cumhuriyet Bayramı coşkusuna ne kadar kaldı?", link: "/29-ekim", ikon: Flag, iconColor: "text-red-500", hoverBorder: "hover:border-red-500/50", hoverText: "group-hover:text-red-400" },
    { isim: "23 Nisan Sayacı", aciklama: "Ulusal Egemenlik ve Çocuk Bayramı geri sayımı.", link: "/23-nisan", ikon: Star, iconColor: "text-red-500", hoverBorder: "hover:border-red-500/50", hoverText: "group-hover:text-red-400" },
    { isim: "19 Mayıs Sayacı", aciklama: "Atatürk'ü Anma, Gençlik ve Spor Bayramı.", link: "/19-mayis", ikon: Sun, iconColor: "text-red-500", hoverBorder: "hover:border-red-500/50", hoverText: "group-hover:text-red-400" },
    { isim: "30 Ağustos Sayacı", aciklama: "Zafer Bayramı kutlamaları için geri sayım.", link: "/30-agustos", ikon: Award, iconColor: "text-red-500", hoverBorder: "hover:border-red-500/50", hoverText: "group-hover:text-red-400" },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-950 flex flex-col items-center pt-20 pb-16 px-4">
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Resmi <span className="text-red-500">Bayramlar</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Milli gururumuz olan özel günlerimize ve coşkulu kutlamalara ne kadar zaman kaldığını anlık takip et.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {bayramListesi.map((bayram, index) => {
          const Icon = bayram.ikon;
          return (
            <Link key={index} href={bayram.link} className={`bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 flex items-start gap-5 group transition-all duration-300 ${bayram.hoverBorder} hover:bg-zinc-900/80`}>
              <div className={`w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${bayram.iconColor}`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className={`text-xl font-bold text-white mb-2 transition-colors ${bayram.hoverText}`}>
                  {bayram.isim}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {bayram.aciklama}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}