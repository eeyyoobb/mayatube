"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import  {useQuizState} from "@/context/QuizProvider"; 
import CustomCard from "../Quiz";
type CategoryType = {
  id: number;
  name: string;
};

export default function DropdownOptions() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [customQuizzes,setcustomQuizzes]=useQuizState()

  console.log(customQuizzes)
  // Fetch categories from the API
  useEffect(() => {
    async function fetchCategory() {
      const { categories } = await (await fetch("/api/quizzes/custom")).json();
      setCategories([...categories]);
    }
    fetchCategory();
  }, []);

  return (
    <>
      <section className="flex justify-evenly items-center py-5">
        {/* Category Dropdown */}
        <div className="px-7 py-4 border-gray-100 border-2 rounded-xl w-1/3 mx-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex outline-none justify-between w-full">
              {config.category.name || "SELECT CATEGORY"} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="overflow-y-scroll">
              <DropdownMenuLabel>{config.category.name || "SELECT CATEGORY"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.name}
                  onClick={() => addCategory(category.id, category.name)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Level Dropdown */}
        <div className="px-7 py-4 border-gray-100 border-2 rounded-xl w-1/3 mx-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex outline-none justify-between w-full">
              {config.level || "SELECT LEVEL"} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{config.level || "SELECT LEVEL"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["easy", "medium", "hard"].map((level) => (
                <DropdownMenuItem key={level} onClick={() => addLevel(level)}>
                  {level}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Type Dropdown */}
        <div className="px-7 py-4 border-gray-100 border-2 rounded-xl w-1/3 mx-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex outline-none justify-between w-full">
              {config.type || "SELECT TYPE"} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{config.type || "SELECT TYPE"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["boolean", "multiple"].map((type) => (
                <DropdownMenuItem key={type} onClick={() => addType(type)}>
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </>
  );
}
