import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./navbar.tsx";
import Footer from "./footer.tsx";
import CartDrawer from "./cart-drawer.tsx";

export default function StoreLayout() {
  const { pathname } = useLocation();
  // Reset scroll on route change (browser API)
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 pt-12 md:px-6">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
