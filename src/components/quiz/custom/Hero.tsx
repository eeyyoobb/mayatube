"use client";
import React, { useEffect, useState } from "react";
import { useQuizState } from "@/context/QuizProvider";
import toast, { Toaster } from "react-hot-toast";
import "./style.css";

interface Statistics {
  id: string;
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  questionId: string;
}

interface Quiz {
  id: string;
  mainQuestion: string;
  choices: string[];
  correctAnswer: number;
  answeredResult: number;
  statisticsId: string;
  quizId: string;
  category: string | null;
  difficulty: string | null;
  statistics: Statistics;
}

export default function MultiFilters() {
  const { eachQuizzes, setEachQuizzes } = useQuizState();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>(eachQuizzes);
  const [maxItems, setMaxItems] = useState<number>(eachQuizzes.length);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (eachQuizzes.length > 0) {
      const uniqueCategories = Array.from(
        new Set(eachQuizzes.map((quiz) => quiz.category).filter((cat) => cat !== null))
      ) as string[];
      setCategories(uniqueCategories);
    }
  }, [eachQuizzes]);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      const tempQuizzes = eachQuizzes.filter((quiz) =>
        selectedFilters.includes(quiz.category || "")
      );
      setFilteredQuizzes(tempQuizzes);
    } else {
      setFilteredQuizzes(eachQuizzes);
    }
  }, [selectedFilters, eachQuizzes]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    if (value) {
      setSelectedFilters([value]);
    } else {
      setSelectedFilters([]);
    }
  };

  const handleMaxItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMaxItems(value > 0 ? value : 1);
  };

  const handleButtonClick = () => {
    if (selectedFilters.length === 0) {
      toast.error("Please select at least one filter.");
      return;
    }
    setShowResults(true);
    setShowFilters(false);
  };

  return (
    <div className="bg-gray-700 p-4">
      <Toaster
        toastOptions={{
          className: "",
          duration: 1500,
          style: {
            padding: "12px",
          },
        }}
      />

      {showFilters && (
        <>
          <div className="input-container mb-4">
            <label htmlFor="maxItems" className="text-white">Max items to display:</label>
            <input
              type="number"
              id="maxItems"
              value={maxItems}
              onChange={handleMaxItemsChange}
              min="1"
              max={eachQuizzes.length}
              className="ml-2 p-1"
            />
          </div>

          <div className="dropdown-container mb-4">
            <label htmlFor="categorySelect" className="text-white">Select Category:</label>
            <select
              id="categorySelect"
              value={selectedCategory || ""}
              onChange={handleFilterChange}
              className="ml-2 p-1"
            >
              <option value="">All Categories</option>
              {categories.map((category, idx) => (
                <option key={`category-${idx}`} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleButtonClick}
            className="result-button bg-blue-500 text-white p-2 rounded"
          >
            {selectedFilters.length === 0 ? "Please select" : "Show results"}
          </button>
        </>
      )}

      <div className="items-container mt-4">
        {showResults ? (
          filteredQuizzes.slice(0, maxItems).map((quiz, idx) => (
            <div key={`quizzes-${idx}`} className="quiz bg-gray-800 p-2 mb-2 rounded">
              <div className="flex items-center gap-2">
                <div className="bg-green-700 flex justify-center items-center rounded-md w-11 h-11 text-white p-3">
                  {idx + 1}
                </div>
                <p className="text-white">{quiz.mainQuestion}</p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {quiz.choices.map((choice, choiceIdx) => (
                  <div
                    key={choiceIdx}
                    className="p-3 border border-green-700 rounded-md bg-white hover:bg-green-700 hover:text-white transition-all select-none"
                  >
                    {choice}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No quizzes to display. Please select filters and click "Show results."</p>
        )}
      </div>
      
    </div>
  );
}
