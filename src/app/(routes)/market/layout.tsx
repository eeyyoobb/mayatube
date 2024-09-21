
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/market/Navbar";
import Footer from "@/components/market/Footer";
import { Toaster } from 'sonner';
import { cn, constructMetadata } from '@/lib/utils'



const inter = Inter({ subsets: ["latin"] });

export default function MarketLayout({
    children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full'>
      <body
        className={cn(
          'relative h-full font-sans antialiased',
          inter.className
        )}>
        <main className='relative flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-grow flex-1'>
              {children}
            </div>
            <Footer />
        </main>

        <Toaster position='top-center' richColors />
      </body>
    </html>
  );
}
