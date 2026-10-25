import Link from "next/link";
import { Moon, Heart, Star } from "lucide-react";

export default function DiniGunlerKategori() {
  const gunListesi = [
    { isim: "Ramazan Sayacı", aciklama: "On bir ayın sultanına ve bereketine hazırlık yapın.", link: "/ramazan", ikon: Moon, iconColor: "text-amber-500", hoverBorder: "hover:border-amber-500/50", hoverText: "group-hover:text-amber-400" },
    { isim: "Ramazan Bayramı", aciklama: "Sevdiklerinizle buluşacağınız bayrama kaç gün kaldı?", link: "/ramazan-bayrami", ikon: Heart, iconColor: "text-amber-500", hoverBorder: "hover:border-amber-500/50", hoverText: "group-hover:text-amber-400" },
    { isim: "Kurban Bayramı", aciklama: "Paylaşma, kardeşlik ve bereket günlerine geri sayım.", link: "/kurban-bayrami", ikon: Star, iconColor: "text-amber-500", hoverBorder: "hover:border-amber-500/50", hoverText: "group-hover:text-amber-400" },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-950 flex flex-col items-center pt-20 pb-16 px-4">
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Dini <span className="text-amber-500">Günler</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Maneviyatın ve bereketin yoğun yaşandığı mübarek aylara ve bayramlarımıza kalan süreyi takip et.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {gunListesi.map((gun, index) => {
          const Icon = gun.ikon;
          return (
            <Link key={index} href={gun.link} className={`bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 flex items-start gap-5 group transition-all duration-300 ${gun.hoverBorder} hover:bg-zinc-900/80`}>
              <div className={`w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${gun.iconColor}`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className={`text-xl font-bold text-white mb-2 transition-colors ${gun.hoverText}`}>
                  {gun.isim}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {gun.aciklama}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}