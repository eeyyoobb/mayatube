// 'use client'
// import React from 'react';
// import { useQuizState } from '@/context/QuizProvider';

// interface DropdownOptionsProps {
//   setNumberOfQuestions: React.Dispatch<React.SetStateAction<number>>;
//   numberOfQuestions: number;
//   setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
//   setSelectedDifficulty: React.Dispatch<React.SetStateAction<string>>;
// }

// const DropdownOptions: React.FC<DropdownOptionsProps> = ({ /*setNumberOfQuestions, numberOfQuestions, setSelectedCategory, setSelectedDifficulty */}) => {
//   const { eachQuizzes } = useQuizState();
//   const categories = Array.from(new Set(eachQuizzes.flatMap(quiz => quiz.category)));
//   const difficulties = ['Easy', 'Medium', 'Hard'];

//   return (
//     <div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Number of Questions</label>
//         <select onChange={(e) => setNumberOfQuestions(Number(e.target.value))} value={numberOfQuestions}>
//           {[5, 10, 15, 20].map(num => (
//             <option key={num} value={num}>{num} Questions</option>
//           ))}
//         </select>
//       </div>
      
//       <div className="mb-4">
//         <label className="block text-gray-700">Category</label>
//         <select onChange={(e) => setSelectedCategory(e.target.value)}>
//           <option value="">All Categories</option>
//           {categories.map(category => (
//             <option key={category} value={category}>{category}</option>
//           ))}
//         </select>
//       </div>
      
//       <div className="mb-4">
//         <label className="block text-gray-700">Difficulty</label>
//         <select onChange={(e) => setSelectedDifficulty(e.target.value)}>
//           <option value="">Any Difficulty</option>
//           {difficulties.map(difficulty => (
//             <option key={difficulty} value={difficulty}>{difficulty}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default DropdownOptions;

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
  id:number,
  name:string
}
export default function DropdownOptions() {

  const {category,level,type,setCategory, setLevel,setType,eachQuizzes
  } =  useQuizState();
  const [categories, setCategories] = useState<CategoryType[]>();
  // const config = useQuizConfig((state:any) => state.config);
  // const addCategory = useQuizConfig((state:any) => state.addCategory);
  // const addLevel = useQuizConfig((state:any) => state.addLevel);
  // const addType = useQuizConfig((state:any) => state.addType);

  


  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(eachQuizzes.map((quiz:any) => quiz.category as string)) // Assuming `category` exists in each quiz object
    ).map((cat,index) => ({  id: index, name: cat }));
     console.log(uniqueCategories)
    setCategories(uniqueCategories);
  }, [eachQuizzes]);
  

  return (
    <>
      <section className="flex justify-evenly items-center py-5">
        {/* Shadcdn */}
        <div className="px-7 py-4 border-gray-100 border-2 rounded-xl w-1/3 mx-4">
          <DropdownMenu>
             <DropdownMenuTrigger className="flex outline-none justify-between w-full">
              {category.name ? category.name : "SELECT CATEGORY"}{" "}
              <ChevronDown />
            </DropdownMenuTrigger> 
            <DropdownMenuContent className="overflow-y-scroll">
              <DropdownMenuLabel>{category.name ? category.name : "SELECT CATEGORY"}</DropdownMenuLabel> 
              <DropdownMenuSeparator />
               {
                categories.map(category=>{
                  return <DropdownMenuItem key={category.name} onClick={() => uniqueCategories(category.id,category.name)}>
                  {category.name}
                </DropdownMenuItem>
                })
              } 
         
            
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Shadcdn */}
        <div className="px-7 py-4 border-gray-100 border-2 rounded-xl w-1/3 mx-4">
          <DropdownMenu>
            {/* <DropdownMenuTrigger className="flex outline-none justify-between w-full">
              {config.level ? config.level : "SELECT LEVEL"} <ChevronDown />{" "}
            </DropdownMenuTrigger> */}
            <DropdownMenuContent>
              {/* <DropdownMenuLabel> {config.level ? config.level : "SELECT LEVEL"}</DropdownMenuLabel> */}
              <DropdownMenuSeparator />
             {/* {
              ['easy','medium','hard'].map(e=>{
                return  <DropdownMenuItem key={e} onClick={() => addLevel(e)}>
                  {e}
              </DropdownMenuItem>
              })
             } */}
            
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Shadcdn */}
        <div className="px-7 py-4 border-gray-100 border-2 rounded-xl w-1/3 mx-4">
          <DropdownMenu>
            {/* <DropdownMenuTrigger className="flex outline-none justify-between w-full">
              {config.type ? config.type : "SELECT TYPE"} <ChevronDown />{" "}
            </DropdownMenuTrigger> */}
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>{config.type ? config.type : "SELECT TYPE"}</DropdownMenuLabel> */}
              <DropdownMenuSeparator />
             {/* {
              ['boolean','multiple'].map(e=>{
               return <DropdownMenuItem key={e} onClick={() => addType(e)}>
                {e}
              </DropdownMenuItem>
              })
             } */}
          
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </>
  );
}

