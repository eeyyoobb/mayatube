"use client";

import React from "react";
import { useRouter } from 'next/navigation'; // Assuming you're using Next.js routing
import { useQuizState } from "@/context/QuizProvider";

export default function Button() {
  const { setStatus } = useQuizState();
  const router = useRouter();

  const handleStart = () => {
    setStatus("categories");
    router.push("/quizzes/custom/quiz"); // Navigate to the quiz page
  };

  return (
    <button
      onClick={handleStart}
      type="button"
      aria-label="Start Quiz"
      className="m-auto text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 py-4 px-10 w-1/2"
    >
      Start Quiz Now
    </button>
  );
}
