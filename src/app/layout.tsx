import Navigation from "@/components/shared/Navigation/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import CurrentUserProvider from "@/context/CurrentUserContext";
import getCurrentUser from "@/actions/getCurrentUser";
import CreateChannelModalProvider from "@/context/CreateChannelModalContext";
import CreateChannelModal from "@/components/shared/Modal/CreateChannelModal";
import { Toaster } from "react-hot-toast";
import getCurrentChannel from "@/actions/getCurrentChannel";
import CurrentChannelProvider from "@/context/CurrentChannelContext";
import UploadVideoModalProvider from "@/context/UploadVideoModalContext";
import SidebarProvider from "@/context/SidebarContext";
import QuizContextProvider from "@/context/QuizContextProvider";
import GlobalStyleProvider from "@/context/GlobalStyleProvider";
import TaskProvider from "@/context/TaskContextProvider"
import { QuizConfigProvider } from '@/context/QuizCustom';
import NextTopLoader from "nextjs-toploader";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Maya-Learn",
  description: "Learn from each other!",
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
      <body className={roboto.className}>
      <NextTopLoader
            height={2}
            color="#27AE60"
            easing="cubic-bezier(0.53,0.21,0,1)"
          />
         <GlobalStyleProvider> 
         <CreateChannelModalProvider>
          <Toaster toastOptions={{ position: "bottom-left" }} />
           <CreateChannelModal/>
            <CurrentUserProvider user={currentUser}>
             <CurrentChannelProvider channel={currentChannel}> 
               <UploadVideoModalProvider>
                <SidebarProvider>
                  <TaskProvider> 
                    <QuizContextProvider>
                    <QuizConfigProvider>
                       <Navigation />
                        <div className="pt-16">{children}</div>
                      </QuizConfigProvider>
                    </QuizContextProvider>
                    </TaskProvider> 
                  </SidebarProvider>
                </UploadVideoModalProvider>
             </CurrentChannelProvider>
          </CurrentUserProvider>
        </CreateChannelModalProvider>
       </GlobalStyleProvider> 
       
      </body>
    </html>
  );
}
