// Instagram hikâyesi için dikey (1080x1920) sayaç görseli.
// GET /api/hikaye?ust=YKS'ye&sayi=209&birim=gün kaldı&alt=19 Haziran 2027&adres=/yks&tema=emerald
import { ImageResponse } from 'next/og';
import { fontlar, OG_RENK } from '@/lib/og';

const kirp = (s, n) => (s ?? '').toString().slice(0, n);

export async function GET(istek) {
  const p = new URL(istek.url).searchParams;
  const ust = kirp(p.get('ust'), 60);
  const sayi = kirp(p.get('sayi'), 12) || '?';
  const birim = kirp(p.get('birim'), 24);
  const alt = kirp(p.get('alt'), 70);
  const adres = `sayachane.com.tr${kirp(p.get('adres'), 40).split('?')[0]}`;
  const renk = OG_RENK[p.get('tema')] ?? OG_RENK.emerald;
  const sayiBoyutu = sayi.length <= 3 ? 400 : sayi.length <= 5 ? 300 : 200;
  // Uzun adresler (ör. /ramazan/kahramanmaras) tek satıra sığsın
  const adresBoyutu = adres.length > 34 ? 34 : adres.length > 26 ? 40 : 48;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          // Instagram'ın üst ve alt arayüzü için boşluk bırak
          padding: '260px 80px 300px',
          backgroundColor: '#09090b',
          backgroundImage: `radial-gradient(circle at 50% 38%, ${renk}40 0%, transparent 55%), radial-gradient(circle at 50% 100%, ${renk}26 0%, transparent 45%)`,
          fontFamily: 'Inter, InterExt',
          color: '#fafafa',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 84,
              height: 84,
              borderRadius: 22,
              backgroundColor: '#18181b',
              border: '3px solid #27272a',
            }}
          >
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="10" x2="14" y1="2" y2="2" />
              <line x1="12" x2="15" y1="14" y2="11" />
              <circle cx="12" cy="14" r="8" />
            </svg>
          </div>
          <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1 }}>Sayaçhane</div>
        </div>

        {/* Sayaç */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, color: '#e4e4e7', maxWidth: 920, textAlign: 'center', justifyContent: 'center' }}>
            {ust}
          </div>
          <div style={{ display: 'flex', fontSize: sayiBoyutu, fontWeight: 700, color: renk, lineHeight: 1, letterSpacing: -8, marginTop: 30 }}>
            {sayi}
          </div>
          <div style={{ display: 'flex', fontSize: 104, fontWeight: 700, marginTop: 10 }}>{birim}</div>
          {alt && <div style={{ display: 'flex', fontSize: 50, color: '#a1a1aa', marginTop: 50 }}>{alt}</div>}
        </div>

        {/* Adres */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 38, color: '#a1a1aa' }}>Sen de takip et</div>
          <div
            style={{
              display: 'flex',
              padding: '22px 44px',
              borderRadius: 999,
              border: `3px solid ${renk}80`,
              backgroundColor: '#18181bcc',
              fontSize: adresBoyutu,
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {adres}
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      fonts: await fontlar(),
      headers: { 'Cache-Control': 'public, max-age=600, s-maxage=600' },
    },
  );
}
