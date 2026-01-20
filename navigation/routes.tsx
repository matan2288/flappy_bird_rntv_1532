import HomeScreen from "@/screens/HomeScreen";
import DetailsScreen from "@/screens/GameScreen";

// Route param types
export type RootStackParamList = {
    Home: undefined;
    Details: { itemId: number; title: string };
};

// Route configuration
export const routes = [
    {
        name: "Home" as const,
        component: HomeScreen,
        options: { title: "Navigation Demo" },
    },
    {
        name: "Details" as const,
        component: DetailsScreen,
        options: ({ route }: { route: { params: { title: string } } }) => ({
            title: route.params.title,
        }),
    },
] as const;

// Helper type to extract route names
export type RouteName = (typeof routes)[number]["name"];
