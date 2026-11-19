// Bağlantı paylaşıldığında (WhatsApp, X, Facebook...) görünen 1200x630 önizleme görseli.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_BOYUT = { width: 1200, height: 630 };

// Tema adı -> görseldeki vurgu rengi
export const OG_RENK = {
  emerald: '#34d399',
  blue: '#60a5fa',
  cyan: '#22d3ee',
  purple: '#c084fc',
  red: '#f87171',
  amber: '#fbbf24',
  rose: '#fb7185',
  indigo: '#a5b4fc',
};

// Türkçe harfler (ğ, ş, ı, İ) için latin-ext dahil Inter yazı tipi.
let fontlarSozu;
function fontlar() {
  const dizin = join(process.cwd(), 'src/assets/fonts');
  const oku = (ad) => readFile(join(dizin, ad));
  fontlarSozu ??= Promise.all([
    oku('inter-latin-400-normal.woff'),
    oku('inter-latin-ext-400-normal.woff'),
    oku('inter-latin-700-normal.woff'),
    oku('inter-latin-ext-700-normal.woff'),
  ]).then(([l4, le4, l7, le7]) => [
    // Aynı adla verilince Satori latin-ext kalın harfleri bulamıyor; ayrı adlarla yedek font olarak ver.
    { name: 'Inter', data: l4, weight: 400, style: 'normal' },
    { name: 'Inter', data: l7, weight: 700, style: 'normal' },
    { name: 'InterExt', data: le4, weight: 400, style: 'normal' },
    { name: 'InterExt', data: le7, weight: 700, style: 'normal' },
  ]);
  return fontlarSozu;
}

/**
 * @param {object} p
 * @param {string} p.baslik  Büyük başlık ("YKS'ye kaç gün kaldı?")
 * @param {string} [p.alt]   Alt satır (tarih vb.)
 * @param {string} [p.etiket] Üstteki küçük etiket ("ÖSYM · 2027")
 * @param {string} [p.vurgu] Sağ alttaki büyük vurgu ("223 gün")
 * @param {string} [p.tema]  Renk teması
 */
export async function ogResim({ baslik, alt, etiket, vurgu, tema = 'emerald' }, secenekler = {}) {
  const renk = OG_RENK[tema] ?? OG_RENK.emerald;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: '#09090b',
          backgroundImage: `radial-gradient(circle at 85% 10%, ${renk}33 0%, transparent 55%), radial-gradient(circle at 0% 100%, ${renk}1a 0%, transparent 45%)`,
          fontFamily: 'Inter, InterExt',
          color: '#fafafa',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: '#18181b',
              border: '2px solid #27272a',
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="10" x2="14" y1="2" y2="2" />
              <line x1="12" x2="15" y1="14" y2="11" />
              <circle cx="12" cy="14" r="8" />
            </svg>
          </div>
          <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>Sayaçhane</div>
        </div>

        {/* Başlık */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {etiket && (
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                padding: '8px 20px',
                borderRadius: 999,
                border: `2px solid ${renk}66`,
                color: renk,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              {/* CSS uppercase "i"yi "I" yapar; Türkçe kurala göre büyüt (i -> İ). */}
              {etiket.toLocaleUpperCase('tr-TR')}
            </div>
          )}
          <div style={{ display: 'flex', fontSize: baslik.length > 28 ? 64 : 80, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 1000 }}>
            {baslik}
          </div>
          {alt && <div style={{ display: 'flex', fontSize: 34, color: '#a1a1aa' }}>{alt}</div>}
        </div>

        {/* Alt satır */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 28, color: '#71717a' }}>sayachane.com.tr</div>
          {vurgu && <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, color: renk, letterSpacing: -1 }}>{vurgu}</div>}
        </div>
      </div>
    ),
    { ...OG_BOYUT, fonts: await fontlar(), ...secenekler },
  );
}
