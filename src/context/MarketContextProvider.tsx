"use client";
import React from "react";
import { GlobalMarketProvider } from "./MarketProvider";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

function MarketProvider({ children }: Props) {
const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 250);
  }, []);

  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

   return (
    <GlobalMarketProvider>
      <Toaster />
      {children}
    </GlobalMarketProvider>
   );
 }

export default MarketProvider;
