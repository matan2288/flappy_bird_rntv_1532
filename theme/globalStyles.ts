import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f23",
        alignItems: "center",
        justifyContent: "center",
        padding: width * 0.05
    },
    title: {
        fontSize: width * 0.08,
        fontWeight: "bold",
        color: "#00d4ff",
        marginBottom: height * 0.015,
        textShadowColor: "#00d4ff",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    button: {
        backgroundColor: "#1a1a3e",
        paddingVertical: height * 0.012,
        paddingHorizontal: width * 0.06,
        borderRadius: 10,
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
        fontSize: width * 0.035,
        fontWeight: "600",
    },
    buttonContainer: {
        gap: height * 0.015,
        width: "80%",
        maxWidth: width * 0.6,
    },
});
