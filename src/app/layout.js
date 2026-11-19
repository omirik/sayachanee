import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME, sayfalar } from "@/lib/site";
import "./globals.css";

// latin-ext: ğ, ş, ı, İ gibi Türkçe harfler için gerekli
const inter = Inter({ subsets: ["latin", "latin-ext"] });

// Tüm sayfalar için ortak ayarlar. Sayfaya özel başlık/açıklama/canonical
// her sayfada sayfaMeta() ile verilir (bkz. src/lib/site.js).
// Not: canonical burada bilerek YOK; olsaydı tüm sayfalar ana sayfayı gösterirdi.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: sayfalar['/'].title,
    template: `%s | ${SITE_NAME}`,
  },
  description: sayfalar['/'].description,
  applicationName: SITE_NAME,
  verification: {
    google: 'dpu_d5D__hzM9AEYB5FhuICaQuEfE9ujUymrdXHLGIQ',
  },
  other: {
    "google-adsense-account": "ca-pub-9995958735732535"
  }
};

// Google'a sitenin adını ve sahibini tanıtan yapılandırılmış veri.
// Arama sonuçlarında URL yerine "Sayaçhane" adının görünmesine yardımcı olur.
const siteSemasi = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "tr-TR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9995958735732535"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} bg-zinc-950 text-white antialiased flex flex-col min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSemasi) }}
        />
        <Header />
        
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