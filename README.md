# Maison Terre storefront

Dark editorial storefront built with Vite, React 19, TypeScript and Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev
```

Validate TypeScript and build the production bundle:

```bash
npm run typecheck
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages

The project is a Vite SPA deployed from `main` through GitHub Actions.

The Vite base path is derived from `GITHUB_REPOSITORY` during Actions builds, so this repository deploys under `/sf3/` without hard-coded legacy paths. User/org Pages repositories ending in `.github.io` use the root path.

The workflow also validates the generated `dist` artifact and copies `dist/index.html` to `dist/404.html` so direct SPA routes work on GitHub Pages.

## Structure

- `src/lib/catalog.ts` – static product catalog. Replace these functions with PrestaShop API calls later.
- `src/hooks/use-cart.tsx` – cart state persisted in localStorage.
- `src/components/store/` – navbar, footer, cart drawer, product card, breadcrumbs, quantity selector and info-page layout.
- `src/components/ui/` – small Radix UI primitives.
- `src/pages/` – Home, Shop, Product detail, Our story, Sustainability, Shipping & returns, Contact and 404.
- `src/index.css` – theme tokens and global styles.

## Routes

`/`, `/shop`, `/shop/:category`, `/product/:slug`, `/our-story`, `/sustainability`, `/shipping-returns`, `/contact`

Product images are currently hosted on hercules-cdn.com. Checkout is a frontend placeholder until the store backend is connected.
