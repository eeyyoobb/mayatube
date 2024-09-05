"use client";
"use client";
import React from "react";
import { useTaskState } from "@/context/TaskProvider";
import Tasks from "@/components/tasks/Tasks";

function page() {
  const { importantTasks } =  useTaskState();
  return <Tasks title="Important Tasks" tasks={importantTasks} />;
}

export default page;
