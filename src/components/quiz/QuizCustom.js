'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import {
  faCode,
  faEllipsis,
  faPlay,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import {useQuizState} from '@/context/QuizProvider';
import { icon } from '@fortawesome/fontawesome-svg-core';
import convertToFaIcons from '@/Common/convertToFaIcons';

function successRate(allQuiz) {
  let correctQuestions = 0;
  let totalAttemptes = 0;
  let successRate = 0;

  allQuiz.quizQuestions.forEach((question) => {
    totalAttemptes += question.statistics.totalAttempts;
    correctQuestions += question.statistics.correctAttempts;
  });

  if (totalAttemptes===0) {
     return "0";
  }

  successRate = Math.ceil((correctQuestions / totalAttemptes) * 100);
  return successRate;
}

function QuizCustomCard({allQuiz}) {
  // console.log("AllQuiz:", allQuiz);
  const {
    quizToStartObject,
    dropDownToggleObject,
    threeDotsPositionsObject,
    selectedQuizObject,
  } = useQuizState();
  const { setDropDownToggle } = dropDownToggleObject;
  
  const { setSelectQuizToStart } = quizToStartObject;
  const { setThreeDotsPositions } = threeDotsPositionsObject;
  const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
  
  const {quizTitle, quizQuestions=[], icon } = allQuiz;
  const totalQuestions = quizQuestions.length;
  const globalSuccessRate = successRate(allQuiz); 



  return (
    <div className="rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4">
      {/* Image Container */}
      <div className="relative bg-green-700 w-full h-32 flex justify-center items-center  rounded-md ">
        {/* More Options Icon */}
        {/* Quiz Icon */}
        <FontAwesomeIcon
          className="text-white text-3xl"
          width={120}
          height={120}
          icon={convertToFaIcons(icon)}
        />
      </div>
      {/* Title Area */}
      <h3 className="font-bold text-black ">Custom Quiz</h3>
      {/* Questions */}
      <p className="text-sm font-light  text-black ">10 question(s)</p>
      {/* Footer Area */}
      <div className="flex gap-3">
        {/* success rate area */}
        <div className="flex gap-1 items-center">
          <Image src="/target-777.png" width={20} height={10} alt="" />
          <span className=" text-[12px]  text-black ">
            Success rate: {globalSuccessRate}% 
          </span>
        </div>
         <div
          onClick={() => {
            setSelectQuizToStart(allQuiz);
          }}
          className="rounded-full w-7 h-7 bg-green-700 flex items-center justify-center cursor-pointer"
        > 
           <Link href="/quizzes/custom">
            <FontAwesomeIcon
              className="text-white"
              width={15}
              height={15}
              icon={faPlay}
            />
          </Link> 
         </div> 
      </div>
    </div>
  );
}

export default QuizCustomCard;
