'use client';

import React from "react";
import Sidebar from "@/components/quiz/sidebar";
import QuizContextProvider from "@/context/QuizContextProvider";
import GlobalStyleProvider from "@/context/GlobalStyleProvider";

export default function QuizLayout({children}){
  return (
    <QuizContextProvider>
      <GlobalStyleProvider>
        <div className="flex gap-10 p-10 h-full">
          <Sidebar />
          <div className="w-full">{children}</div>
        </div>
        </GlobalStyleProvider>
    </QuizContextProvider>
  );
};
