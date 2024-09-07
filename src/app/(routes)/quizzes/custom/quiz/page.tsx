"use client";

import React, { useEffect, useState } from "react";
import { useQuizState } from "@/context/QuizProvider";
import toast, { Toaster } from "react-hot-toast";
import ScoreComponent from "@/components/quiz/QuizStartPage/score";

const QuizStartQuestions = ({ quizParentProps = {} }) => {
  const { category = "", level = "", type = "", numberOfQuestions = 0 } = quizParentProps; // Default values
  const { eachQuizzes } = useQuizState();
  
  const [filteredQuizzes, setFilteredQuizzes] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  let interval: NodeJS.Timeout;

  useEffect(() => {
    const applyFilters = () => {
      let filtered = eachQuizzes;

      // Apply filters based on the selected values from the form
      if (category) {
        filtered = filtered.filter((quiz: any) => quiz.category === category);
      }
      if (level) {
        filtered = filtered.filter((quiz: any) => quiz.level === level);
      }
      if (type) {
        filtered = filtered.filter((quiz: any) => quiz.type === type);
      }
      if (numberOfQuestions && numberOfQuestions > 0) {
        filtered = filtered.slice(0, numberOfQuestions);
      }

      setFilteredQuizzes(filtered);
    };

    applyFilters(); // Apply filters when component mounts
  }, [category, level, type, numberOfQuestions, eachQuizzes]);

  // Timer logic
  const startTimer = () => {
    clearInterval(interval);
    setTimer(30);

    interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(interval);
  }, []);

  const moveToNextQuestion = () => {
    if (selectedChoice === null) {
      toast.error("Please select an answer.");
      return;
    }

    // Check answer and move to the next question
    setScore((prevScore) => prevScore + (selectedChoice === filteredQuizzes[currentQuestionIndex].correctAnswer ? 1 : 0));
    setSelectedChoice(null);

    if (currentQuestionIndex < filteredQuizzes.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizEnded(true);
      clearInterval(interval);
    }
  };

  return (
    <div className="relative poppins rounded-sm m-9 w-9/12">
      <Toaster
        toastOptions={{
          className: "",
          duration: 1500,
          style: {
            padding: "12px",
          },
        }}
      />
      {/* Display the quiz if it's not ended */}
      {!isQuizEnded && filteredQuizzes.length > 0 && (
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-green-700 flex justify-center items-center rounded-md w-11 h-11 text-white p-3">
              {currentQuestionIndex + 1}
            </div>
            <p>{filteredQuizzes[currentQuestionIndex].question}</p>
          </div>
          <div className="mt-7 flex flex-col gap-2">
            {filteredQuizzes[currentQuestionIndex].choices.map((choice, indexChoice) => (
              <div
                key={indexChoice}
                onClick={() => setSelectedChoice(indexChoice)}
                className={`p-3 ml-11 w-10/12 border border-green-700 rounded-md
                 hover:bg-green-700 hover:text-white transition-all select-none ${
                   selectedChoice === indexChoice ? "bg-green-700 text-white" : "bg-white"
                 }`}
              >
                {choice}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-7">
            <button
              onClick={moveToNextQuestion}
              disabled={isQuizEnded}
              className={`p-2 px-5 text-[15px] text-white rounded-md bg-green-700 mr-[70px] ${
                isQuizEnded ? "opacity-60" : "opacity-100"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {/* Display score when the quiz ends */}
      {isQuizEnded && (
        <ScoreComponent
          quizStartParentProps={{
            setIsQuizEnded,
            setCurrentQuestionIndex,
            setSelectedChoice,
            setScore,
            score,
          }}
        />
      )}
    </div>
  );
};

export default QuizStartQuestions;
