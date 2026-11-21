'use client'
import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { depoyuDinle, depodanOku, depoyaYaz } from '@/lib/depo';

const SEHIR_DEPO = 'sayachane_sehir';
import Link from 'next/link';
import { ArrowLeft, MapPin, Loader2, ChevronDown, Search, Moon, Sun, Calendar, Plus, Minus } from 'lucide-react';
import { ramazan } from '@/data/sayaclar';
import { tarihMetni } from '@/lib/zaman';
import PaylasimDugmeleri from '@/components/PaylasimDugmeleri';
import { iller } from '@/data/iller';

const ramazanBaslangici = new Date(ramazan.baslangicTarihi);

// "2026-11-21" + "17:49" -> Türkiye saatiyle Date
const trVakit = (tarih, saat) => new Date(`${tarih}T${saat}:00+03:00`);

const sehirlerListesi = iller.map((il) => il.ad);
const slugBul = (ad) => iller.find((il) => il.ad === ad)?.slug;

// RAMAZAN İÇİN SIKÇA SORULAN SORULAR
const sssVerileri = [
  { soru: `${ramazan.yil} Ramazan ayı ne zaman başlıyor?`, cevap: `Diyanet İşleri Başkanlığı takvimine göre ${ramazan.yil} yılında Ramazan ayı ${tarihMetni(ramazan.baslangicTarihi)} günü başlıyor. İlk sahur, bir önceki geceye denk gelir. Son oruç ${tarihMetni(ramazan.bitisTarihi)} günü tutulacak.` },
  { soru: `${ramazan.yil} Kadir Gecesi ne zaman?`, cevap: `Diyanet takvimine göre Kadir Gecesi, ${tarihMetni(ramazan.kadirGecesi)} günü akşamı idrak edilecek.` },
  { soru: 'Ramazana kaç gün kaldı?', cevap: 'Sayfamızdaki "Ramazan\'a Doğru" sekmesine tıklayarak Ramazan ayının başlangıcına kaç gün, saat, dakika ve saniye kaldığını görebilirsiniz.' },
  { soru: 'İftar ve sahur vakitleri nereden geliyor?', cevap: 'Vakitler, Diyanet İşleri Başkanlığı\'nın seçtiğiniz il merkezi için yayımladığı resmi namaz vakitleridir. Sahur imsak vaktinde biter, iftar akşam ezanıyla başlar. Her il için ayrıntılı imsakiye sayfası aşağıdaki şehir listesinde.' },
  { soru: 'Sayaç ne kadar doğru?', cevap: 'Sayaç cihazınızın saatini kullanır ve Türkiye saatine göre hesaplar. Cihazınızın saati doğruysa sonuç saniyesi saniyesine doğrudur. Vakitler bir kez yüklendikten sonra internet bağlantınız kopsa bile sayaç çalışmaya devam eder.' }
];

export default function RamazanSayaci() {
  // Seçilen şehir tarayıcı hafızasında saklanır; yoksa İstanbul.
  const kayitliSehir = useSyncExternalStore(depoyuDinle, () => depodanOku(SEHIR_DEPO), () => null);
  const sehir = sehirlerListesi.includes(kayitliSehir) ? kayitliSehir : 'İstanbul';
  const setSehir = (yeni) => depoyaYaz(SEHIR_DEPO, yeni);
  const [aktifSekme, setAktifSekme] = useState('İftar'); 
  const [vakitler, setVakitler] = useState({ iftar: null, sahur: null });
  const [kalan, setKalan] = useState({ gun: '00', saat: '--', dakika: '--', saniye: '--' });
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(false);
  const [yenile, setYenile] = useState(0); // vakit gelince yeni vakitleri çekmek için
  const [acikSoru, setAcikSoru] = useState(null);
  
  const [dropdownAcik, setDropdownAcik] = useState(false);
  const [aramaMetni, setAramaMetni] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownAcik(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Şehir hızlıca değiştirilirse eski şehrin geç gelen cevabı yenisinin üzerine yazmasın.
    let gecersiz = false;
    const vakitleriGetir = async () => {
      setYukleniyor(true);
      setHata(false);
      try {
        // Diyanet'in resmi vakitleri (sunucumuz üzerinden): bugün ve sonraki 2 gün
        const res = await fetch(`/api/vakitler/${slugBul(sehir)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const veri = await res.json();
        if (gecersiz) return;
        const gunler = veri.gunler;
        if (!gunler?.length) throw new Error('Vakit yok');

        const simdi = new Date();
        const imsakBugun = trVakit(gunler[0].tarih, gunler[0].imsak);
        const iftarBugun = trVakit(gunler[0].tarih, gunler[0].aksam);

        // Sıradaki imsak (sahur sonu) ve iftar; vakit gelince sayfa yenilerini tekrar çeker.
        const sonraki = (alan) => gunler.map((g) => trVakit(g.tarih, g[alan])).find((t) => t > simdi) ?? null;
        const sahurTarihi = sonraki('imsak');
        const iftarTarihi = sonraki('aksam');

        setVakitler({ iftar: iftarTarihi, sahur: sahurTarihi });

        // Gündüz (imsak ile iftar arası) iftarı, gece sahuru göster.
        setAktifSekme((onceki) => {
          if (onceki === 'Ramazan') return onceki;
          return simdi >= imsakBugun && simdi < iftarBugun ? 'İftar' : 'Sahur';
        });
      } catch (error) {
        if (gecersiz) return;
        console.error("Vakitler çekilirken hata:", error);
        setHata(true);
      }
      setYukleniyor(false);
    };

    vakitleriGetir();
    return () => {
      gecersiz = true;
    };
  }, [sehir, yenile]);

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
        // İftar/sahur vakti geldi: bir sonraki vakti çek.
        if (aktifSekme !== 'Ramazan') setTimeout(() => setYenile((n) => n + 1), 5000);
      }
    }, 1000);

    return () => clearInterval(sayac);
  }, [aktifSekme, vakitler]);

  // Paylaşım metni: tıklama anındaki sekme, şehir ve kalan süreye göre.
  function paylasimMetni() {
    const sayi = (s) => Number.parseInt(s, 10);
    if (aktifSekme === 'Ramazan') {
      const gun = sayi(kalan.gun);
      return Number.isNaN(gun) ? 'Ramazan sayacı' : `⏳ Ramazana ${gun} gün kaldı!`;
    }
    const saat = sayi(kalan.saat);
    const dakika = sayi(kalan.dakika);
    if (Number.isNaN(saat) || Number.isNaN(dakika)) return `${sehir} iftar ve sahur sayacı`;
    const sure = saat > 0 ? `${saat} saat ${dakika} dakika` : `${dakika} dakika`;
    return `🌙 ${sehir} için ${aktifSekme === 'İftar' ? 'iftara' : 'sahura'} ${sure} kaldı!`;
  }

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
            <Calendar size={16} className={aktifSekme === 'Ramazan' ? 'text-white' : 'text-emerald-500/70'} /> Ramazan’a Doğru
          </button>
        </div>

        {/* SAYAÇ BAŞLIĞI */}
        <div className="text-center mb-10 h-24 flex flex-col justify-end">
          {yukleniyor && aktifSekme !== 'Ramazan' ? (
            <div className="flex items-center justify-center gap-3 text-zinc-400">
              <Loader2 className="animate-spin text-amber-400" size={24} />
              <span className="text-sm tracking-wide">Vakitler güncelleniyor...</span>
            </div>
          ) : hata && aktifSekme !== 'Ramazan' ? (
            <div className="flex flex-col items-center gap-3 text-zinc-300">
              <span>{sehir} için vakitler şu an alınamadı.</span>
              <button onClick={() => setYenile((n) => n + 1)} className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm font-medium">Tekrar dene</button>
            </div>
          ) : (
            <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                {aktifSekme === 'Ramazan' ? "Ramazan'a Kalan Süre" : `${aktifSekme}a Kalan Süre`}
              </h1>
              <p className="text-zinc-400 font-light">
                {aktifSekme === 'Ramazan' ? (
                  <>Ramazan ayı <span className="text-white font-medium">{tarihMetni(ramazan.baslangicTarihi)}</span> günü başlıyor.</>
                ) : (
                  <><span className="text-white font-medium">{sehir}</span> için {aktifSekme === 'İftar' ? 'akşam ezanı' : 'imsak vakti'} bekleniyor.</>
                )}
              </p>
            </div>
          )}
        </div>

        {/* SAYAÇ KARTLARI */}
        <div className={`grid gap-4 md:gap-6 w-full mb-8 ${aktifSekme === 'Ramazan' ? 'grid-cols-2 md:grid-cols-4 max-w-4xl' : 'grid-cols-3 max-w-2xl'}`}>
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

        {/* PAYLAŞ: metin o anki sekmeye ve şehre göre */}
        <div className="mb-16">
          <PaylasimDugmeleri yol="/ramazan" baslik="Ramazan, İftar ve Sahur Sayacı" metin={paylasimMetni} />
        </div>

        {/* ŞEHİR SAYFALARI: her il için iftar/sahur vakti ve imsakiye */}
        <section className="w-full max-w-4xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center tracking-tight">Şehrine Göre İftar ve Sahur Vakitleri</h2>
          <p className="text-zinc-400 text-center mb-6">
            <Link href={`/ramazan/${slugBul(sehir)}`} className="text-amber-400 hover:text-amber-300 font-semibold">
              {sehir} imsakiyesi ve bugünün vakitleri →
            </Link>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {iller.map((il) => (
              <Link
                key={il.slug}
                href={`/ramazan/${il.slug}`}
                className="px-3 py-1.5 rounded-full text-sm bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
              >
                {il.ad}
              </Link>
            ))}
          </div>
        </section>

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