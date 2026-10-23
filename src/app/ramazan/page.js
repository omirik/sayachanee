'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Loader2, ChevronDown, Search, Moon, Sun, Calendar, Plus, Minus } from 'lucide-react';

const sehirlerListesi = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

// RAMAZAN İÇİN SIKÇA SORULAN SORULAR
const sssVerileri = [
  { soru: '2027 Ramazan ayı ne zaman başlıyor?', cevap: 'Diyanet İşleri Başkanlığı takvimine göre 2027 yılında mübarek Ramazan ayı 8 Şubat 2027 Pazartesi günü başlayacaktır.' },
  { soru: 'Ramazana kaç gün kaldı?', cevap: 'Sayfamızdaki "Ramazan\'a Doğru" sekmesine tıklayarak Ramazan ayının başlangıcına kaç gün, saat, dakika ve saniye kaldığını görebilirsiniz.' },
  { soru: 'İftar ve sahur vakitleri neye göre hesaplanıyor?', cevap: 'Vakitler, bulunduğunuz şehre göre Diyanet İşleri Başkanlığı\'nın güncel hesaplama yöntemleri kullanılarak anlık olarak api.aladhan servisinden çekilmektedir.' },
  { soru: 'Sayacın doğruluğu kesin mi?', cevap: 'Evet, sistem saniyenin onda biri hassasiyetle cihazınızın saatini referans alarak çalışır. Vakitler çekildikten sonra sayfa yenilenene kadar internetiniz kopsa dahi sayaç geriye saymaya devam eder.' }
];

export default function RamazanSayaci() {
  const [sehir, setSehir] = useState('İstanbul');
  const [aktifSekme, setAktifSekme] = useState('İftar'); 
  const [vakitler, setVakitler] = useState({ iftar: null, sahur: null });
  const [kalan, setKalan] = useState({ gun: '00', saat: '--', dakika: '--', saniye: '--' });
  const [yukleniyor, setYukleniyor] = useState(true);
  const [acikSoru, setAcikSoru] = useState(null);
  
  const [dropdownAcik, setDropdownAcik] = useState(false);
  const [aramaMetni, setAramaMetni] = useState('');
  const dropdownRef = useRef(null);

  const ramazanBaslangici = new Date(2027, 1, 8, 0, 0, 0);

  useEffect(() => {
    const kayitliSehir = localStorage.getItem('sayachane_sehir');
    if (kayitliSehir) setSehir(kayitliSehir);
  }, []);

  useEffect(() => {
    localStorage.setItem('sayachane_sehir', sehir);
  }, [sehir]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownAcik(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const vakitleriGetir = async () => {
      setYukleniyor(true);
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${sehir}&country=Turkey&method=13`);
        const veri = await res.json();
        const saatler = veri.data.timings;

        const simdi = new Date();
        
        const iftarTarihi = new Date();
        const [iSaat, iDak] = saatler.Maghrib.split(':');
        iftarTarihi.setHours(iSaat, iDak, 0, 0);
        if (simdi > iftarTarihi) iftarTarihi.setDate(iftarTarihi.getDate() + 1);

        const sahurTarihi = new Date();
        const [sSaat, sDak] = saatler.Imsak.split(':');
        sahurTarihi.setHours(sSaat, sDak, 0, 0);
        if (simdi > sahurTarihi) sahurTarihi.setDate(sahurTarihi.getDate() + 1);

        setVakitler({ iftar: iftarTarihi, sahur: sahurTarihi });

        if (aktifSekme !== 'Ramazan') {
          if (simdi < iftarTarihi && simdi > sahurTarihi) setAktifSekme('İftar');
          else setAktifSekme('Sahur');
        }
      } catch (error) {
        console.error("Vakitler çekilirken hata:", error);
      }
      setYukleniyor(false);
    };

    vakitleriGetir();
  }, [sehir]);

  useEffect(() => {
    let hedefZaman;
    if (aktifSekme === 'İftar') hedefZaman = vakitler.iftar;
    else if (aktifSekme === 'Sahur') hedefZaman = vakitler.sahur;
    else hedefZaman = ramazanBaslangici;

    if (!hedefZaman) return;

    const sayac = setInterval(() => {
      const simdi = new Date().getTime();
      const fark = hedefZaman.getTime() - simdi;

      if (fark > 0) {
        setKalan({
          gun: String(Math.floor(fark / (1000 * 60 * 60 * 24))).padStart(2, '0'),
          saat: String(Math.floor((fark / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
          dakika: String(Math.floor((fark / (1000 * 60)) % 60)).padStart(2, '0'),
          saniye: String(Math.floor((fark / 1000) % 60)).padStart(2, '0')
        });
      } else {
        setKalan({ gun: '00', saat: '00', dakika: '00', saniye: '00' });
        clearInterval(sayac);
      }
    }, 1000);

    return () => clearInterval(sayac);
  }, [aktifSekme, vakitler]);

  const filtrelenmisSehirler = sehirlerListesi.filter(s => s.toLowerCase().includes(aramaMetni.toLowerCase()));
  const gosterilecekBirimler = aktifSekme === 'Ramazan' ? ['Gun', 'Saat', 'Dakika', 'Saniye'] : ['Saat', 'Dakika', 'Saniye'];

  const sssGecis = (index) => {
    setAcikSoru(acikSoru === index ? null : index);
  };

  // Tema Renklerini Dinamik Ayarlama
  const temaRenkleri = {
    metin: aktifSekme === 'İftar' ? 'text-amber-400' : aktifSekme === 'Sahur' ? 'text-blue-400' : 'text-emerald-400',
    arkaPlan: aktifSekme === 'İftar' ? 'bg-amber-500/20' : aktifSekme === 'Sahur' ? 'bg-blue-500/20' : 'bg-emerald-500/20',
    cerceve: aktifSekme === 'İftar' ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.08)]' : aktifSekme === 'Sahur' ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.08)]' : 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 relative overflow-hidden pb-32">
      <div className={`absolute inset-0 bg-gradient-to-br bg-[length:400%_400%] animate-gradient -z-10 transition-all duration-1000 fixed ${
        aktifSekme === 'İftar' ? 'from-orange-600/15 via-zinc-950 to-amber-950/20' : 
        aktifSekme === 'Sahur' ? 'from-blue-900/15 via-zinc-950 to-indigo-950/20' :
        'from-emerald-900/15 via-zinc-950 to-teal-950/20'
      }`}></div>

      <div className="w-full max-w-5xl flex flex-col items-center pt-8">
        
        {/* ÜST MENÜ VE ARAMA */}
        <div className="w-full flex justify-between items-center mb-8 relative z-20">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all bg-zinc-900/60 hover:bg-zinc-800 py-2 px-4 rounded-full border border-zinc-800 shadow-lg">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Geri</span>
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownAcik(!dropdownAcik)}
              className="flex items-center gap-3 px-5 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 rounded-full backdrop-blur-md shadow-xl transition-all text-zinc-200"
            >
              <MapPin size={16} className={temaRenkleri.metin} />
              <span className="text-sm font-medium">{sehir}</span>
              <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-300 ${dropdownAcik ? 'rotate-180' : ''}`} />
            </button>

            {dropdownAcik && (
              <div className="absolute right-0 mt-3 w-64 bg-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-3 border-b border-zinc-800 flex items-center gap-2 bg-zinc-950/50">
                  <Search size={16} className="text-zinc-500 ml-1" />
                  <input type="text" placeholder="Şehir ara..." value={aramaMetni} onChange={(e) => setAramaMetni(e.target.value)} className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full" autoFocus />
                </div>
                <div className="max-h-60 overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
                  {filtrelenmisSehirler.map((s, idx) => (
                    <button key={idx} onClick={() => { setSehir(s); setDropdownAcik(false); setAramaMetni(''); }} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${sehir === s ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEKMELER */}
        <div className="flex items-center gap-1 md:gap-2 p-1.5 bg-zinc-900/80 border border-zinc-700/60 rounded-full backdrop-blur-md shadow-xl transition-all mb-8 relative z-10 flex-wrap justify-center">
          <button onClick={() => setAktifSekme('İftar')} className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${aktifSekme === 'İftar' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'}`}>
            <Sun size={16} className={aktifSekme === 'İftar' ? 'text-zinc-950' : 'text-amber-500/70'} /> İftar
          </button>
          <button onClick={() => setAktifSekme('Sahur')} className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${aktifSekme === 'Sahur' ? 'bg-blue-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}>
            <Moon size={16} className={aktifSekme === 'Sahur' ? 'text-white' : 'text-blue-500/70'} /> Sahur
          </button>
          <button onClick={() => setAktifSekme('Ramazan')} className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${aktifSekme === 'Ramazan' ? 'bg-emerald-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}>
            <Calendar size={16} className={aktifSekme === 'Ramazan' ? 'text-white' : 'text-emerald-500/70'} /> Ramazan'a Doğru
          </button>
        </div>

        {/* SAYAÇ BAŞLIĞI */}
        <div className="text-center mb-10 h-24 flex flex-col justify-end">
          {yukleniyor && aktifSekme !== 'Ramazan' ? (
            <div className="flex items-center justify-center gap-3 text-zinc-400">
              <Loader2 className="animate-spin text-amber-400" size={24} />
              <span className="text-sm tracking-wide">Vakitler güncelleniyor...</span>
            </div>
          ) : (
            <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                {aktifSekme === 'Ramazan' ? "Ramazan'a Kalan Süre" : `${aktifSekme}a Kalan Süre`}
              </h1>
              <p className="text-zinc-400 font-light">
                {aktifSekme === 'Ramazan' ? (
                  <>Mübarek Ramazan ayı <span className="text-white font-medium">8 Şubat 2027</span> tarihinde başlıyor.</>
                ) : (
                  <><span className="text-white font-medium">{sehir}</span> için {aktifSekme === 'İftar' ? 'akşam ezanı' : 'imsak vakti'} bekleniyor.</>
                )}
              </p>
            </div>
          )}
        </div>

        {/* SAYAÇ KARTLARI */}
        <div className={`grid gap-4 md:gap-6 w-full mb-20 ${aktifSekme === 'Ramazan' ? 'grid-cols-2 md:grid-cols-4 max-w-4xl' : 'grid-cols-3 max-w-2xl'}`}>
          {gosterilecekBirimler.map((birim, i) => {
            const isSaniye = birim === 'Saniye';
            const deger = birim.toLowerCase();
            return (
              <div key={i} className={`flex flex-col items-center p-6 md:p-8 bg-zinc-900/60 border rounded-3xl backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02] duration-300 ${
                isSaniye && aktifSekme === 'İftar' ? 'border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.15)]' : 
                isSaniye && aktifSekme === 'Sahur' ? 'border-blue-500/40 shadow-[0_0_35px_rgba(59,130,246,0.15)]' : 
                isSaniye && aktifSekme === 'Ramazan' ? 'border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.15)]' : 
                'border-zinc-800/80'
              }`}>
                <span className={`text-5xl md:text-7xl font-bold tabular-nums tracking-tight ${
                  isSaniye && aktifSekme === 'İftar' ? 'text-amber-400' :
                  isSaniye && aktifSekme === 'Sahur' ? 'text-blue-400' :
                  isSaniye && aktifSekme === 'Ramazan' ? 'text-emerald-400' :
                  'text-white'
                }`}>
                  {kalan[deger]}
                </span>
                <span className="text-zinc-500 text-xs md:text-sm mt-3 uppercase tracking-widest font-semibold">{birim === 'Gun' ? 'Gün' : birim}</span>
              </div>
            )
          })}
        </div>

        {/* RAMAZAN SSS BÖLÜMÜ */}
        <div className="w-full max-w-3xl flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center tracking-tight">Sıkça Sorulan Sorular</h2>
          <div className="flex flex-col gap-4">
            {sssVerileri.map((item, index) => {
              const acikMi = acikSoru === index;
              return (
                <div key={index} className={`border rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm ${acikMi ? `bg-zinc-900/80 ${temaRenkleri.cerceve}` : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'}`}>
                  <button onClick={() => sssGecis(index)} className="w-full flex items-center justify-between p-5 text-left focus:outline-none">
                    <span className={`font-semibold transition-colors ${acikMi ? temaRenkleri.metin : 'text-zinc-200'}`}>{item.soru}</span>
                    <div className={`p-1.5 rounded-full transition-colors ${acikMi ? `${temaRenkleri.arkaPlan} ${temaRenkleri.metin}` : 'bg-zinc-800 text-zinc-400'}`}>
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