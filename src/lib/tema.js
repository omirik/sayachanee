// Sayaç sayfalarının renk temaları.
// Tailwind sınıfları dinamik üretilemediği için her renk burada tam yazılı.

export const temalar = {
  emerald: {
    hex: '#34d399', // tam ekran ışıltısı için
    metin: 'text-emerald-400',
    ikon: 'text-emerald-500',
    ikonKutu: 'bg-emerald-900/30 border-emerald-500/30 text-emerald-400',
    arkaPlan: 'from-emerald-900/15 via-zinc-950 to-teal-950/20',
    vurguKart: 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    cubuk: 'from-emerald-700 via-emerald-500 to-teal-400',
    secili: 'bg-emerald-500 text-zinc-950',
    sssAcik: 'open:border-emerald-500/50',
    sssBaslik: 'group-open:text-emerald-400',
    sssIkon: 'group-open:bg-emerald-500/20 group-open:text-emerald-400',
  },
  blue: {
    hex: '#60a5fa', // tam ekran ışıltısı için
    metin: 'text-blue-400',
    ikon: 'text-blue-500',
    ikonKutu: 'bg-blue-900/30 border-blue-500/30 text-blue-400',
    arkaPlan: 'from-blue-900/15 via-zinc-950 to-indigo-950/20',
    vurguKart: 'border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.15)]',
    cubuk: 'from-blue-700 via-blue-500 to-cyan-400',
    secili: 'bg-blue-500 text-white',
    sssAcik: 'open:border-blue-500/50',
    sssBaslik: 'group-open:text-blue-400',
    sssIkon: 'group-open:bg-blue-500/20 group-open:text-blue-400',
  },
  cyan: {
    hex: '#22d3ee', // tam ekran ışıltısı için
    metin: 'text-cyan-400',
    ikon: 'text-cyan-500',
    ikonKutu: 'bg-cyan-900/30 border-cyan-500/30 text-cyan-400',
    arkaPlan: 'from-cyan-900/15 via-zinc-950 to-blue-950/20',
    vurguKart: 'border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.15)]',
    cubuk: 'from-cyan-700 via-cyan-500 to-blue-400',
    secili: 'bg-cyan-500 text-zinc-950',
    sssAcik: 'open:border-cyan-500/50',
    sssBaslik: 'group-open:text-cyan-400',
    sssIkon: 'group-open:bg-cyan-500/20 group-open:text-cyan-400',
  },
  purple: {
    hex: '#c084fc', // tam ekran ışıltısı için
    metin: 'text-purple-400',
    ikon: 'text-purple-500',
    ikonKutu: 'bg-purple-900/30 border-purple-500/30 text-purple-400',
    arkaPlan: 'from-purple-900/15 via-zinc-950 to-fuchsia-950/20',
    vurguKart: 'border-purple-500/40 shadow-[0_0_30px_rgba(192,132,252,0.15)]',
    cubuk: 'from-purple-700 via-purple-500 to-fuchsia-400',
    secili: 'bg-purple-500 text-white',
    sssAcik: 'open:border-purple-500/50',
    sssBaslik: 'group-open:text-purple-400',
    sssIkon: 'group-open:bg-purple-500/20 group-open:text-purple-400',
  },
  red: {
    hex: '#f87171', // tam ekran ışıltısı için
    metin: 'text-red-400',
    ikon: 'text-red-500',
    ikonKutu: 'bg-red-900/30 border-red-500/30 text-red-500',
    arkaPlan: 'from-red-900/15 via-zinc-950 to-rose-950/20',
    vurguKart: 'border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)]',
    cubuk: 'from-red-700 via-red-500 to-rose-400',
    secili: 'bg-red-500 text-white',
    sssAcik: 'open:border-red-500/50',
    sssBaslik: 'group-open:text-red-400',
    sssIkon: 'group-open:bg-red-500/20 group-open:text-red-400',
  },
  indigo: {
    hex: '#a5b4fc', // tam ekran ışıltısı için
    metin: 'text-indigo-300',
    ikon: 'text-indigo-400',
    ikonKutu: 'bg-indigo-900/30 border-indigo-500/30 text-indigo-300',
    arkaPlan: 'from-indigo-900/15 via-zinc-950 to-violet-950/20',
    vurguKart: 'border-indigo-500/40 shadow-[0_0_30px_rgba(129,140,248,0.15)]',
    cubuk: 'from-indigo-700 via-indigo-500 to-violet-400',
    secili: 'bg-indigo-500 text-white',
    sssAcik: 'open:border-indigo-500/50',
    sssBaslik: 'group-open:text-indigo-300',
    sssIkon: 'group-open:bg-indigo-500/20 group-open:text-indigo-300',
  },
  rose: {
    hex: '#fb7185', // tam ekran ışıltısı için
    metin: 'text-rose-400',
    ikon: 'text-rose-500',
    ikonKutu: 'bg-rose-900/30 border-rose-500/30 text-rose-400',
    arkaPlan: 'from-rose-900/15 via-zinc-950 to-pink-950/20',
    vurguKart: 'border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.15)]',
    cubuk: 'from-rose-700 via-rose-500 to-pink-400',
    secili: 'bg-rose-500 text-white',
    sssAcik: 'open:border-rose-500/50',
    sssBaslik: 'group-open:text-rose-400',
    sssIkon: 'group-open:bg-rose-500/20 group-open:text-rose-400',
  },
  amber: {
    hex: '#fbbf24', // tam ekran ışıltısı için
    metin: 'text-amber-400',
    ikon: 'text-amber-500',
    ikonKutu: 'bg-amber-900/30 border-amber-500/30 text-amber-500',
    arkaPlan: 'from-amber-900/15 via-zinc-950 to-yellow-950/20',
    vurguKart: 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    cubuk: 'from-amber-700 via-amber-500 to-yellow-400',
    secili: 'bg-amber-500 text-zinc-950',
    sssAcik: 'open:border-amber-500/50',
    sssBaslik: 'group-open:text-amber-400',
    sssIkon: 'group-open:bg-amber-500/20 group-open:text-amber-400',
  },
};
