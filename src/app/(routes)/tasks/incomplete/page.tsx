"use client";
import React from "react";
import { useTaskState } from "@/context/TaskProvider";
import Tasks from "@/components/tasks/Tasks";

function page() {
  const { incompleteTasks } =  useTaskState();
  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
}

export default page;
