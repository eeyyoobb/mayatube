import React from 'react';
import { useQuizState } from '@/context/QuizProvider';



const DropdownOptions = () => {
  const { eachQuizzes, setNumberOfQuestions, numberOfQuestions } = useQuizState();
  console.log(eachQuizzes)
  const categories = Array.from(new Set(eachQuizzes.flatMap(quiz => quiz.category)));
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div>
      <select onChange={(e) => setNumberOfQuestions(Number(e.target.value))} value={numberOfQuestions}>
        {[5, 10, 15, 20].map(num => (
          <option key={num} value={num}>{num} Questions</option>
        ))}
      </select>
      
      <select>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      
      <select>
        {difficulties.map(difficulty => (
          <option key={difficulty} value={difficulty}>{difficulty}</option>
        ))}
      </select>
    </div>
  );
};

export default DropdownOptions;
