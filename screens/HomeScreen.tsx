import { StyleSheet, Text, View, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/routes";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏠 Home Screen</Text>
            <Text style={styles.subtitle}>Welcome to the navigation demo!</Text>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate("Details", { itemId: 42, title: "Pizza" })}
                >
                    <Text style={styles.buttonText}>Go to Details (Pizza)</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        styles.buttonSecondary,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate("Details", { itemId: 99, title: "Burger" })}
                >
                    <Text style={styles.buttonText}>Go to Details (Burger)</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f23",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#00d4ff",
        marginBottom: 12,
        textShadowColor: "#00d4ff",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    subtitle: {
        fontSize: 18,
        color: "#8892b0",
        marginBottom: 40,
    },
    buttonContainer: {
        gap: 16,
        width: "100%",
        maxWidth: 300,
    },
    button: {
        backgroundColor: "#1a1a3e",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#00d4ff",
        alignItems: "center",
    },
    buttonSecondary: {
        borderColor: "#ff6b6b",
    },
    buttonPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "600",
    },
});
