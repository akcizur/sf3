import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./navbar.tsx";
import Footer from "./footer.tsx";
import CartDrawer from "./cart-drawer.tsx";
import MobileNav from "./mobile-nav.tsx";
import { SearchProvider } from "./search-dialog.tsx";
import CookieBanner from "./cookie-banner.tsx";

export default function StoreLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SearchProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 pb-28 pt-10 md:px-6 md:pt-14 lg:pb-16">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <MobileNav />
        <CookieBanner />
      </div>
    </SearchProvider>
  );
}
