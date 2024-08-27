'use client'
import Sidebar from "@/components/tasks/sidebar/sidebar";
import GlobalStyleProvider from "@/context/GlobalStyleProvider";
import TaskContextProvider from "@/context/TaskContextProvider"

export default function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TaskContextProvider>
      <GlobalStyleProvider>
        <div className="flex gap-10 p-10 h-full">
          <Sidebar />
          <div className="w-full">{children}</div>
        </div>
      </GlobalStyleProvider>
    </TaskContextProvider>
  );
}
