import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes, RootStackParamList } from "./routes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
            >
                {routes.map(({ name, component, options }) => (
                    <Stack.Screen
                        key={name}
                        name={name}
                        component={component as React.ComponentType<any>}
                        options={options as any}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// Re-export for screens to import
export type { RootStackParamList } from "./routes";
