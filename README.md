# Maison Terre storefront

Dark editorial storefront frontend built with Vite, React 19, TypeScript and Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev
```

Build for production with `npm run build` (output in `dist/`).

## Structure

- `src/lib/catalog.ts` – static product catalog. Replace these functions with PrestaShop API calls later.
- `src/hooks/use-cart.tsx` – cart state (saved in localStorage).
- `src/components/store/` – navbar, footer, cart drawer, product card, breadcrumbs, quantity selector, info page layout.
- `src/components/ui/` – shadcn/ui primitives (button, sheet, select, accordion, empty).
- `src/pages/` – Home, Shop (category filter, search, sort), Product detail, Our story, Sustainability, Shipping & returns, Contact, 404.
- `src/index.css` – theme tokens (colors, radius, font).

## Routes

`/`, `/shop`, `/shop/:category`, `/product/:slug`, `/our-story`, `/sustainability`, `/shipping-returns`, `/contact`

Note: product images are hosted on hercules-cdn.com. Checkout is a placeholder until the store backend is connected.
