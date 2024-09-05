"use client";
import Tasks from "@/components/tasks/Tasks";
import { useTaskState } from "@/context/TaskProvider";

export default function Home() {
  const { tasks } = useTaskState();
  return <Tasks title="All Tasks" tasks={tasks}/>;
}
