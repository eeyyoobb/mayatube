'use client';

import React from "react";
import Sidebar from "@/components/quiz/sidebar";
import QuizContextProvider from "@/context/QuizContextProvider";
import GlobalStyleProvider from "@/context/GlobalStyleProvider";
import Navbar from '@/components/quiz/Navbar';

export default function QuizLayout({children}){
  return (
    <QuizContextProvider>
      <GlobalStyleProvider>
        <div className="flex gap-10 p-10 h-full">
          <Sidebar />
          <div className="flex flex-col w-full bg-white border border-gray-200 h-svh">
            <Navbar />
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </GlobalStyleProvider>
    </QuizContextProvider>
  );
};
