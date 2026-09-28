import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./hooks/use-cart.tsx";
import StoreLayout from "./components/store/store-layout.tsx";
import Index from "./pages/Index.tsx";
import ShopPage from "./pages/shop/page.tsx";
import ProductPage from "./pages/product/page.tsx";
import CartPage from "./pages/cart/page.tsx";
import CheckoutPage from "./pages/checkout/page.tsx";
import CheckoutSuccessPage from "./pages/checkout/success.tsx";
import WishlistPage from "./pages/wishlist/page.tsx";
import AccountPage from "./pages/account/page.tsx";
import OrderPage from "./pages/account/orders/[id].tsx";
import PolicyPage from "./pages/policy/page.tsx";
import NotFound from "./pages/NotFound.tsx";
import OurStoryPage from "./pages/our-story/page.tsx";
import SustainabilityPage from "./pages/sustainability/page.tsx";
import ShippingReturnsPage from "./pages/shipping-returns/page.tsx";
import ContactPage from "./pages/contact/page.tsx";

export default function App() {
  return (
    <CartProvider>
      <Toaster position="bottom-right" richColors theme="dark" />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<StoreLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:category" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/orders/:id" element={<OrderPage />} />
            <Route path="/terms" element={<PolicyPage kind="terms" />} />
            <Route path="/privacy" element={<PolicyPage kind="privacy" />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
