export const CURRENCY = "CZK";
export const LOCALE = "cs-CZ";
export const FREE_SHIPPING_THRESHOLD = 2500;
export const STANDARD_SHIPPING = 149;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (value: string | Date) =>
  new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

export const getShippingCost = (subtotal: number) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;

export const getFreeShippingProgress = (subtotal: number) =>
  Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

export const getFreeShippingRemaining = (subtotal: number) =>
  Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

// ci verification
