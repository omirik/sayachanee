'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CalendarHeart, AlertCircle, Activity, Plus, Trash2, Edit, Calendar, List, ChevronRight, ChevronDown, Clock } from 'lucide-react';

const aylarListesi = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const yillarListesi = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + i);
const gunlerListesi = Array.from({ length: 31 }, (_, i) => i + 1);
const saatlerListesi = Array.from({ length: 24 }, (_, i) => i);
const dakikalarListesi = Array.from({ length: 60 }, (_, i) => i);

export default function OzelSayac() {
  const [sayaclar, setSayaclar] = useState([]);
  const [seciliSayacId, setSeciliSayacId] = useState(null);
  const [zamanlar, setZamanlar] = useState({});
  const [hafizaYuklendi, setHafizaYuklendi] = useState(false);
  
  const [formAcik, setFormAcik] = useState(false);
  const [duzenlenecekId, setDuzenlenecekId] = useState(null);
  const [isimGirdisi, setIsimGirdisi] = useState('');
  
  const [seciliGun, setSeciliGun] = useState(new Date().getDate());
  const [seciliAy, setSeciliAy] = useState(new Date().getMonth());
  const [seciliYil, setSeciliYil] = useState(new Date().getFullYear());
  const [seciliSaat, setSeciliSaat] = useState(new Date().getHours());
  const [seciliDakika, setSeciliDakika] = useState(new Date().getMinutes());
  
  const [acikDropdown, setAcikDropdown] = useState(null);
  const [hata, setHata] = useState('');

  useEffect(() => {
    const kayitli = localStorage.getItem('sayachane_ozel_sayaclar');
    if (kayitli) {
      setSayaclar(JSON.parse(kayitli));
    }
    setHafizaYuklendi(true); 
  }, []);

  useEffect(() => {
    if (hafizaYuklendi) {
      localStorage.setItem('sayachane_ozel_sayaclar', JSON.stringify(sayaclar));
    }
  }, [sayaclar, hafizaYuklendi]);

  // HATA ÇÖZÜLDÜ: Menünün açılıp anında kapanmasını engelleyen doğru tıklama mantığı
  useEffect(() => {
    const disariTiklama = (e) => {
      // Eğer tıklanan yer ozel-dropdown sınıfına sahip bir elementin içinde DEĞİLSE menüyü kapat
      if (!e.target.closest('.ozel-dropdown')) {
        setAcikDropdown(null);
      }
    };
    document.addEventListener('mousedown', disariTiklama);
    return () => document.removeEventListener('mousedown', disariTiklama);
  }, []);

  useEffect(() => {
    if (sayaclar.length === 0) return;

    const hesapla = () => {
      const simdi = new Date().getTime();
      const yeniZamanlar = {};

      sayaclar.forEach(sayac => {
        const fark = sayac.hedef - simdi;

        if (fark > 0) {
          const gun = String(Math.floor(fark / (1000 * 60 * 60 * 24))).padStart(2, '0');
          const saat = String(Math.floor((fark / (1000 * 60 * 60)) % 24)).padStart(2, '0');
          const dakika = String(Math.floor((fark / (1000 * 60)) % 60)).padStart(2, '0');
          const saniye = String(Math.floor((fark / 1000) % 60)).padStart(2, '0');

          const toplamSure = sayac.hedef - sayac.baslangic;
          const gecenSure = simdi - sayac.baslangic;
          let ilerleme = (gecenSure / toplamSure) * 100;
          if (ilerleme > 100) ilerleme = 100;
          if (ilerleme < 0) ilerleme = 0;

          yeniZamanlar[sayac.id] = { gun, saat, dakika, saniye, ilerleme, bitti: false };
        } else {
          yeniZamanlar[sayac.id] = { gun: '00', saat: '00', dakika: '00', saniye: '00', ilerleme: 100, bitti: true };
        }
      });
      setZamanlar(yeniZamanlar);
    };

    hesapla();
    const motor = setInterval(hesapla, 1000);
    return () => clearInterval(motor);
  }, [sayaclar]);

  const formAc = (sayac = null) => {
    setHata('');
    if (sayac) {
      const hDate = new Date(sayac.hedef);
      setIsimGirdisi(sayac.isim);
      setSeciliGun(hDate.getDate());
      setSeciliAy(hDate.getMonth());
      setSeciliYil(hDate.getFullYear());
      setSeciliSaat(hDate.getHours());
      setSeciliDakika(hDate.getMinutes());
      setDuzenlenecekId(sayac.id);
    } else {
      setIsimGirdisi('');
      setSeciliGun(new Date().getDate());
      setSeciliAy(new Date().getMonth());
      setSeciliYil(new Date().getFullYear());
      setSeciliSaat(new Date().getHours());
      setSeciliDakika(new Date().getMinutes());
      setDuzenlenecekId(null);
    }
    setFormAcik(true);
    setSeciliSayacId(null);
  };

  const kaydet = (e) => {
    e.preventDefault();
    setHata('');
    
    const hedefTarihNesnesi = new Date(seciliYil, seciliAy, seciliGun, seciliSaat, seciliDakika, 0);
    const hedefTimestamp = hedefTarihNesnesi.getTime();
    const suAn = new Date().getTime();

    if (hedefTimestamp <= suAn) {
      setHata('Lütfen şu andan daha ileri bir tarih ve saat seçin.');
      return;
    }

    if (duzenlenecekId) {
      setSayaclar(prev => prev.map(s => s.id === duzenlenecekId ? { ...s, isim: isimGirdisi, hedef: hedefTimestamp } : s));
    } else {
      const yeniSayac = { id: Date.now().toString(), isim: isimGirdisi, hedef: hedefTimestamp, baslangic: suAn };
      setSayaclar(prev => [...prev, yeniSayac]);
    }
    
    setFormAcik(false);
  };

  const sil = (id, e) => {
    e.stopPropagation();
    if(window.confirm('Bu sayacı silmek istediğinize emin misiniz?')) {
      setSayaclar(prev => prev.filter(s => s.id !== id));
      if (seciliSayacId === id) setSeciliSayacId(null);
    }
  };

  // KUSURSUZ DROPDOWN
  const renderDropdown = (id, aktifDeger, etiket, secenekler) => {
    const acikMi = acikDropdown === id;
    return (
      // "ozel-dropdown" sınıfı dışarı tıklamayı anlamamız için eklendi
      <div className={`ozel-dropdown relative w-full ${acikMi ? 'z-50' : 'z-10'}`}>
        <button 
          type="button" 
          onClick={() => setAcikDropdown(acikMi ? null : id)} 
          className={`w-full flex items-center justify-between bg-zinc-950/50 border ${acikMi ? 'border-rose-500/70 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'border-zinc-700/50'} rounded-xl px-3 py-3 text-white outline-none transition-all text-sm`}
        >
          <span className="font-medium truncate mr-1">{etiket}</span>
          <ChevronDown size={14} className={`text-zinc-500 shrink-0 transition-transform duration-300 ${acikMi ? 'rotate-180 text-rose-400' : ''}`} />
        </button>
        
        {acikMi && (
          <div className="absolute left-0 top-full mt-2 w-full max-h-48 overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl scrollbar-thin scrollbar-thumb-zinc-700 animate-in fade-in zoom-in-95 duration-200 py-1">
            {secenekler.map((secenek, i) => (
              <button 
                type="button" 
                key={i} 
                onClick={() => { 
                  secenek.onClick(); 
                  setAcikDropdown(null); 
                }} 
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${aktifDeger === secenek.value ? 'bg-rose-500/20 text-rose-400 font-bold' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'}`}
              >
                {secenek.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const aktifDetay = sayaclar.find(s => s.id === seciliSayacId);
  const aktifZaman = zamanlar[seciliSayacId] || { gun: '00', saat: '00', dakika: '00', saniye: '00', ilerleme: 0 };

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 relative overflow-hidden min-h-screen pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/15 via-zinc-950 to-pink-950/20 -z-10 fixed"></div>

      <div className="w-full max-w-5xl flex flex-col items-center pt-8">
        
        <div className="w-full flex justify-between items-center mb-12">
          {seciliSayacId || formAcik ? (
            <button onClick={() => { setSeciliSayacId(null); setFormAcik(false); }} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 py-2 px-4 rounded-full border border-zinc-800 shadow-lg">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Geri Dön</span>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 py-2 px-4 rounded-full border border-zinc-800 shadow-lg">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Ana Sayfa</span>
            </Link>
          )}
          
          {!formAcik && !seciliSayacId && (
            <button onClick={() => formAc()} className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 rounded-full transition-all text-white text-sm font-semibold shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:scale-105">
              <Plus size={18} />
              <span>Yeni Ekle</span>
            </button>
          )}
          
          {seciliSayacId && (
            <button onClick={() => setSeciliSayacId(null)} className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-full backdrop-blur-sm transition-all text-rose-400 text-sm font-medium shadow-lg">
              <List size={16} />
              <span>Tüm Sayaçlar</span>
            </button>
          )}
        </div>

        {formAcik && (
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 text-rose-400 mb-6 inline-block shadow-lg">
              <CalendarHeart size={40} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">{duzenlenecekId ? 'Sayacı Güncelle' : 'Yeni Sayaç Oluştur'}</h1>
            
            <form onSubmit={kaydet} className="w-full max-w-lg bg-zinc-900/60 border border-zinc-800/80 p-6 md:p-8 rounded-3xl backdrop-blur-md text-left shadow-2xl relative">
              {hata && (
                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} /><span>{hata}</span>
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-semibold">Sayacın Adı</label>
                <input type="text" required value={isimGirdisi} onChange={(e) => setIsimGirdisi(e.target.value)} placeholder="Örn: Tatil, Doğum Günü, Askerlik..." className="w-full bg-zinc-950/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-rose-500/70 transition-all" />
              </div>
              
              <div className="mb-4 relative z-20">
                <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 mb-2 font-semibold"><Calendar size={14}/> Hedef Tarih</label>
                <div className="grid grid-cols-3 gap-2">
                  {renderDropdown('gun', seciliGun, seciliGun, gunlerListesi.map(g => ({ label: g, value: g, onClick: () => setSeciliGun(g) })))}
                  {renderDropdown('ay', seciliAy, aylarListesi[seciliAy], aylarListesi.map((ay, i) => ({ label: ay, value: i, onClick: () => setSeciliAy(i) })))}
                  {renderDropdown('yil', seciliYil, seciliYil, yillarListesi.map(y => ({ label: y, value: y, onClick: () => setSeciliYil(y) })))}
                </div>
              </div>

              <div className="mb-10 relative z-10">
                <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 mb-2 font-semibold"><Clock size={14}/> Hedef Saat</label>
                <div className="grid grid-cols-2 gap-2">
                  {renderDropdown('saat', seciliSaat, String(seciliSaat).padStart(2, '0') + ' : Saat', saatlerListesi.map(s => ({ label: String(s).padStart(2, '0'), value: s, onClick: () => setSeciliSaat(s) })))}
                  {renderDropdown('dakika', seciliDakika, String(seciliDakika).padStart(2, '0') + ' : Dakika', dakikalarListesi.map(d => ({ label: String(d).padStart(2, '0'), value: d, onClick: () => setSeciliDakika(d) })))}
                </div>
              </div>
              
              <button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] relative z-0">
                {duzenlenecekId ? 'Değişiklikleri Kaydet' : 'Sayacı Başlat'}
              </button>
            </form>
          </div>
        )}

        {!formAcik && seciliSayacId && aktifDetay && (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">{aktifDetay.isim}</h1>
              <p className="text-rose-300 font-medium">Büyük güne geri sayım devam ediyor!</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl mb-12">
              {['Gun', 'Saat', 'Dakika', 'Saniye'].map((birim, i) => {
                const isSaniye = birim.toLowerCase() === 'saniye';
                return (
                  <div key={i} className={`flex flex-col items-center p-6 md:p-8 bg-zinc-900/60 border ${isSaniye ? 'border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.15)]' : 'border-zinc-800/80'} rounded-3xl backdrop-blur-md transition-transform hover:scale-[1.02] duration-300`}>
                    <span className={`text-4xl md:text-6xl font-bold ${isSaniye ? 'text-rose-400' : 'text-white'} tabular-nums`}>{aktifZaman[birim.toLowerCase()]}</span>
                    <span className="text-zinc-500 text-xs md:text-sm mt-3 uppercase tracking-widest font-semibold">{birim === 'Gun' ? 'Gün' : birim}</span>
                  </div>
                )
              })}
            </div>

            <div className="w-full max-w-4xl flex flex-col animate-in fade-in zoom-in-95 duration-700 delay-300">
              <div className="flex justify-between items-end mb-3 px-1">
                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5"><Activity size={14} className="text-rose-500" /> İlerleme Durumu</span>
                <span className="text-rose-400 font-mono text-sm font-bold tracking-wider">%{(aktifZaman.ilerleme || 0).toFixed(4)}</span>
              </div>
              <div className="w-full h-3 bg-zinc-900/80 rounded-full border border-zinc-800/80 overflow-hidden relative shadow-inner">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-700 via-rose-500 to-pink-500 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${aktifZaman.ilerleme || 0}%` }}>
                  <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30 blur-[2px]"></div>
                </div>
              </div>
              <div className="flex justify-between mt-3 px-1 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                <span>Başlangıç</span>
                <span>{new Date(aktifDetay.hedef).toLocaleDateString('tr-TR')} - {new Date(aktifDetay.hedef).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>
          </div>
        )}

        {!formAcik && !seciliSayacId && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold text-white mb-8">Sayaçlarım</h2>
            
            {sayaclar.length === 0 ? (
              <div className="text-center p-12 bg-zinc-900/40 border border-zinc-800/80 rounded-3xl backdrop-blur-sm max-w-md w-full">
                <CalendarHeart size={48} className="text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Henüz Sayaç Yok</h3>
                <p className="text-zinc-400 text-sm mb-6">Özel günleriniz için geri sayımlar oluşturun.</p>
                <button onClick={() => formAc()} className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2.5 rounded-full transition-colors text-sm font-medium">İlk Sayacını Kur</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                {sayaclar.map((sayac) => {
                  const sz = zamanlar[sayac.id] || { gun: '00', saat: '00', dakika: '00' };
                  return (
                    <div key={sayac.id} onClick={() => setSeciliSayacId(sayac.id)} className="group bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 hover:border-rose-500/30 p-5 rounded-2xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.05)] relative overflow-hidden flex flex-col justify-between h-40">
                      
                      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-rose-600 to-pink-500 transition-all duration-1000" style={{ width: `${sz.ilerleme || 0}%` }}></div>

                      <div className="flex justify-between items-start z-10">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-rose-400 transition-colors line-clamp-1">{sayac.isim}</h3>
                          <p className="text-xs text-zinc-500 flex items-center gap-1.5"><Calendar size={12}/> {new Date(sayac.hedef).toLocaleDateString('tr-TR')} - {new Date(sayac.hedef).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                        
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); formAc(sayac); }} className="p-1.5 bg-zinc-800 hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 rounded-lg transition-colors"><Edit size={14} /></button>
                          <button onClick={(e) => sil(sayac.id, e)} className="p-1.5 bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </div>

                      <div className="flex items-end justify-between z-10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-black text-white tabular-nums">{sz.gun}</span>
                          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Gün Kaldı</span>
                        </div>
                        <ChevronRight size={20} className="text-zinc-600 group-hover:text-rose-400 transition-colors group-hover:translate-x-1" />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}