"use client";
import { useState, useEffect } from "react";
import StatCard from "@/components/quiz/ui/StatCard";

interface QuizProps {
  eachQuizzes: {
    question: string;
    answers: string[];
    correctAnswer: string;

  }[];
  userId: string | undefined;
}

const CustomCard = ({ eachQuizzes,userId,settype,setLevel }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] =
     useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);
  const { question, answers, correctAnswer } =
   eachQuizzes[activeQuestion];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(25);
  };

  const handleTimeUp = () => {
    stopTimer();
    resetTimer();
    nextQuestion();
  };

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, []);

  const onAnswerSelected = (
    answer: string,
    idx: number
  ) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer === correctAnswer ? answer : "");
  };

  const nextQuestion = () => {
    // Check if the quiz is finished
    const isLastQuestion = activeQuestion === allQuiz.length - 1;
    
    setSelectedAnswerIndex(null);
    
    setResults((prev) => {
      let updatedResults = { ...prev };
      
      if (selectedAnswer) {
        updatedResults.score += 5;
        updatedResults.correctAnswers += 1;
      } else {
        updatedResults.wrongAnswers += 1;
      }
      
      return updatedResults;
    });

    if (isLastQuestion) {
      setShowResults(true);
      stopTimer();
      fetch("/api/quizzes/quizResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          quizScore: results.score,
          correctAnswers: results.correctAnswers,
          wrongAnswers: results.wrongAnswers,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not working fam");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Quiz results saved successfully:", data);
        })
        .catch((error) => {
          console.error("Error saving quiz results:", error);
        });
    } else {
      setActiveQuestion((prev) => prev + 1);
      setChecked(false);
      resetTimer();
      startTimer();
    }
  };

  return (
    <div className="min-h-[500px] bg-black">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-10 items-center">
              <div className="bg-blue-700 text-white px-4 rounded-md py-1">
                <h2>
                  Question: {activeQuestion + 1}
                  <span>/{allQuiz.length}</span>
                </h2>
              </div>

              <div className="bg-blue-700 text-white px-4 rounded-md py-1">
                {timeRemaining} seconds to answer
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-2xl font-bold">
                {question}
              </h3>
              <ul>
                {answers.map((answer: string, idx: number) => (
                  <li
                    key={idx}
                    onClick={() => onAnswerSelected(answer, idx)}
                    className={`cursor-pointer mb-5 py-3 rounded-md hover:bg-blue-700 hover:text-white px-3
                    ${selectedAnswerIndex === idx && "bg-blue-70 text-white"}
                    `}
                  >
                    <span>{answer}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={nextQuestion}
                disabled={!checked}
                className="font-bold"
              >
                {activeQuestion === allQuiz.length - 1
                  ? "Finish"
                  : "Next Question →"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl uppercase mb-10">
              Results 📈
            </h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              <StatCard
                title="Percentage"
                value={`${(results.score / (allQuiz.length * 5)) * 100}%`}
              />
              <StatCard
                title="Total Questions"
                value={allQuiz.length}
              />
              <StatCard
                title="Total Score"
                value={results.score}
              />
              <StatCard
                title="Correct Answers"
                value={results.correctAnswers}
              />
              <StatCard
                title="Wrong Answers"
                value={results.wrongAnswers}
              />
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-10 font-bold uppercase"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCard;
