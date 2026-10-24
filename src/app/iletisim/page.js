'use client'
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Send, User, CheckCircle2, Loader2 } from 'lucide-react';

export default function Iletisim() {
  const [formVerisi, setFormVerisi] = useState({ isim: '', email: '', mesaj: '' });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [gonderildi, setGonderildi] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // BURAYA WEB3FORMS'TAN ALDIĞIN ACCESS KEY'İ YAPIŞTIR:
          access_key: "7006462c-ddd6-4198-9674-d6bb0c6b3b19", 
          name: formVerisi.isim,
          email: formVerisi.email,
          message: formVerisi.mesaj,
          subject: "Sayaçhane'den Yeni Bir İletişim Mesajı Var!", // Sana gelecek mailin başlığı
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setGonderildi(true);
        setFormVerisi({ isim: '', email: '', mesaj: '' });
        // 5 saniye sonra başarı mesajını kaldır
        setTimeout(() => setGonderildi(false), 5000);
      } else {
        alert("Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.");
      }
    } catch (error) {
      alert("Bağlantı hatası oluştu. Lütfen internetinizi kontrol edin.");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 pt-12 relative pb-32 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-zinc-950 to-teal-950/10 -z-10 fixed"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-emerald-500/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 px-5 py-2.5 rounded-full border border-zinc-800 shadow-lg hover:bg-zinc-800">
            <ArrowLeft size={16} /> <span className="text-sm font-medium">Geri Dön</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Bizimle <br/><span className="text-emerald-400">İletişime Geçin.</span>
            </h1>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Öneri, şikayet, iş birliği veya sadece merhaba demek için formu doldurabilirsiniz. Size en kısa sürede dönüş yapacağız.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-emerald-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">E-Posta</p>
                  <a href="mailto:iletisim@sayachane.com.tr" className="text-white hover:text-emerald-400 transition-colors font-medium">
                    iletisim@sayachane.com.tr
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 md:p-10 rounded-[2rem] backdrop-blur-sm shadow-2xl relative overflow-hidden">
              
              <div className={`absolute inset-0 z-20 bg-zinc-900/95 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-500 ${gonderildi ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <CheckCircle2 size={64} className="text-emerald-500 mb-4 animate-in zoom-in duration-500" />
                <h3 className="text-2xl font-bold text-white mb-2">Mesajınız Alındı!</h3>
                <p className="text-zinc-400 text-center max-w-xs">En kısa sürede e-posta adresiniz üzerinden size geri dönüş yapacağız.</p>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-semibold">Adınız Soyadınız</label>
                    <div className="relative">
                      <input 
                        type="text" required disabled={yukleniyor}
                        value={formVerisi.isim} onChange={(e) => setFormVerisi({...formVerisi, isim: e.target.value})}
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/70 focus:bg-zinc-900/80 transition-all disabled:opacity-50" 
                        placeholder="Örn: Ahmet Yılmaz"
                      />
                      <User size={18} className="absolute left-4 top-4 text-zinc-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-semibold">E-Posta Adresiniz</label>
                    <div className="relative">
                      <input 
                        type="email" required disabled={yukleniyor}
                        value={formVerisi.email} onChange={(e) => setFormVerisi({...formVerisi, email: e.target.value})}
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/70 focus:bg-zinc-900/80 transition-all disabled:opacity-50" 
                        placeholder="ornek@mail.com"
                      />
                      <Mail size={18} className="absolute left-4 top-4 text-zinc-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 font-semibold">Mesajınız</label>
                  <div className="relative">
                    <textarea 
                      required rows={5} disabled={yukleniyor}
                      value={formVerisi.mesaj} onChange={(e) => setFormVerisi({...formVerisi, mesaj: e.target.value})}
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-4 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/70 focus:bg-zinc-900/80 transition-all resize-none disabled:opacity-50" 
                      placeholder="Size nasıl yardımcı olabiliriz?"
                    />
                    <MessageSquare size={18} className="absolute left-4 top-4 text-zinc-500" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={yukleniyor}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {yukleniyor ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Mesajı Gönder</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}