import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
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
    buttonContainer: {
        gap: 16,
        width: "100%",
        maxWidth: 300,
    },
}
);
