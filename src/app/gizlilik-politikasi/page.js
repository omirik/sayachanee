import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Gizlilik Politikası | Sayaçhane',
  description: 'Sayaçhane gizlilik politikası ve çerez kullanımı bilgileri.',
};

export default function GizlilikPolitikasi() {
  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 pt-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-zinc-950 -z-10 fixed"></div>
      
      <div className="w-full max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800">
          <ArrowLeft size={16} /> Geri Dön
        </Link>

        <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 md:p-12 rounded-3xl backdrop-blur-sm">
          <ShieldCheck size={48} className="text-emerald-500 mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Gizlilik Politikası</h1>
          
          <div className="space-y-6 text-zinc-400 leading-relaxed">
            <p><strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Toplanan Bilgiler</h2>
            <p>Sayaçhane (sayachane.com.tr) olarak ziyaretçilerimizin gizliliğine önem veriyoruz. Sitemizi kullanırken girdiğiniz şehir tercihleri ve özel sayaç tarihleri gibi veriler tamamen cihazınızın yerel hafızasında (Local Storage) saklanır. Sunucularımıza hiçbir kişisel veriniz aktarılmaz veya kaydedilmez.</p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Çerezler (Cookies) ve Google AdSense</h2>
            <p>Sitemizde, kullanıcı deneyimini iyileştirmek ve kişiselleştirilmiş reklamlar sunmak amacıyla Google AdSense dahil üçüncü taraf reklam şirketleri kullanılabilir.</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Üçüncü taraf satıcılar (Google dâhil), kullanıcıların web sitemize veya diğer web sitelerine yaptıkları önceki ziyaretleri temel alan reklamlar yayınlamak için çerezleri kullanır.</li>
              <li>Google'ın reklam çerezlerini kullanması, Google ve iş ortaklarının kullanıcılara sitemizdeki ve/veya internetteki diğer sitelerdeki ziyaretlerine dayalı reklamlar sunmasına olanak tanır.</li>
              <li>Kullanıcılar, <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Reklam Ayarları</a> sayfasını ziyaret ederek kişiselleştirilmiş reklamcılığı devre dışı bırakabilirler.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Üçüncü Taraf Bağlantıları</h2>
            <p>Sitemiz, API hizmetleri (örneğin; Diyanet vakitleri için aladhan.com) kullanmaktadır. Bu hizmetlerin kendi gizlilik politikaları bulunmakta olup, Sayaçhane bu sitelerin içerikleri veya gizlilik uygulamalarından sorumlu değildir.</p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. İletişim</h2>
            <p>Gizlilik politikamız ile ilgili her türlü soru ve öneriniz için iletişim sayfamız üzerinden bizimle irtibata geçebilirsiniz.</p>
          </div>
        </div>
      </div>
    </div>
  );
}