import Link from "next/link";
import { BookOpen, Briefcase, PenTool, GraduationCap } from "lucide-react";

export default function SinavlarKategori() {
  const sinavListesi = [
    { isim: "YKS Sayacı", aciklama: "Üniversite sınavına kalan zamanı takip et.", link: "/yks", ikon: BookOpen, iconColor: "text-emerald-400", hoverBorder: "hover:border-emerald-500/50", hoverText: "group-hover:text-emerald-400" },
    { isim: "KPSS Sayacı", aciklama: "Memurluk hedefi için geri sayımı başlat.", link: "/kpss", ikon: Briefcase, iconColor: "text-blue-400", hoverBorder: "hover:border-blue-500/50", hoverText: "group-hover:text-blue-400" },
    { isim: "LGS Sayacı", aciklama: "Liselere Geçiş Sistemi sınavına hazırlık.", link: "/lgs", ikon: PenTool, iconColor: "text-cyan-400", hoverBorder: "hover:border-cyan-500/50", hoverText: "group-hover:text-cyan-400" },
    { isim: "DGS Sayacı", aciklama: "Dikey Geçiş Sınavı için gün say.", link: "/dgs", ikon: GraduationCap, iconColor: "text-purple-400", hoverBorder: "hover:border-purple-500/50", hoverText: "group-hover:text-purple-400" },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-950 flex flex-col items-center pt-20 pb-16 px-4">
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Sınav <span className="text-emerald-500">Sayaçları</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Geleceğini belirleyecek kritik sınavlar için zamanı en iyi şekilde yönet. Hangi sınava hazırlanıyorsun?
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {sinavListesi.map((sinav, index) => {
          const Icon = sinav.ikon;
          return (
            <Link key={index} href={sinav.link} className={`bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 flex items-start gap-5 group transition-all duration-300 ${sinav.hoverBorder} hover:bg-zinc-900/80`}>
              <div className={`w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${sinav.iconColor}`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className={`text-xl font-bold text-white mb-2 transition-colors ${sinav.hoverText}`}>
                  {sinav.isim}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {sinav.aciklama}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}