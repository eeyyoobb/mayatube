import Navigation from "@/components/shared/Navigation/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { cn, constructMetadata } from '@/lib/utils'
import { Inter } from 'next/font/google'
import CurrentUserProvider from "@/context/CurrentUserContext";
import getCurrentUser from "@/actions/getCurrentUser";
import CreateChannelModalProvider from "@/context/CreateChannelModalContext";
import CreateChannelModal from "@/components/shared/Modal/CreateChannelModal";
//import { Toaster } from "react-hot-toast";
import { Toaster } from 'sonner';
import getCurrentChannel from "@/actions/getCurrentChannel";
import CurrentChannelProvider from "@/context/CurrentChannelContext";
import UploadVideoModalProvider from "@/context/UploadVideoModalContext";
import SidebarProvider from "@/context/SidebarContext";
import QuizContextProvider from "@/context/QuizContextProvider";
import GlobalStyleProvider from "@/context/GlobalStyleProvider";
import TaskProvider from "@/context/TaskContextProvider"
import { QuizConfigProvider } from '@/context/QuizCustom';
import NextTopLoader from "nextjs-toploader";
import Providers from "@/components/market/Providers";


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "All in One",
  description: "Learn purchase find resources from each other!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const currentUser = await getCurrentUser();
   const currentChannel = await getCurrentChannel();

  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" 
      integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" 
      crossOrigin="anonymous" 
      referrerPolicy="no-referrer" />
      </head>
      <body
        className={cn(
          'relative h-full font-sans antialiased',
          inter.className
        )}>
        <main className='relative flex flex-col min-h-screen'>
      <NextTopLoader
            height={2}
            color="#27AE60"
            easing="cubic-bezier(0.53,0.21,0,1)"
          />
          <Providers>
         <GlobalStyleProvider> 
         <CreateChannelModalProvider>
          {/* <Toaster toastOptions={{ position: "bottom-left" }} /> */}
          <Toaster position='top-center' richColors />
           <CreateChannelModal/>
            <CurrentUserProvider user={currentUser}>
             <CurrentChannelProvider channel={currentChannel}> 
               <UploadVideoModalProvider>
                <SidebarProvider>
                  <TaskProvider> 
                    <QuizContextProvider>
                       <Navigation />
                        <div className="pt-16 flex-grow flex-1">{children}</div>
                    </QuizContextProvider>
                    </TaskProvider> 
                  </SidebarProvider>
                </UploadVideoModalProvider>
             </CurrentChannelProvider>
          </CurrentUserProvider>
        </CreateChannelModalProvider>
       </GlobalStyleProvider>
       </Providers>
       </main>
      </body>
    </html>
  );
}
