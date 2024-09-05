// src/context/QuizCustom.tsx
"use client"; // Add this to indicate that this file should be treated as a client component

import { createContext, useContext, ReactNode } from 'react';
import { useQuizConfig, configType } from '@/utils/customQuiz'; // Adjust the import path as needed

// Define the context type
interface QuizConfigContextType {
    config: configType;
    addLevel: (level: string) => void;
    addCategory: (id: number, name: string) => void;
    addType: (type: string) => void;
    addQuestionNumber: (numberOfQuestion: number) => void;
    changeStatus: (status: string) => void;
    setScore: () => void;
    removeConfig: () => void;
}

// Create the context with a default value
const QuizConfigContext = createContext<QuizConfigContextType | undefined>(undefined);

// Provider Component
export const QuizConfigProvider = ({ children }: { children: ReactNode }) => {
    const store = useQuizConfig();

    return (
        <QuizConfigContext.Provider value={store}>
            {children}
        </QuizConfigContext.Provider>
    );
};

// Custom Hook to use the context
export const useQuizConfigContext = () => {
    const context = useContext(QuizConfigContext);
    if (context === undefined) {
        throw new Error('useQuizConfigContext must be used within a QuizConfigProvider');
    }
    return context;
};
