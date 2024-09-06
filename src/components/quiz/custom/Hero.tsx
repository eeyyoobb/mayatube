import React from 'react';
import DropdownOptions from '@/components/quiz/custom/dropdown';

export default function Home() {
  const handleStartQuiz = () => {
    // Navigate to the filter page or handle the action here
    // Example: router.push('/quizzes/custom/quiz');
  };

  return (
    <section className='flex flex-col justify-center items-center my-10'>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to the Trivia Quiz...
      </h1>
      <section className='p-10 my-10 rounded-lg shadow-xl w-[65%]'>
        <DropdownOptions />
        <div className="flex items-center justify-center mt-6">
          <button 
            className="big size button shadow"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
        </div>
      </section>
    </section>
  );
}
