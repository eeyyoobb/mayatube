 'use client';
import { useEffect } from 'react';
import Navbar from '@/components/quiz/Navbar';
import QuizzesArea from '@/components/quiz/QuizzesArea';
import  {useQuizState}  from '@/context/QuizProvider';
import Quizzes from "./quiz-start/page"



export default function Home() {
const {allQuizzes, quizToStartObject, selectedQuizObject ,singleQuiz} = useQuizState(); // Use the hook to access context
const { setSelectQuizToStart } = quizToStartObject;
const { setSelectedQuiz } = selectedQuizObject;

  useEffect(() => {
    setSelectQuizToStart(null);
    setSelectedQuiz(null);
  }, []);

   return (
      <div className="flex flex-col w-full bg-white border border-gray-200 h-svh">
         <QuizzesArea/>
      </div>
   );
 }

