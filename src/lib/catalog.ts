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
  { slug: "home-goods", name: "Home Goods", description: "Pieces that bring warmth to every room." },
  { slug: "kitchen", name: "Kitchen", description: "Tools and tableware for slow, shared meals." },
  { slug: "accessories", name: "Accessories", description: "Leather goods and totes made to be carried daily." },
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
    name: "Olive Wood Serving Board",
    brand: "Maison Terre",
    price: 52,
    category: "kitchen",
    description: "Carved from a single piece of olive wood, each board carries its own grain. Made for bread, cheese and long evenings.",
    shortDescription: "Solid olive wood with a hand-finished edge.",
    image: IMAGES[0],
    gallery: [IMAGES[0], IMAGES[1], IMAGES[5]],
    options: [{ name: "Size", values: ["Medium", "Large"] }],
    sku: "MT-KIT-001",
    stock: 18,
    badges: ["Bestseller"],
    tags: ["wood", "handmade", "kitchen"],
    rating: 4.9,
    reviewCount: 46,
    features: ["Solid olive wood", "Food-safe finish", "Hand-finished edge"],
    specs: { Material: "Olive wood", Dimensions: "42 × 19 × 2 cm", Care: "Hand wash", Origin: "Mediterranean" },
    reviews: [
      review("Sofia R.", 5, "Beautiful grain", "Feels substantial and looks even better in person."),
      review("Daniel M.", 5, "Daily favourite", "Perfect size for breakfast and sharing plates."),
    ],
  },
  {
    slug: "stoneware-bowl-set",
    name: "Stoneware Bowl Set",
    brand: "Maison Terre",
    price: 44,
    compareAtPrice: 52,
    category: "kitchen",
    description: "A set of four matte stoneware bowls, wheel-thrown and glazed in soft earth tones. Dishwasher safe.",
    shortDescription: "Four everyday bowls in quiet, earthy tones.",
    image: IMAGES[1],
    gallery: [IMAGES[1], IMAGES[0], IMAGES[5]],
    options: [{ name: "Color", values: ["Sand", "Charcoal"] }],
    sku: "MT-KIT-002",
    stock: 7,
    badges: ["-15%"],
    tags: ["stoneware", "tableware", "kitchen"],
    rating: 4.8,
    reviewCount: 31,
    features: ["Set of 4", "Dishwasher safe", "Microwave safe"],
    specs: { Material: "Stoneware", Diameter: "16 cm", Capacity: "550 ml", Care: "Dishwasher safe" },
    reviews: [
      review("Emma K.", 5, "Great everyday bowls", "The matte finish is gorgeous and practical."),
    ],
  },
  {
    slug: "canvas-everyday-tote",
    name: "Canvas Everyday Tote",
    brand: "Maison Terre",
    price: 39,
    category: "accessories",
    description: "Heavy natural canvas with vegetable-tanned leather handles. Roomy enough for the market, the office or the beach.",
    shortDescription: "Heavy canvas, leather handles and one generous main compartment.",
    image: IMAGES[2],
    gallery: [IMAGES[2], IMAGES[3], IMAGES[4]],
    options: [{ name: "Color", values: ["Natural", "Olive"] }],
    sku: "MT-ACC-001",
    stock: 24,
    badges: [],
    tags: ["canvas", "leather", "bag"],
    rating: 4.7,
    reviewCount: 28,
    features: ["Heavyweight canvas", "Vegetable-tanned leather", "Reinforced handles"],
    specs: { Material: "Canvas + leather", Dimensions: "48 × 36 × 12 cm", Handle: "62 cm", Care: "Spot clean" },
    reviews: [
      review("Marta P.", 5, "Perfect commuter tote", "Fits my laptop, lunch and everything else without looking bulky."),
    ],
  },
  {
    slug: "minimalist-leather-wallet",
    name: "Minimalist Leather Wallet",
    brand: "Maison Terre",
    price: 62,
    category: "accessories",
    description: "Full-grain leather bifold with four card slots. Slim today, beautifully worn in a few years.",
    shortDescription: "Slim full-grain leather wallet that develops a patina.",
    image: IMAGES[3],
    gallery: [IMAGES[3], IMAGES[2], IMAGES[0]],
    options: [{ name: "Color", values: ["Cognac", "Black"] }],
    sku: "MT-ACC-002",
    stock: 12,
    badges: ["New"],
    tags: ["leather", "wallet", "everyday"],
    rating: 4.9,
    reviewCount: 19,
    features: ["Full-grain leather", "4 card slots", "Slim bifold"],
    specs: { Material: "Full-grain leather", Slots: "4", Dimensions: "10.5 × 8.5 cm", Origin: "Portugal" },
    reviews: [
      review("Alex T.", 5, "Quietly excellent", "Simple, slim and the leather feels fantastic."),
    ],
  },
  {
    slug: "seagrass-storage-basket",
    name: "Seagrass Storage Basket",
    brand: "Maison Terre",
    price: 56,
    category: "home-goods",
    description: "Hand-woven seagrass basket for blankets, plants or everyday clutter. Sturdy, light and fully natural.",
    shortDescription: "Hand-woven storage basket for soft, everyday organisation.",
    image: IMAGES[4],
    gallery: [IMAGES[4], IMAGES[0], IMAGES[5]],
    options: [{ name: "Size", values: ["Small", "Large"] }],
    sku: "MT-HOM-001",
    stock: 5,
    badges: ["Low stock"],
    tags: ["seagrass", "storage", "home"],
    rating: 4.6,
    reviewCount: 14,
    features: ["Hand-woven", "Natural material", "Foldable handles"],
    specs: { Material: "Seagrass", Diameter: "38 cm", Height: "32 cm", Care: "Dry cloth" },
    reviews: [
      review("Nina L.", 5, "Looks beautiful", "Softens the room immediately and holds a surprising amount."),
    ],
  },
  {
    slug: "terracotta-table-vase",
    name: "Terracotta Table Vase",
    brand: "Maison Terre",
    price: 48,
    category: "home-goods",
    description: "A hand-finished terracotta vase with a warm matte glaze. Sized for a single stem or a small seasonal bunch.",
    shortDescription: "Small hand-finished vase with a warm matte surface.",
    image: IMAGES[5],
    gallery: [IMAGES[5], IMAGES[1], IMAGES[4]],
    options: [{ name: "Color", values: ["Terracotta", "Sand"] }],
    sku: "MT-HOM-002",
    stock: 0,
    badges: ["Sold out"],
    tags: ["terracotta", "ceramic", "home"],
    rating: 4.8,
    reviewCount: 21,
    features: ["Hand-finished", "Matte glaze", "Stable base"],
    specs: { Material: "Terracotta", Height: "18 cm", Opening: "4 cm", Care: "Wipe clean" },
    reviews: [
      review("Julie S.", 5, "Lovely little object", "Looks great with one branch or two stems."),
    ],
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
      product.name,
      product.brand,
      product.category,
      product.shortDescription,
      product.description,
      ...product.tags,
    ].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

export const getRelatedProducts = (product: Product, limit = 4) =>
  PRODUCTS.filter((item) => item.slug !== product.slug && (item.category === product.category || item.tags.some((tag) => product.tags.includes(tag)))).slice(0, limit);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
