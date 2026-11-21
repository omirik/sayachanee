// =====================================================================
// REKLAM AYARLARI (Google AdSense)
// =====================================================================
// AdSense başvurusu onaylanınca:
//  1. AdSense > Reklamlar > "Reklam birimine göre" bölümünden her alan için bir
//     "Görüntülü reklam" birimi oluştur ve verilen data-ad-slot numaralarını aşağıya yaz.
//  2. acik: true yap.
// AdSense panelinde "Otomatik reklamlar" KAPALI kalsın; yerleşimi biz belirliyoruz.
// =====================================================================

export const REKLAM = {
  acik: false,
  istemci: 'ca-pub-9995958735732535',
  alanlar: {
    sayacAlti: '', // sayaç ve paylaş düğmelerinin altı (sayaç sayfaları)
    sayfaSonu: '', // SSS'nin sonu (sayaç sayfaları)
    liste: '', // ana sayfa ve kategori listelerinde 6. karttan sonra
    imsakiye: '', // il sayfalarında imsakiye tablosunun altı
  },
};
