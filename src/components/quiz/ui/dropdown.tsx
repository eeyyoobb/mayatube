"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuizState } from "@/context/QuizProvider";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type CategoryType = {
  id: number;
  name: string;
};

export default function DropdownOptions() {
  const { category, setCategory, eachQuizzes, level, setLevel, type, setType } = useQuizState();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  

  useEffect(() => {
    if (eachQuizzes.length > 0) {
      const uniqueCategories = Array.from(
        new Set(eachQuizzes.map((quiz: any) => quiz.category))
      ).map((cat, index) => ({ id: index, name: cat }));
      setCategories(uniqueCategories);
    }
  }, [eachQuizzes]);

  const handleCategorySelect = (categoryName: string) => {
    const selectedCategory = categories.find((cat) => cat.name === categoryName);
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  };

  const handleLevelSelect = (levelName: string) => {
    setLevel(levelName);
  };

  const handleTypeSelect = (typeName: string) => {
    setType(typeName);
  };

  return (
    <section className="flex justify-evenly items-center py-5 text-black">
      {/* Category Dropdown */}
      <div className="px-7 py-4 border-gray-100 border-2 rounded-xl w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full">
            {category?.name || "SELECT CATEGORY"} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="overflow-y-scroll">
            <DropdownMenuLabel>{category?.name || "SELECT CATEGORY"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.length > 0 ? (
              categories.map((cat) => (
                <DropdownMenuItem key={cat.id} onClick={() => handleCategorySelect(cat.name)}>
                  {cat.name}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>Loading categories...</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Level Dropdown */}
      <div className="px-7 py-4 border-gray-100 border-2 rounded-xl w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full">
            {level || "SELECT LEVEL"} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="overflow-y-scroll">
            <DropdownMenuLabel>{level || "SELECT LEVEL"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {['easy', 'medium', 'hard'].map((levelOption) => (
              <DropdownMenuItem key={levelOption} onClick={() => handleLevelSelect(levelOption)}>
                {levelOption}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Type Dropdown */}
      <div className="px-7 py-4 border-gray-100 border-2 rounded-xl w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full">
            {type || "SELECT TYPE"} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="overflow-y-scroll">
            <DropdownMenuLabel>{type || "SELECT TYPE"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {['multiple-choice', 'true/false', 'short-answer'].map((typeOption) => (
              <DropdownMenuItem key={typeOption} onClick={() => handleTypeSelect(typeOption)}>
                {typeOption}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
