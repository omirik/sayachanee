import './globals.css';
import Footer from '@/components/Footer';

// GOOGLE SEO İÇİN SİTENİN KİMLİĞİ
export const metadata = {
  title: 'Sayaçhane | Premium Geri Sayım Aracı',
  description: 'YKS, KPSS, Ramazan ve özel günleriniz için karanlık mod odaklı, reklamsız ve kesintisiz geri sayım platformu.',
  keywords: ['sayaç', 'yks sayacı', 'kpss sayacı', 'ramazan sayacı', 'geri sayım', 'özel sayaç'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      {/* 
        antialiased: Yazıları daha pürüzsüz yapar (Apple stili)
        min-h-screen flex flex-col: Footer'ın her zaman en altta kalmasını sağlar 
      */}
      <body className="bg-zinc-950 text-white min-h-screen flex flex-col antialiased selection:bg-emerald-500/30 selection:text-white">
        
        {/* Sayfaların (page.js) yüklendiği dinamik alan */}
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
        
        {/* Tüm sayfaların en altında görünecek Global Footer */}
        <Footer />
        
      </body>
    </html>
  );
}