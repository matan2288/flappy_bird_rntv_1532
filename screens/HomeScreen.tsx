import { Text, View, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import { globalStyles } from "@/theme/globalStyles";
import Bird from "@/components/game/Bird";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>🏠 Home Screen</Text>
            <Text style={{ fontSize: 18, color: "#8892b0", marginBottom: 40 }}>Welcome to the navigation demo!</Text>

            <View style={globalStyles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        globalStyles.button,
                        pressed && globalStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate("GameScreen", { itemId: 42, title: "Home" })}
                >
                    <Text style={globalStyles.buttonText}>Go to GameScreen</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        globalStyles.button,
                        globalStyles.buttonSecondary,
                        pressed && globalStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate("GameScreen", { itemId: 99, title: "Home" })}
                >
                    <Text style={globalStyles.buttonText}>Go to Details (Burger)</Text>
                </Pressable>
            </View>
        </View>
    );
}
