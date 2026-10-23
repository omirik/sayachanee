import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';

export const metadata = {
  title: 'Hakkımızda | Sayaçhane',
  description: 'Sayaçhane projesinin kuruluş amacı ve vizyonu.',
};

export default function Hakkimizda() {
  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 pt-12 relative pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-zinc-950 -z-10 fixed"></div>
      
      <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 bg-zinc-900/50 px-5 py-2.5 rounded-full border border-zinc-800 shadow-lg hover:bg-zinc-800">
          <ArrowLeft size={16} /> <span className="text-sm font-medium">Geri Dön</span>
        </Link>

        <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-2xl">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-6 border border-emerald-500/20">
            <Info size={40} className="text-emerald-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Hakkımızda</h1>
          
          <div className="space-y-6 text-zinc-400 leading-relaxed text-sm md:text-base">
            <p>
              <strong className="text-zinc-200">Sayaçhane</strong>, karmaşıklaşan dijital dünyada zamanı en şık, en hızlı ve en doğru şekilde takip edebilmeniz için geliştirilmiş yeni nesil bir web uygulamasıdır.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Hikayemiz</h2>
            <p>
              İnternette yer alan mevcut geri sayım araçlarının göz yoran tasarımları, her yerden fırlayan rahatsız edici reklamları ve cihazı yoran ağır altyapıları bizi bu projeyi geliştirmeye itti. Sınavlara hazırlanan bir öğrenci, iftar vaktini bekleyen bir inanan veya özel gününü sabırsızlıkla bekleyen biri için zamanın akışını izlemek bir stres kaynağı değil, motivasyon aracı olmalıdır.
            </p>
            <p>
              Bu vizyonla yola çıkarak, tamamen kullanıcı odaklı, karanlık mod (dark mode) estetiğine sahip ve saniyenin onda biri hassasiyetinde çalışan Sayaçhane'yi kodladık.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Neler Sunuyoruz?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Eğitim Sayaçları:</strong> YKS ve KPSS gibi hayatın dönüm noktası olan sınavlara kalan süreyi şık bir arayüzle sunuyoruz.</li>
              <li><strong>Ramazan Sayacı:</strong> Diyanet İşleri Başkanlığı verileriyle %100 uyumlu, anlık iftar ve sahur vakti takibi sağlıyoruz.</li>
              <li><strong>Özel Sayaç:</strong> Sizin için anlamlı olan herhangi bir tarihi sisteme girerek kendi kişisel geri sayımlarınızı oluşturmanıza imkan tanıyoruz.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Misyonumuz</h2>
            <p>
              Amacımız, Sayaçhane'yi Türkiye'nin en çok tercih edilen, en estetik ve en güvenilir "zaman yönetimi ve takip" platformu haline getirmektir. Bizi tercih ettiğiniz için teşekkür ederiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}