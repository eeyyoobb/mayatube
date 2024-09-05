'use client';
import React, { useContext } from 'react';
import CustomCard from '@/components/quiz/custom/Quiz';
import PlaceHolder from '@/components/quiz/PlaceHolder';
import { useQuizState } from '@/context/QuizProvider';
import { CurrentUserContext } from "@/context/CurrentUserContext";

function QuizCustom() {
  const { customQuizzes } = useQuizState();
  console.log("cus",customQuizzes);

  const currentUser = useContext(CurrentUserContext);

  // Corrected mapping of quizData
  const quizData = customQuizzes?.map((quiz: any) => ({
    question: quiz.question,
    answers: quiz.choices,
    correctAnswer: quiz.correctAnswer,
   
  })) || [];

  return (
    <>
      <div className="poppins mx-12 mt-10"> 
        {quizData.length === 0 ? (
          <PlaceHolder />
        ) : (
          <div> 
            <h2 className="text-xl font-bold">My Quizzes</h2>
            <CustomCard allQuiz={quizData} userId={currentUser?.id} />
          </div> 
        )}
      </div> 
    </>
  );
}

export default QuizCustom;
