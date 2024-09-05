"use client";
import React from "react";
import { useTaskState } from "@/context/TaskProvider";
import Tasks from "@/components/tasks/Tasks";

function page() {
  const { completedTasks } = useTaskState();

  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}

export default page;
