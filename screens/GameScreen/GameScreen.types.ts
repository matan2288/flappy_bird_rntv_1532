import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import type Bird from "@/components/game/Bird/Bird";

export type GameScreenProps = NativeStackScreenProps<RootStackParamList, "GameScreen">;

export type BirdRef = InstanceType<typeof Bird>;

export interface GameState {
    isPlaying: boolean;
    isPaused: boolean;
    score: number;
}
