// Bir ilin bugün ve sonraki 2 günün iftar/sahur vakitleri (Ramazan sayfasındaki şehir seçici için).
// GET /api/vakitler/istanbul -> { kaynak, gunler: [{ tarih, imsak, aksam }] }
import { ilBul } from '@/data/iller';
import { sehirVakitleri, trBugun } from '@/lib/vakitler';

export async function GET(_istek, { params }) {
  const { il: slug } = await params;
  const il = ilBul(slug);
  if (!il) return Response.json({ hata: 'İl bulunamadı' }, { status: 404 });

  try {
    const simdi = Date.now();
    const { gunler, kaynak } = await sehirVakitleri(il, simdi);
    const liste = [0, 1, 2]
      .map((n) => trBugun(simdi, n))
      .filter((t) => gunler.has(t))
      .map((t) => ({ tarih: t, imsak: gunler.get(t).imsak, aksam: gunler.get(t).aksam }));

    return Response.json(
      { il: il.ad, kaynak, gunler: liste },
      { headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' } },
    );
  } catch (hata) {
    return Response.json({ hata: 'Vakitler alınamadı' }, { status: 502 });
  }
}
