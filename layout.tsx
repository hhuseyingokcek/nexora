import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/context/currency-context";
import { AuthProvider } from "@/context/auth-context";
import { AdminStoreProvider } from "@/context/admin-store";
import { WishlistProvider } from "@/context/wishlist-context";
import { CompareProvider } from "@/context/compare-context";
import { CartProvider } from "@/context/cart-context";
import { ToastProvider } from "@/components/toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { CompareDrawer } from "@/components/compare-drawer";

export const metadata: Metadata = {
  title: "NEXORA | Authentic Taste of Gaziantep & Luxury Textile",
  description: "Experience sun-dried heirloom harvest, authentic Urfa-Antep oiled isot, emerald Boz pistachios, and luxury streetwear inspired by the legendary Silk Road of Gaziantep.",
  keywords: [
    "Gaziantep",
    "Kuru Patlıcan",
    "İsot",
    "Antep Fıstığı",
    "Boz Fıstık",
    "Gaziantep Salça",
    "Baklava",
    "Turkish Gastronomy",
    "Luxury Streetwear",
    "Nexora"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0D0D0D] text-[#F8F9FA] min-h-screen flex flex-col antialiased selection:bg-[#B3001B] selection:text-white">
        <CurrencyProvider>
          <AuthProvider>
            <AdminStoreProvider>
              <WishlistProvider>
                <CompareProvider>
                  <CartProvider>
                    <ToastProvider>
                      <Navbar />
                      <main className="flex-1">{children}</main>
                      <Footer />
                      <CartDrawer />
                      <CompareDrawer />
                    </ToastProvider>
                  </CartProvider>
                </CompareProvider>
              </WishlistProvider>
            </AdminStoreProvider>
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
