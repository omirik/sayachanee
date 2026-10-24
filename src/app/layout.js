import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Sayaçhane | YKS, KPSS ve Ramazan Geri Sayım',
  description: 'Türkiye\'nin en şık geri sayım platformu. 2026 YKS, KPSS, Ramazan ayı ve kendi özel günleriniz için saniyesi saniyesine zamanı takip edin.',
  keywords: ['sayaç', 'yks sayacı', 'yks 2026 ne zaman', 'kpss geri sayım', 'ramazan sayacı', 'iftar vakti', 'özel sayaç', 'sayaçhane'],
  openGraph: {
    title: 'Sayaçhane | Zamanı Lehine Çevir',
    description: 'YKS, KPSS ve Ramazan için en iyi geri sayım aracı.',
    url: 'https://sayachane.com.tr',
    siteName: 'Sayaçhane',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      {/* Siyah arka plan ve beyaz yazı rengi buraya eklendi */}
      <body className={`${inter.className} bg-zinc-950 text-white antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}