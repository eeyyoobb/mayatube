"use client";
import React from "react";
import { GlobalTaskProvider } from "./TaskProvider";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

function TaskProvider({ children }: Props) {
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
    <GlobalTaskProvider>
      <Toaster />
      {children}
    </GlobalTaskProvider>
   );
 }

export default TaskProvider;
