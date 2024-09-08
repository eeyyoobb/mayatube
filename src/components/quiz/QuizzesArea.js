'use client';
import React, { useContext } from 'react';
import QuizCard from './QuizCard';
import PlaceHolder from './PlaceHolder';
import { useQuizState } from '@/context/QuizProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DropDown from './DropDown';
import { CurrentUserContext } from "@/context/CurrentUserContext";

function QuizzesArea() {
  const { allQuizzes,eachQuizzes} = useQuizState();
  const currentUser =useContext(CurrentUserContext)

  return (
    <div className="poppins mx-12 mt-10 flex-wrap">
      {allQuizzes.length === 0 ? (
        <PlaceHolder />
      ) : (
        <div> 
         <DropDown />
         <div className='flex'>
          <h2 className="text-xl font-bold">My Quizzes</h2>
          <div className="mt-6 flex gap-2 flex-wrap">
            {allQuizzes.map((singleQuiz, quizIndex) => (
              <div key={quizIndex}>
                <QuizCard singleQuiz={singleQuiz} />
              </div>
            ))}
          </div>
          <div
            onClick={() => router.push('/quizzes/custom')}
            className="cursor-pointer justify-center items-center rounded-[10px] w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4"
          >
            <Image
              src={'/add-quiz.png'}
              width={160}
              height={160}
              alt="Add a new Quiz"
            />
            <span className="select-none opacity-40">
              customize your quiz
            </span>
          </div>
          <div
            onClick={() => router.push('/quizzes/quiz-build')}
            className="cursor-pointer justify-center items-center rounded-[10px] w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4"
          >
            <Image
              src={'/add-quiz.png'}
              width={160}
              height={160}
              alt="Add a new Quiz"
            />
            <span className="select-none opacity-40">
              Add a new Quiz
            </span>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default QuizzesArea;
