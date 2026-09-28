// Static catalog. Swap these functions for PrestaShop API calls later.
export type Category = { slug: string; name: string; description: string };
export type Product = {
  slug: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: "home-goods", name: "Home Goods", description: "Pieces that bring warmth to every room." },
  { slug: "kitchen", name: "Kitchen", description: "Tools and tableware for slow, shared meals." },
  { slug: "accessories", name: "Accessories", description: "Leather goods and totes made to be carried daily." },
];

const CDN = "https://hercules-cdn.com/";

export const PRODUCTS: Product[] = [
  { slug: "olive-wood-serving-board", name: "Olive Wood Serving Board", price: 52, category: "kitchen", image: `${CDN}file_fsWUbIMPthlN5OSYZqb6TNnh`, description: "Carved from a single piece of olive wood, each board carries its own grain. Made for bread, cheese and long evenings." },
  { slug: "stoneware-bowl-set", name: "Stoneware Bowl Set", price: 44, category: "kitchen", image: `${CDN}file_3NUjFlourgAS2gHM8sTK1RHL`, description: "A set of four matte stoneware bowls, wheel-thrown and glazed in soft earth tones. Dishwasher safe." },
  { slug: "canvas-everyday-tote", name: "Canvas Everyday Tote", price: 39, category: "accessories", image: `${CDN}file_aO8D0FLu54jlPIfDEE3tXGt0`, description: "Heavy natural canvas with vegetable-tanned leather handles. Roomy enough for the market, the office or the beach." },
  { slug: "minimalist-leather-wallet", name: "Minimalist Leather Wallet", price: 62, category: "accessories", image: `${CDN}file_DUK7DKUsfqGjTBc3N7IeGmd4`, description: "Full-grain leather bifold with four card slots. Slim today, beautifully worn in a few years." },
  { slug: "seagrass-storage-basket", name: "Seagrass Storage Basket", price: 56, category: "home-goods", image: `${CDN}file_4bE52STLR0fAr2JCrg7suidk`, description: "Hand-woven seagrass basket for blankets, plants or everyday clutter. Sturdy, light and fully natural." },
  { slug: "terracotta-table-vase", name: "Terracotta Table Vase", price: 48, category: "home-goods", image: `${CDN}file_HNxRLv6nDlzjMMkvpHCLKL8Y`, description: "A hand-finished terracotta vase with a warm matte glaze. Sized for a single stem or a small seasonal bunch." },
];

export const HERO_IMAGE = `${CDN}file_c7c6YmGpGGf8Jrk1UYUFY1ED`;

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getProductsByCategory = (slug?: string) =>
  slug ? PRODUCTS.filter((p) => p.category === slug) : PRODUCTS;
export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
