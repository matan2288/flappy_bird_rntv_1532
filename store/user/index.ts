import { createStore } from '../createStore';

interface UserState {
    score: number;
    difficulty: number;
    username: string;
    registerUsername: (username: string) => void;
    registerScore: (score: number) => void;
    registerDifficulty: (difficulty: number) => void;
    resetUserDetails: () => void;
}

const initialState = {
    score: 0,
    difficulty: 3,
    username: ""
};

export const useUserStore = createStore<UserState>('GameStore', (set) => ({
    ...initialState,
    registerUsername: (username) => set({ username }),
    registerScore: (score) => set({ score }),
    registerDifficulty: (difficulty) => set({ difficulty }),
    resetUserDetails: () => set(initialState)
}));