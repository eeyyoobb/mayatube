'use client';
import React, { createContext, useState, useContext } from "react";
import themes from "../Common/themes";
import axios from "axios";
import toast from "react-hot-toast";
import { CurrentUserContext } from "@/context/CurrentUserContext";


export const TaskContext = createContext();
export const TaskUpdateContext = createContext();

export const GlobalTaskProvider = ({ children }) => {
  const user = useContext(CurrentUserContext);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [tasks, setTasks] = useState([]);

  const theme = themes[selectedTheme];

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");

      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sorted);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  React.useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        theme,
        tasks,
        // deleteTask,
        isLoading,
        // completedTasks,
        // importantTasks,
        // incompleteTasks,
        // updateTask,
        // modal,
        //openModal,
        closeModal,
        allTasks,
        // collapsed,
        // collapseMenu,
      }}
    >
      <TaskUpdateContext.Provider value={{}}>
        {children}
      </TaskUpdateContext.Provider>
    </TaskContext.Provider>
  );
};

export const useTaskState = () => useContext(TaskContext);
export const useTaskUpdate = () => useContext(TaskUpdateContext);
