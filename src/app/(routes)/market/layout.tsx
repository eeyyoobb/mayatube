import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/market/navbar";
import Footer from "@/components/market/footer";
import MarketContextProvider from "@/context/MarketContextProvider"


const inter = Inter({ subsets: ["latin"] });

export default function MarketLayout({
    children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
      </body>
    </html>
  );
}
