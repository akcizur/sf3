export type StorefrontEvent =
  | "view_product"
  | "search"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "purchase"
  | "wishlist_add"
  | "wishlist_remove";

export function track(event: StorefrontEvent, payload?: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent("storefront:analytics", {
    detail: { event, payload, timestamp: Date.now() },
  }));
}
