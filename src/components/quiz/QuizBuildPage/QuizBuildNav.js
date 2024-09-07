'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useQuizState } from '@/context/QuizProvider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import convertFromFaToText from '@/Common/convertFromFaToText';

function validateQuizQuestions(quizQuestions) {
  for (let question of quizQuestions) {
    if (!question.mainQuestion.trim()) {
      return { valid: false, message: 'Please fill in the main question.' };
    }
    if (question.choices.some((choice) => !choice.trim().substring(2))) {
      return { valid: false, message: 'Please fill in all choices.' };
    }
    if (question.correctAnswer.length === 0) {
      return { valid: false, message: 'Please specify the correct answer.' };
    }
  }
  return { valid: true };
}

function QuizBuildNav({ newQuiz, setNewQuiz }) {
  const { allQuizzes, setAllQuizzes, selectedQuizObject } = useQuizState();
  const { selectedQuiz } = selectedQuizObject;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function createNewQuiz() {
    try {
      setIsLoading(true);
      const textIcon = convertFromFaToText(newQuiz.icon);
      const quizWithTextIcon = {
        ...newQuiz,
        icon: textIcon,
      };

      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(quizWithTextIcon), // Adding the new quiz to the db
      });

      if (!res.ok) {
        toast.error('Failed to create a new quiz!');
        setIsLoading(false);
        return;
      }

      const { id } = await res.json();
      // Update the _id property of the newQuiz object
      const updatedQuiz = { ...newQuiz, _id: id, icon: textIcon };
      setAllQuizzes([...allQuizzes, updatedQuiz]);

      toast.success('The quiz has been created successfully!');
      router.push('/quizzes');
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error('An error occurred while creating the quiz.');
    } finally {
      setIsLoading(false);
    }
  }

  async function saveQuiz() {
    if (newQuiz.quizTitle.trim().length === 0) {
      return toast.error('Please add a name for the quiz!');
    }

    const isValid = validateQuizQuestions(newQuiz.quizQuestions);
    if (!isValid.valid) {
      return toast.error(isValid.message);
    }

    if (selectedQuiz) {
      const updatedQuiz = [...allQuizzes];
      const findIndexQuiz = updatedQuiz.findIndex(quiz => quiz._id === newQuiz._id);

      if (findIndexQuiz !== -1) {
        const textIcon = convertFromFaToText(updatedQuiz[findIndexQuiz].icon);
        updatedQuiz[findIndexQuiz] = { ...newQuiz, icon: textIcon };

        try {
          const res = await fetch(`/api/quiz?id=${newQuiz._id}`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              updateQuiz: updatedQuiz[findIndexQuiz],
            }),
          });

          if (!res.ok) {
            throw new Error('Failed to update quiz');
          }

          toast.success('The quiz has been updated successfully.');
          setAllQuizzes(updatedQuiz);
          router.push('/quizzes');
        } catch (error) {
          console.error('Error updating quiz:', error);
          toast.error('An error occurred while updating the quiz.');
        }
      } else {
        await createNewQuiz();
      }
    } else {
      await createNewQuiz();
    }
  }

  return (
    <div className="poppins my-12 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image src="/quiz-builder-icon.png" alt="Quiz Builder Icon" height={50} width={50} />
        <span className="text-2xl">
          Quiz <span className="text-green-700 font-bold">Builder</span>
        </span>
      </div>
      <button
        onClick={saveQuiz}
        className="p-2 px-4 bg-green-700 rounded-md text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Save'}
      </button>
    </div>
  );
}

export default QuizBuildNav;
