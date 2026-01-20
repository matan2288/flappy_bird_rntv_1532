import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";

export type YourScoreScreenProps = NativeStackScreenProps<RootStackParamList, "YourScore">;

export interface ScoreHistory {
    id: string;
    score: number;
    date: string;
    duration: number;
}
