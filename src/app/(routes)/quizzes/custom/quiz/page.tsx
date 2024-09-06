import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuizState } from '@/context/QuizProvider';

const QuizPage = () => {
  const router = useRouter();
  const { numQuestions } = router.query;
  const { filteredQuizzes } = useQuizState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!filteredQuizzes.length) return <p>No quizzes available.</p>;

  const currentQuiz = filteredQuizzes[currentQuestionIndex];

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(index => Math.min(index + 1, filteredQuizzes.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(index => Math.max(index - 1, 0));
  };

  return (
    <section className="flex flex-col items-center my-10">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Quiz
      </h1>
      <div className="p-10 my-10 rounded-lg shadow-xl w-[65%]">
        <h2 className="text-xl font-bold">{currentQuiz.question}</h2>
        {/* Render choices and handle user selection here */}
        <div className="flex justify-between mt-6">
          <button 
            className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary/80"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button 
            className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary/80"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex >= filteredQuizzes.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizPage;
