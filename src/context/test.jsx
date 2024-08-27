'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
//import { CurrentUserContext } from "@/context/CurrentUserContext";
//import {quizzesData}from "@/utils/QuizzesData"
import themes from "../Common/themes";

export const QuizContext = createContext();

export const QuizContextProvider= ({ children })=>{
  //const currentUser = useContext(CurrentUserContext);
  //const [user, setUser] = useState(currentUser);

  const [allQuizzes, setAllQuizzes] = useState([]);
  const [selectQuizToStart, setSelectQuizToStart] = useState(null);
  const [openIconBox, setOpenIconBox] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState({ faIcon: faQuestion });
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [threeDotsPositions, setThreeDotsPositions] = useState({ x: 0, y: 0 });
                  // const { user, setUser } = useState(()=>{
                  //   const saveUserData = localStorage.getItem('user');
                  //   return saveUserData ? JSON.parse(saveUserData):currentUser;
                  // });
                  // const { userXP, setUserXP } = useState(()=>{
                  //   const saveUserData = localStorage.getItem('user');
                  //   return saveUserData ? JSON.parse(saveUserData).experience:0
                  // });

  const [isLoading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/quizzes', { cache: 'no-cache' });

        if (!response.ok) {
          toast.error('Something went wrong...');
          throw new Error('Fetching failed...');
        }

        const quizzesData = await response.json();
        setAllQuizzes(quizzesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllQuizzes();
  }, []);


   
  useEffect(() => {
    setSelectedIcon({ faIcon: selectedQuiz?.icon || faQuestion });
  }, [selectedQuiz]);

                //  useEffect(()=>{
                //   localStorage.setItem("user",JSON.stringify(user));
                //  },[user])


  // useEffect(()=>{
  //    setUser((prevUser)=>({
  //         ...prevUser,
  //         experience:userXP,
  //   }))
  //   },[userXP])


  
 // const deleteTask = async (id) => {
  //   try {
  //     const res = await axios.delete(`/api/tasks/${id}`);
  //     toast.success("Task deleted");

  //     allTasks();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  // const updateTask = async (task) => {
  //   try {
  //     const res = await axios.put(`/api/tasks`, task);

  //     toast.success("Task updated");

  //     allTasks();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  //const completedTasks = tasks.filter((task) => task.isCompleted === true);
  //const importantTasks = tasks.filter((task) => task.isImportant === true);
  //const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
  
  return (
    <QuizContext.Provider
      value={{
        allQuizzes,
        setAllQuizzes,
        theme,
        quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
        openBoxToggle: { openIconBox, setOpenIconBox },
        selectedIconObject: { selectedIcon, setSelectedIcon },
        dropDownToggleObject: { dropDownToggle, setDropDownToggle },
        threeDotsPositionsObject: { threeDotsPositions, setThreeDotsPositions },
        selectedQuizObject: { selectedQuiz, setSelectedQuiz },
        isLoadingObject: { isLoading, setLoading },
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizState = () => useContext(QuizContext);


