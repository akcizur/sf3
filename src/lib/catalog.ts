export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type ProductOption = {
  name: string;
  values: string[];
};

export type ProductReview = {
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  options: ProductOption[];
  sku: string;
  stock: number;
  badges: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  features: string[];
  specs: Record<string, string>;
  reviews: ProductReview[];
};

export const CATEGORIES: Category[] = [
  { slug: "home-goods", name: "Domov", description: "Promyšlené kousky, které dodají interiéru klid a charakter." },
  { slug: "kitchen", name: "Kuchyně", description: "Nádobí a doplňky pro každodenní vaření, stolování a sdílené chvíle." },
  { slug: "accessories", name: "Doplňky", description: "Kůže, plátno a další praktické věci pro každý den." },
];

const CDN = "https://hercules-cdn.com/";

const IMAGES = [
  `${CDN}file_fsWUbIMPthlN5OSYZqb6TNnh`,
  `${CDN}file_3NUjFlourgAS2gHM8sTK1RHL`,
  `${CDN}file_aO8D0FLu54jlPIfDEE3tXGt0`,
  `${CDN}file_DUK7DKUsfqGjTBc3N7IeGmd4`,
  `${CDN}file_4bE52STLR0fAr2JCrg7suidk`,
  `${CDN}file_HNxRLv6nDlzjMMkvpHCLKL8Y`,
];

const review = (author: string, rating: number, title: string, body: string): ProductReview => ({
  author,
  rating,
  title,
  body,
  date: "2026-09-12",
});

export const PRODUCTS: Product[] = [
  {
    slug: "olive-wood-serving-board",
    name: "Servírovací prkénko z olivového dřeva",
    brand: "Maison Terre",
    price: 1290,
    category: "kitchen",
    description: "Vyrobené z jednoho kusu olivového dřeva, takže každý kus má vlastní kresbu. Na pečivo, sýry i dlouhé večery u stolu.",
    shortDescription: "Masivní olivové dřevo s ručně opracovanou hranou.",
    image: IMAGES[0],
    gallery: [IMAGES[0], IMAGES[1], IMAGES[5]],
    options: [{ name: "Velikost", values: ["Střední", "Velká"] }],
    sku: "MT-KIT-001",
    stock: 18,
    badges: ["Bestseller"],
    tags: ["dřevo", "ruční výroba", "kuchyně"],
    rating: 4.9,
    reviewCount: 46,
    features: ["Masivní olivové dřevo", "Povrch vhodný pro potraviny", "Ručně opracovaná hrana"],
    specs: { Materiál: "Olivové dřevo", Rozměry: "42 × 19 × 2 cm", Údržba: "Ruční mytí", Původ: "Středomoří" },
    reviews: [
      review("Sofia R.", 5, "Nádherná kresba", "Působí bytelně a ve skutečnosti vypadá ještě lépe než na fotografii."),
      review("Daniel M.", 5, "Každodenní favorit", "Ideální velikost na snídani i servírování pro více lidí."),
    ],
  },
  {
    slug: "stoneware-bowl-set",
    name: "Sada kameninových misek",
    brand: "Maison Terre",
    price: 1090,
    compareAtPrice: 1290,
    category: "kitchen",
    description: "Sada čtyř matných kameninových misek, ručně točených a glazovaných v tlumených zemitých tónech. Vhodné do myčky.",
    shortDescription: "Čtyři každodenní misky v klidných přírodních odstínech.",
    image: IMAGES[1],
    gallery: [IMAGES[1], IMAGES[0], IMAGES[5]],
    options: [{ name: "Barva", values: ["Písková", "Antracitová"] }],
    sku: "MT-KIT-002",
    stock: 7,
    badges: ["-16 %"],
    tags: ["kamenina", "stolování", "kuchyně"],
    rating: 4.8,
    reviewCount: 31,
    features: ["Sada 4 kusů", "Vhodné do myčky", "Vhodné do mikrovlnné trouby"],
    specs: { Materiál: "Kamenina", Průměr: "16 cm", Objem: "550 ml", Údržba: "Myčka nádobí" },
    reviews: [review("Emma K.", 5, "Skvělé na každý den", "Matný povrch je krásný a zároveň velmi praktický.")],
  },
  {
    slug: "canvas-everyday-tote",
    name: "Každodenní plátěná taška",
    brand: "Maison Terre",
    price: 990,
    category: "accessories",
    description: "Pevné přírodní plátno a madla z rostlinně činěné kůže. Dostatek prostoru na nákup, práci i výlet.",
    shortDescription: "Pevné plátno, kožená madla a velká hlavní kapsa.",
    image: IMAGES[2],
    gallery: [IMAGES[2], IMAGES[3], IMAGES[4]],
    options: [{ name: "Barva", values: ["Přírodní", "Olivová"] }],
    sku: "MT-ACC-001",
    stock: 24,
    badges: [],
    tags: ["plátno", "kůže", "taška"],
    rating: 4.7,
    reviewCount: 28,
    features: ["Silné plátno", "Rostlinně činěná kůže", "Zpevněná madla"],
    specs: { Materiál: "Plátno + kůže", Rozměry: "48 × 36 × 12 cm", Madla: "62 cm", Údržba: "Lokální čištění" },
    reviews: [review("Marta P.", 5, "Perfektní taška do města", "Vejde se notebook, oběd i všechno ostatní, přitom nepůsobí objemně.")],
  },
  {
    slug: "minimalist-leather-wallet",
    name: "Minimalistická kožená peněženka",
    brand: "Maison Terre",
    price: 1590,
    category: "accessories",
    description: "Peněženka z celozrnné kůže se čtyřmi přihrádkami na karty. Časem získá přirozenou patinu.",
    shortDescription: "Tenká peněženka z celozrnné kůže, která krásně stárne.",
    image: IMAGES[3],
    gallery: [IMAGES[3], IMAGES[2], IMAGES[0]],
    options: [{ name: "Barva", values: ["Koňaková", "Černá"] }],
    sku: "MT-ACC-002",
    stock: 12,
    badges: ["Novinka"],
    tags: ["kůže", "peněženka", "každodenní"],
    rating: 4.9,
    reviewCount: 19,
    features: ["Celozrnná kůže", "4 přihrádky na karty", "Tenká konstrukce"],
    specs: { Materiál: "Celozrnná kůže", Přihrádky: "4", Rozměry: "10,5 × 8,5 cm", Původ: "Portugalsko" },
    reviews: [review("Alex T.", 5, "Nenápadně výborná", "Jednoduchá, tenká a kůže působí opravdu skvěle.")],
  },
  {
    slug: "seagrass-storage-basket",
    name: "Úložný koš z mořské trávy",
    brand: "Maison Terre",
    price: 1390,
    category: "home-goods",
    description: "Ruěně pletený koš z mořské trávy na deky, rostliny i každodenní drobnosti. Pevný, lehký a zcela přírodní.",
    shortDescription: "Ruční pletení a přirozený materiál pro klidnější organizaci domova.",
    image: IMAGES[4],
    gallery: [IMAGES[4], IMAGES[0], IMAGES[5]],
    options: [{ name: "Velikost", values: ["Malá", "Velká"] }],
    sku: "MT-HOM-001",
    stock: 5,
    badges: ["Poslední kusy"],
    tags: ["mořská tráva", "úložný prostor", "domov"],
    rating: 4.6,
    reviewCount: 14,
    features: ["Ruční pletení", "Přírodní materiál", "Sklopná madla"],
    specs: { Materiál: "Mořská tráva", Průměr: "38 cm", Výška: "32 cm", Údržba: "Suchý hadřík" },
    reviews: [review("Nina L.", 5, "Vypadá nádherně", "Okamžitě zklidní místnost a pojme překvapivé množství věcí.")],
  },
  {
    slug: "terracotta-table-vase",
    name: "Stolní váza z terakoty",
    brand: "Maison Terre",
    price: 1190,
    category: "home-goods",
    description: "Ručně dokončená terakotová váza s teplou matnou glazurou. Vhodná pro jednu větev i menší sezónní kytici.",
    shortDescription: "Malá ručně dokončená váza s teplým matným povrchem.",
    image: IMAGES[5],
    gallery: [IMAGES[5], IMAGES[1], IMAGES[4]],
    options: [{ name: "Barva", values: ["Terakota", "Písková"] }],
    sku: "MT-HOM-002",
    stock: 0,
    badges: ["Vyprodáno"],
    tags: ["terakota", "keramika", "domov"],
    rating: 4.8,
    reviewCount: 21,
    features: ["Ruční dokončení", "Matná glazura", "Stabilní základna"],
    specs: { Materiál: "Terakota", Výška: "18 cm", Otvor: "4 cm", Údržba: "Otřít hadříkem" },
    reviews: [review("Julie S.", 5, "Krásný detail", "Skvěle funguje s jednou větví nebo dvěma stonky.")],
  },
];

export const HERO_IMAGE = `${CDN}file_c7c6YmGpGGf8Jrk1UYUFY1ED`;

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getProductsByCategory = (slug?: string) => (slug ? PRODUCTS.filter((p) => p.category === slug) : PRODUCTS);

export function searchProducts(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return PRODUCTS;
  return PRODUCTS.filter((product) => {
    const haystack = [
      product.name, product.brand, product.category, product.shortDescription, product.description,
      ...product.tags,
    ].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

export const getRelatedProducts = (product: Product, limit = 4) =>
  PRODUCTS.filter((item) => item.slug !== product.slug && (
    item.category === product.category || item.tags.some((tag) => product.tags.includes(tag))
  )).slice(0, limit);
