'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, PenTool, Calendar, Activity, Plus, Minus } from 'lucide-react';

const sssVerileri = [
  { soru: 'LGS 2027 ne zaman yapılacak?', cevap: 'Milli Eğitim Bakanlığı (MEB) tarafından kesin takvim henüz açıklanmamış olsa da, LGS her yıl genellikle Haziran ayının ilk pazar günü düzenlenmektedir. Tahmini tarihimiz 6 Haziran 2027\'dir.' },
  { soru: 'LGS\'ye kaç gün kaldı?', cevap: 'Yukarıdaki canlı geri sayım aracımız sayesinde LGS oturumuna kaç gün, saat, dakika ve saniye kaldığını kesintisiz olarak takip edebilirsiniz.' },
  { soru: 'Bu tarihler kesin mi?', cevap: 'Hayır, şu an sistemimizde bulunan tarihler geçmiş yılların MEB takvimlerine dayanılarak hesaplanmış güçlü tahminlerdir. Resmi takvim açıklandığında sayacımız milisaniyesinde otomatik olarak güncellenecektir.' }
];

export default function LgsSayaci() {
  const [kalan, setKalan] = useState({ gun: '00', saat: '00', dakika: '00', saniye: '00' });
  const [ilerleme, setIlerleme] = useState(0);
  const [acikSoru, setAcikSoru] = useState(null);

  const sinavTarihi = new Date(2027, 5, 6, 9, 30, 0); // 6 Haziran 2027
  const baslangicTarihi = new Date(2026, 8, 1).getTime(); // 1 Eylül 2026

  useEffect(() => {
    const hedef = sinavTarihi.getTime();

    const sayac = setInterval(() => {
      const simdi = new Date().getTime();
      const fark = hedef - simdi;

      if (fark > 0) {
        setKalan({
          gun: String(Math.floor(fark / (1000 * 60 * 60 * 24))).padStart(2, '0'),
          saat: String(Math.floor((fark / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
          dakika: String(Math.floor((fark / (1000 * 60)) % 60)).padStart(2, '0'),
          saniye: String(Math.floor((fark / 1000) % 60)).padStart(2, '0')
        });

        const toplamSure = hedef - baslangicTarihi;
        const gecenSure = simdi - baslangicTarihi;
        let yuzde = (gecenSure / toplamSure) * 100;
        if (yuzde > 100) yuzde = 100;
        if (yuzde < 0) yuzde = 0;
        setIlerleme(yuzde);

      } else {
        setKalan({ gun: '00', saat: '00', dakika: '00', saniye: '00' });
        setIlerleme(100);
        clearInterval(sayac);
      }
    }, 1000);

    return () => clearInterval(sayac);
  }, []);

  const tarihiBicimlendir = (tarih) => {
    return tarih.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const sssGecis = (index) => {
    setAcikSoru(acikSoru === index ? null : index);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 relative overflow-hidden pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/15 via-zinc-950 to-blue-950/20 bg-[length:400%_400%] animate-gradient -z-10 transition-colors duration-1000 fixed"></div>

      <div className="w-full max-w-4xl flex flex-col items-center pt-8">
        
        <div className="w-full flex justify-between items-center mb-12 relative z-20">
          <Link href="/sinavlar" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all bg-zinc-900/60 hover:bg-zinc-800 py-2 px-4 rounded-full border border-zinc-800 shadow-lg">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Geri</span>
          </Link>

          <div className="flex items-center gap-3 px-5 py-2.5 bg-zinc-900/90 border border-zinc-700/60 rounded-full backdrop-blur-md shadow-xl text-zinc-200 cursor-default">
            <PenTool size={16} className="text-cyan-400" />
            <span className="text-sm font-medium tracking-wide">Tek Oturum</span>
          </div>
        </div>

        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl mb-6 shadow-lg border bg-cyan-900/30 border-cyan-500/30 text-cyan-400">
            <PenTool size={28} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">LGS 2027</h1>
          <div className="flex items-center justify-center gap-2 text-zinc-400 font-medium">
            <Calendar size={16} />
            <span>{tarihiBicimlendir(sinavTarihi)} (Tahmini)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl animate-in zoom-in-95 duration-300 mb-12">
          {['Gun', 'Saat', 'Dakika', 'Saniye'].map((birim, i) => {
            const deger = birim.toLowerCase();
            const isSaniye = deger === 'saniye';
            return (
              <div key={i} className={`flex flex-col items-center p-6 md:p-8 bg-zinc-900/60 border rounded-3xl backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02] duration-300 ${isSaniye ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.15)]' : 'border-zinc-800/80'}`}>
                <span className={`text-4xl md:text-6xl font-bold tabular-nums tracking-tight ${isSaniye ? 'text-cyan-400' : 'text-white'}`}>
                  {kalan[deger]}
                </span>
                <span className="text-zinc-500 text-xs md:text-sm mt-3 uppercase tracking-widest font-semibold">{birim === 'Gun' ? 'Gün' : birim}</span>
              </div>
            )
          })}
        </div>

        <div className="w-full max-w-4xl flex flex-col animate-in fade-in zoom-in-95 duration-700 delay-300 mb-20">
          <div className="flex justify-between items-end mb-3 px-1">
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5"><Activity size={14} className="text-cyan-500" /> Süreç İlerlemesi</span>
            <span className="text-cyan-400 font-mono text-sm font-bold tracking-wider">%{(ilerleme).toFixed(4)}</span>
          </div>
          <div className="w-full h-3 bg-zinc-900/80 rounded-full border border-zinc-800/80 overflow-hidden relative shadow-inner">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-700 via-cyan-500 to-blue-400 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${ilerleme}%` }}>
              <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30 blur-[2px]"></div>
            </div>
          </div>
          <div className="flex justify-between mt-3 px-1 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-semibold">
            <span>Sezon Başı (Eylül)</span>
            <span>Sınav Günü</span>
          </div>
        </div>

        {/* SIKÇA SORULAN SORULAR */}
        <div className="w-full max-w-3xl flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center tracking-tight">Sıkça Sorulan Sorular</h2>
          <div className="flex flex-col gap-4">
            {sssVerileri.map((item, index) => {
              const acikMi = acikSoru === index;
              return (
                <div key={index} className={`border rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm ${acikMi ? 'bg-zinc-900/80 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.08)]' : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'}`}>
                  <button onClick={() => sssGecis(index)} className="w-full flex items-center justify-between p-5 text-left focus:outline-none">
                    <span className={`font-semibold transition-colors ${acikMi ? 'text-cyan-400' : 'text-zinc-200'}`}>{item.soru}</span>
                    <div className={`p-1.5 rounded-full transition-colors ${acikMi ? 'bg-cyan-500/20 text-cyan-400' : 'bg-zinc-800 text-zinc-400'}`}>
                      {acikMi ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${acikMi ? 'max-h-48 opacity-100 mb-5' : 'max-h-0 opacity-0'}`}>
                    <p className="px-5 text-zinc-400 text-sm md:text-base leading-relaxed">
                      {item.cevap}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}