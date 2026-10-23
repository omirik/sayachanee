export default function sitemap() {
  const baseUrl = 'https://sayachane.com.tr';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1, // En önemli sayfa ana sayfa
    },
    {
      url: `${baseUrl}/ramazan`,
      lastModified: new Date(),
      changeFrequency: 'daily', // Ramazan her gün değişiyor
      priority: 0.9,
    },
    {
      url: `${baseUrl}/yks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kpss`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ozel`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}