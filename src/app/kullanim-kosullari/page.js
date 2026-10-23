import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata = {
  title: 'Kullanım Koşulları | Sayaçhane',
  description: 'Sayaçhane platformunun kullanım koşulları ve sorumluluk reddi beyanı.',
};

export default function KullanimKosullari() {
  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 pt-12 relative pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-zinc-950 -z-10 fixed"></div>
      
      <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 bg-zinc-900/50 px-5 py-2.5 rounded-full border border-zinc-800 shadow-lg hover:bg-zinc-800">
          <ArrowLeft size={16} /> <span className="text-sm font-medium">Geri Dön</span>
        </Link>

        <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-2xl">
          <div className="inline-flex p-4 rounded-full bg-blue-500/10 mb-6 border border-blue-500/20">
            <FileText size={40} className="text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Kullanım Koşulları</h1>
          
          <div className="space-y-6 text-zinc-400 leading-relaxed text-sm md:text-base">
            <p><strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
            <p>Sayaçhane (sayachane.com.tr) web sitesini ziyaret ederek ve kullanarak, aşağıda belirtilen şartları ve koşulları kabul etmiş sayılırsınız.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">1. Sorumluluk Reddi (Önemli)</h2>
            <p>
              Sitemizde yer alan <strong>YKS, KPSS</strong> gibi sınav tarihleri, ÖSYM'nin resmi açıklaması yapılana kadar geçmiş yıllardaki istatistiklere dayalı <strong>tahmini tarihlerdir.</strong> Resmi tarihler açıklandığında sistemimiz güncellenmektedir. 
            </p>
            <p>
              Sitede yer alan geri sayım verilerindeki olası gecikme, hata veya uyuşmazlıklardan doğabilecek doğrudan veya dolaylı hiçbir maddi/manevi zarardan Sayaçhane ve geliştiricileri sorumlu tutulamaz. Resmi ve kesin tarihler için kullanıcıların daima <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ÖSYM</a> ve <a href="https://www.diyanet.gov.tr" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Diyanet İşleri Başkanlığı</a> web sitelerini takip etmesi önerilir.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-3">2. Hizmetin Sağlanması ve Kesintiler</h2>
            <p>
              Sayaçhane, hizmetin 7/24 kesintisiz, hatasız veya virüssüz olacağını garanti etmez. Planlı bakımlar, güncellemeler veya sunucu (Vercel vb.) kaynaklı elde olmayan sebeplerle siteye erişim geçici olarak durabilir.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-3">3. Kullanıcı Tarafından Oluşturulan Veriler</h2>
            <p>
              "Özel Sayaç" bölümünde oluşturduğunuz etkinlik adları ve tarihleri tamamen sizin cihazınızın tarayıcı hafızasında (Local Storage) tutulur. Bu verilerin kaybından, silinmesinden veya üçüncü şahısların cihazınıza erişmesi durumunda oluşabilecek gizlilik ihlallerinden Sayaçhane sorumlu değildir.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-3">4. Fikri Mülkiyet</h2>
            <p>
              Sitemizin tasarımı, logosu, kod mimarisi (Next.js & Tailwind altyapısı) ve arayüz dizaynı Sayaçhane projesine aittir. Kopyalanması veya kaynak gösterilmeden başka ticari projelerde kullanılması yasaktır.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-3">5. Değişiklik Hakları</h2>
            <p>
              Sayaçhane, bu kullanım koşullarını önceden haber vermeksizin istediği zaman değiştirme hakkını saklı tutar. Değişiklikler sitede yayımlandığı an yürürlüğe girer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}