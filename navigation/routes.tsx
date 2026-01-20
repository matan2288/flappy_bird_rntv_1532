import {
  HomeScreen,
  GameScreen,
  ScoreboardScreen,
  UserInfoScreen,
  YourScoreScreen,
} from "@/screens";

// Route param types
export type RootStackParamList = {
    Home: undefined;
    GameScreen: { itemId: number; title: string };
    Scoreboard: undefined;
    UserInfo: undefined;
    YourScore: undefined;
};

// Route configuration
export const routes = [
    {
        name: "Home" as const,
        component: HomeScreen,
        options: { title: "Navigation Demo" },
    },
    {
        name: "GameScreen" as const,
        component: GameScreen,
        options: ({ route }: { route: { params: { title: string } } }) => ({
            title: route.params.title,
        }),
    },
    {
        name: "Scoreboard" as const,
        component: ScoreboardScreen,
        options: { title: "Scoreboard" },
    },
    {
        name: "UserInfo" as const,
        component: UserInfoScreen,
        options: { title: "User Info" },
    },
    {
        name: "YourScore" as const,
        component: YourScoreScreen,
        options: { title: "Your Score" },
    },
] as const;

// Helper type to extract route names
export type RouteName = (typeof routes)[number]["name"];
