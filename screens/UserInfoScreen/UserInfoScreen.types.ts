import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";

export type UserInfoScreenProps = NativeStackScreenProps<RootStackParamList, "UserInfo">;

export interface UserInfo {
    id: string;
    username: string;
    email?: string;
    highScore: number;
    gamesPlayed: number;
}
