import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google';
import Footer from "@/components/Footer";
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
  verification: {
    google: 'dpu_d5D__hzM9AEYB5FhuICaQuEfE9ujUymrdXHLGIQ',
  },
  // AdSense botunun kesinlikle okuyacağı Meta etiketi
  other: {
    "google-adsense-account": "ca-pub-9995958735732535"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {/* Standart HTML AdSense Kodu */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9995958735732535"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} bg-zinc-950 text-white antialiased flex flex-col min-h-screen`}>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-R5YF0EEDFN" />
    </html>
  );
}