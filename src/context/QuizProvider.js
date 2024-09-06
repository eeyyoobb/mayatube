'use client';

import { createContext, useContext, useEffect, useState } from 'react';
//import { quizzesData } from './QuizzesData';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import themes from '@/Common/themes';
import { CurrentUserContext } from './CurrentUserContext';


const QuizContext = createContext();

export function QuizContextProvider({ children }) {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [eachQuizzes, setEachQuizzes] = useState([]);
   console.log(eachQuizzes)
  const [selectQuizToStart, setSelectQuizToStart] = useState(null);
  const currentUser =useContext(CurrentUserContext)
  const [user, setUser] = useState({});
  const [openIconBox, setOpenIconBox] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState({ faIcon: faQuestion });

  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [threeDotsPositions, setThreeDotsPositions] = useState({ x: 0, y: 0 });
  const [isLoading, setLoading] = useState(true);

  const [userXP, setUserXP] = useState(0);

  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];

  const initializeStatistics = (quizQuestions) => {
    return quizQuestions.map(question => ({
      ...question,
      statistics: {
        totalAttempts: question.statistics?.totalAttempts || 0,
        incorrectAttempts: question.statistics?.incorrectAttempts || 0,
        correctAttempts: question.statistics?.correctAttempts || 0,
      },
    }));
  };
  
  // Usage example in your fetch or state initialization
  const fetchAllQuizzes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/quiz', {
        cache: 'no-cache',
      });
  
      if (!response.ok) {
        toast.error('fetching went wrong...');
        throw new Error('fetching failed...');
      }
  
      const quizzesData = await response.json();
      const initializedQuizzes = quizzesData.quizzes.map(quiz => ({
        ...quiz,
        quizQuestions: initializeStatistics(quiz.quizQuestions),
      }));
  
      setAllQuizzes(initializedQuizzes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/quiz', {
          cache: 'no-cache',
        });

        if (!response.ok) {
          toast.error('fetching went wrong...');
          throw new Error('fetching failed...');
        }

        const quizzesData = await response.json();

        setAllQuizzes(quizzesData.quizzes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllQuizzes();
  }, []);

  useEffect(() => {
    if (allQuizzes.length > 0) {
      const questions = allQuizzes.flatMap(quiz => quiz.quizQuestions);
      setEachQuizzes(questions);
    }
  }, [allQuizzes]);
  


  useEffect(() => {
    if (selectedQuiz) {
      setSelectedIcon({ faIcon: selectedQuiz.icon });
    } else {
      setSelectedIcon({ faIcon: faQuestion });
    }
  }, [selectedQuiz]);

  return (
    <QuizContext.Provider
      value={{
        theme,
        allQuizzes,
        setAllQuizzes,
        eachQuizzes,
        setEachQuizzes,
        quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
        userObject: { user, setUser },
        openBoxToggle: { openIconBox, setOpenIconBox },
        selectedIconObject: { selectedIcon, setSelectedIcon },
        dropDownToggleObject: { dropDownToggle, setDropDownToggle },
        threeDotsPositionsObject: { threeDotsPositions, setThreeDotsPositions },
        selectedQuizObject: { selectedQuiz, setSelectedQuiz },
        userXpObject: { userXP, setUserXP },
        isLoadingObject: { isLoading, setLoading },
        numberOfQuestions:{ numberOfQuestions, setNumberOfQuestions }
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizState = () => useContext(QuizContext);
