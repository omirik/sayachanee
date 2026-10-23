'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Calendar, ChevronDown, Info, Activity, Plus, Minus } from 'lucide-react';

const kpssSeviyeleri = ['Lisans', 'Ön Lisans', 'Ortaöğretim'];

// KPSS İÇİN SIKÇA SORULAN SORULAR
const sssVerileri = [
  { soru: '2027 KPSS ne zaman yapılacak?', cevap: 'ÖSYM takvimine göre 2027 yılında yalnızca Lisans düzeyindeki KPSS oturumu yapılacaktır. Sınavın tahmini olarak Eylül ayının başında (5 Eylül 2027) yapılması beklenmektedir.' },
  { soru: 'Ön Lisans ve Ortaöğretim KPSS neden yok?', cevap: 'ÖSYM mevzuatı gereği B grubu (Ön Lisans ve Ortaöğretim) kadroları için KPSS yalnızca çift yıllarda (2024, 2026, 2028 vb.) düzenlenmektedir. Bu sebeple 2027 yılında bu oturumlar gerçekleşmeyecektir.' },
  { soru: 'KPSS Lisans sınavına kaç gün kaldı?', cevap: 'Sayacımız üzerinden 2027 KPSS Lisans sınavına kalan zamanı saniyesi saniyesine, anlık ve kesintisiz olarak takip edebilirsiniz.' },
  { soru: 'Sayacın tarihleri kesin mi?', cevap: 'Mevcut tarihler, ÖSYM\'nin geçmiş yıllardaki sınav periyotlarına dayanılarak hesaplanmış güçlü tahminlerdir. Resmi 2027 takvimi yayımlandığı anda sayacımız otomatik olarak güncellenecektir.' }
];

export default function KpssSayaci() {
  const [sinavDuzeyi, setSinavDuzeyi] = useState('Lisans');
  const [kalan, setKalan] = useState({ gun: '--', saat: '--', dakika: '--', saniye: '--' });
  const [ilerleme, setIlerleme] = useState(0);
  const [acikSoru, setAcikSoru] = useState(null);
  
  const [dropdownAcik, setDropdownAcik] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const kayitliSinav = localStorage.getItem('sayachane_kpss_seviye');
    if (kayitliSinav) setSinavDuzeyi(kayitliSinav);
  }, []);

  useEffect(() => {
    localStorage.setItem('sayachane_kpss_seviye', sinavDuzeyi);
  }, [sinavDuzeyi]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownAcik(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sinavTarihleri = {
    'Lisans': new Date(2027, 8, 5, 10, 15, 0),
    'Ön Lisans': null, 
    'Ortaöğretim': null 
  };

  const baslangicTarihi = new Date(2026, 8, 1).getTime();

  useEffect(() => {
    const hedefZaman = sinavTarihleri[sinavDuzeyi];
    if (!hedefZaman) return; 

    const hedef = hedefZaman.getTime();

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
  }, [sinavDuzeyi]); 

  const tarihiBicimlendir = (tarih) => {
    return tarih ? tarih.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  };

  const sssGecis = (index) => {
    setAcikSoru(acikSoru === index ? null : index);
  };

  const sinavVarMi = sinavTarihleri[sinavDuzeyi] !== null;

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 relative overflow-hidden pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-zinc-950 to-indigo-950/20 bg-[length:400%_400%] animate-gradient -z-10 transition-colors duration-1000 fixed"></div>

      <div className="w-full max-w-4xl flex flex-col items-center pt-8">
        
        <div className="w-full flex justify-between items-center mb-12 relative z-20">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all bg-zinc-900/60 hover:bg-zinc-800 py-2 px-4 rounded-full border border-zinc-800 shadow-lg">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Geri</span>
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownAcik(!dropdownAcik)}
              className="flex items-center gap-3 px-5 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 rounded-full backdrop-blur-md shadow-xl transition-all text-zinc-200"
            >
              <Briefcase size={16} className="text-blue-400" />
              <span className="text-sm font-medium">{sinavDuzeyi}</span>
              <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-300 ${dropdownAcik ? 'rotate-180' : ''}`} />
            </button>

            {dropdownAcik && (
              <div className="absolute right-0 mt-3 w-48 bg-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col p-1.5">
                  {kpssSeviyeleri.map((s, idx) => (
                    <button key={idx} onClick={() => { setSinavDuzeyi(s); setDropdownAcik(false); }} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${sinavDuzeyi === s ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl mb-6 shadow-lg border bg-blue-900/30 border-blue-500/30 text-blue-400">
            <Briefcase size={28} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">KPSS {sinavDuzeyi}</h1>
          <div className="flex items-center justify-center gap-2 text-zinc-400 font-medium">
            <Calendar size={16} />
            <span>{sinavVarMi ? `${tarihiBicimlendir(sinavTarihleri[sinavDuzeyi])} (Tahmini)` : '2027 Takvimi'}</span>
          </div>
        </div>

        {sinavVarMi ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl animate-in zoom-in-95 duration-300 mb-12">
              {['Gun', 'Saat', 'Dakika', 'Saniye'].map((birim, i) => {
                const deger = birim.toLowerCase();
                const isSaniye = deger === 'saniye';
                return (
                  <div key={i} className={`flex flex-col items-center p-6 md:p-8 bg-zinc-900/60 border rounded-3xl backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02] duration-300 ${isSaniye ? 'border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'border-zinc-800/80'}`}>
                    <span className={`text-4xl md:text-6xl font-bold tabular-nums tracking-tight ${isSaniye ? 'text-blue-400' : 'text-white'}`}>
                      {kalan[deger]}
                    </span>
                    <span className="text-zinc-500 text-xs md:text-sm mt-3 uppercase tracking-widest font-semibold">{birim === 'Gun' ? 'Gün' : birim}</span>
                  </div>
                )
              })}
            </div>

            <div className="w-full max-w-4xl flex flex-col animate-in fade-in zoom-in-95 duration-700 delay-300 mb-20">
              <div className="flex justify-between items-end mb-3 px-1">
                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5"><Activity size={14} className="text-blue-500" /> Hazırlık Süreci</span>
                <span className="text-blue-400 font-mono text-sm font-bold tracking-wider">%{(ilerleme).toFixed(4)}</span>
              </div>
              <div className="w-full h-3 bg-zinc-900/80 rounded-full border border-zinc-800/80 overflow-hidden relative shadow-inner">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${ilerleme}%` }}>
                  <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30 blur-[2px]"></div>
                </div>
              </div>
              <div className="flex justify-between mt-3 px-1 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                <span>Sezon Başı (Eylül)</span>
                <span>Sınav Günü</span>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-blue-900/10 border border-blue-500/30 p-8 md:p-12 rounded-3xl text-center max-w-2xl mx-auto backdrop-blur-md animate-in slide-in-from-bottom-4 duration-500 shadow-2xl mb-20">
            <div className="inline-flex p-4 rounded-full bg-blue-500/10 mb-6">
              <Info className="text-blue-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">2027 Yılında Sınav Yapılmayacaktır</h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              KPSS {sinavDuzeyi} oturumu, ÖSYM kuralları gereği yalnızca <strong className="text-white">çift yıllarda</strong> (2024, 2026, 2028...) düzenlenmektedir. Bu nedenle 2027 takviminde bu sınav bulunmamaktadır.
            </p>
          </div>
        )}

        {/* KPSS SSS BÖLÜMÜ */}
        <div className="w-full max-w-3xl flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center tracking-tight">Sıkça Sorulan Sorular</h2>
          <div className="flex flex-col gap-4">
            {sssVerileri.map((item, index) => {
              const acikMi = acikSoru === index;
              return (
                <div key={index} className={`border rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm ${acikMi ? 'bg-zinc-900/80 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.08)]' : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'}`}>
                  <button onClick={() => sssGecis(index)} className="w-full flex items-center justify-between p-5 text-left focus:outline-none">
                    <span className={`font-semibold transition-colors ${acikMi ? 'text-blue-400' : 'text-zinc-200'}`}>{item.soru}</span>
                    <div className={`p-1.5 rounded-full transition-colors ${acikMi ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-400'}`}>
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