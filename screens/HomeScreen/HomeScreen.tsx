import { Text, View, Pressable } from "react-native";
import { globalStyles } from "@/theme/globalStyles";
import { HomeScreenProps } from "./HomeScreen.types";

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Welcome</Text>

            <View style={globalStyles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        globalStyles.button,
                        pressed && globalStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate("UserInfo")}
                >
                    <Text style={globalStyles.buttonText}>Start</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        globalStyles.button,
                        globalStyles.buttonSecondary,
                        pressed && globalStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate("Scoreboard")}
                >
                    <Text style={globalStyles.buttonText}>Scoreboard</Text>
                </Pressable>
            </View>
        </View>
    );
}
