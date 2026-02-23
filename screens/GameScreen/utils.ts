import { ScoreThreshold, DifficultySpeed } from './consts';

export const getDifficultyByScore = (score: number): number => {
    if (score >= ScoreThreshold.LEVEL_4) return DifficultySpeed.LEVEL_4;
    if (score >= ScoreThreshold.LEVEL_3) return DifficultySpeed.LEVEL_3;
    if (score >= ScoreThreshold.LEVEL_2) return DifficultySpeed.LEVEL_2;
    return DifficultySpeed.LEVEL_1;
};