import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";

export type ScoreboardScreenProps = NativeStackScreenProps<RootStackParamList, "Scoreboard">;

export interface ScoreboardEntry {
    rank: number;
    username: string;
    score: number;
    date: string;
}
