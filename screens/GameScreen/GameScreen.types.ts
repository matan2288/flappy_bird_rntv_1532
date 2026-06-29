import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import type { BirdRef } from "@/components/game/Bird/Bird";
import type { PipesRef } from "@/components/game/Pipes/Pipes";

export type GameScreenProps = NativeStackScreenProps<RootStackParamList, "GameScreen">;

export type { BirdRef, PipesRef };

export interface GameState {
    isPlaying: boolean;
    isPaused: boolean;
    score: number;
}

export interface ActionBarProps {
    onRestart: () => void;
    onStop: () => void;
    onJump: () => void;
}
