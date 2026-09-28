import { useEffect } from "react";

type SeoOptions = {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  type?: "website" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function useSeo({ title, description, image, canonical, noindex, type = "website", jsonLd }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = "cs";

    const upsert = (selector: string, attrs: Record<string, string>, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        Object.entries(attrs).forEach(([key, value]) => element!.setAttribute(key, value));
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    if (description) upsert('meta[name="description"]', { name: "description" }, description);
    upsert('meta[name="robots"]', { name: "robots" }, noindex ? "noindex,nofollow" : "index,follow");
    upsert('meta[property="og:locale"]', { property: "og:locale" }, "cs_CZ");
    upsert('meta[property="og:title"]', { property: "og:title" }, title);
    if (description) upsert('meta[property="og:description"]', { property: "og:description" }, description);
    upsert('meta[property="og:type"]', { property: "og:type" }, type);
    if (image) upsert('meta[property="og:image"]', { property: "og:image" }, image);

    if (canonical) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    document.head.querySelector('script[data-storefront-jsonld="true"]')?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.storefrontJsonld = "true";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, image, canonical, noindex, type, jsonLd]);
}
