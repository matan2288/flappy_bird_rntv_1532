import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes, RootStackParamList } from "./routes";
import { transparentTheme, transparentContentStyle } from "@/theme/globalStyles";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <NavigationContainer theme={transparentTheme}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false, contentStyle: transparentContentStyle }}
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

export type { RootStackParamList } from "./routes";
