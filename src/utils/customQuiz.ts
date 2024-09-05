import { create } from 'zustand';

export type configType = {
    numberOfQuestion: number;
    category: { id: number; name: string };
    level: string;
    type: string;
    status: string;
    score: number;
    config?: any;
};

const defaultConfig: configType = {
    numberOfQuestion: 10,
    category: { id: 0, name: '' },
    level: '',
    type: '',
    status: '',
    score: 0,
};

export const useQuizConfig = create<{
    config: configType;
    addLevel: (level: string) => void;
    addCategory: (id: number, name: string) => void;
    addType: (type: string) => void;
    addQuestionNumber: (numberOfQuestion: number) => void;
    changeStatus: (status: string) => void;
    setScore: () => void;
    removeConfig: () => void;
}>((set) => ({
    config: { ...defaultConfig },
    addLevel: (level: string) => set((state) => ({ config: { ...state.config, level } })),
    addCategory: (id: number, name: string) => set((state) => ({ config: { ...state.config, category: { id, name } } })),
    addType: (type: string) => set((state) => ({ config: { ...state.config, type } })),
    addQuestionNumber: (numberOfQuestion: number) => set((state) => ({ config: { ...state.config, numberOfQuestion } })),
    changeStatus: (status: string) => set((state) => ({ config: { ...state.config, status } })),
    setScore: () => set((state) => ({ config: { ...state.config, score: state.config.score + 1 } })),
    removeConfig: () => set({ config: defaultConfig }),
}));
