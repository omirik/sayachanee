"use client";
import { useState, useEffect } from "react";

export default function DGS() {
  // DGS 2027 Tahmini Tarihi (Genellikle Temmuz ortası)
  const targetDate = new Date("July 11, 2027 10:15:00").getTime();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center pt-20 pb-10">
      {/* BAŞLIK BÖLÜMÜ */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 mb-4">
          DGS 2027 Sayaç
        </h1>
        <p className="text-zinc-400 text-lg">Dikey Geçiş Sınavına Kalan Süre</p>
      </div>

      {/* SAYAÇ BÖLÜMÜ */}
      {timeLeft === null ? (
        <div className="text-zinc-500 animate-pulse mb-20">Hesaplanıyor...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl w-full px-4 mb-20">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center">
            <span className="text-5xl md:text-7xl font-bold text-white mb-2">{timeLeft.days}</span>
            <span className="text-zinc-500 font-medium uppercase tracking-wider text-sm">Gün</span>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center">
            <span className="text-5xl md:text-7xl font-bold text-white mb-2">{timeLeft.hours}</span>
            <span className="text-zinc-500 font-medium uppercase tracking-wider text-sm">Saat</span>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center">
            <span className="text-5xl md:text-7xl font-bold text-white mb-2">{timeLeft.minutes}</span>
            <span className="text-zinc-500 font-medium uppercase tracking-wider text-sm">Dakika</span>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center">
            <span className="text-5xl md:text-7xl font-bold text-purple-400 mb-2">{timeLeft.seconds}</span>
            <span className="text-zinc-500 font-medium uppercase tracking-wider text-sm">Saniye</span>
          </div>
        </div>
      )}

      {/* SSS BÖLÜMÜ (SEO İÇİN) */}
      <div className="max-w-3xl mx-auto w-full px-4 text-left">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-3">
          DGS Hakkında Sıkça Sorulan Sorular
        </h2>
        
        <div className="space-y-4">
          <div className="bg-zinc-900/50 p-5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
            <h3 className="text-lg font-semibold text-purple-400">DGS 2027 ne zaman yapılacak?</h3>
            <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
              ÖSYM takvimi henüz açıklanmamış olmakla birlikte, Dikey Geçiş Sınavı (DGS) her yıl genellikle Temmuz ayının ortasında düzenlenmektedir. Tahmini tarihimiz Temmuz 2027 ortasıdır.
            </p>
          </div>

          <div className="bg-zinc-900/50 p-5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
            <h3 className="text-lg font-semibold text-purple-400">DGS 2027'ye ne kadar kaldı?</h3>
            <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
              Yukarıdaki sayacımız sayesinde DGS'ye kalan süreyi gün, saat, dakika ve saniye olarak anlık takip edebilirsiniz. ÖSYM resmi tarihi duyurduğunda sayacımız otomatik olarak senkronize edilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}