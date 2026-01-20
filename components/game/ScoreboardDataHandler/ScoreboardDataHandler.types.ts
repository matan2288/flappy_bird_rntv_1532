export interface ScoreEntry {
    id: string;
    username: string;
    score: number;
    date: string;
}

export interface ScoreboardDataHandlerProps {
    onScoresLoaded?: (scores: ScoreEntry[]) => void;
    onError?: (error: string) => void;
}

export interface ScoreboardDataHandlerState {
    scores: ScoreEntry[];
    isLoading: boolean;
    error: string | null;
}
