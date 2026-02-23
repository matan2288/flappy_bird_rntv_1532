import { StyleSheet, Dimensions, ViewStyle } from "react-native";

const { width, height } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
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
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

export const transparentTheme = {
    dark: false,
    colors: { background: 'transparent', primary: '', card: '', text: '', border: '', notification: '' },
    fonts: {
        regular: { fontFamily: '', fontWeight: 'normal' as const },
        medium: { fontFamily: '', fontWeight: '500' as const },
        bold: { fontFamily: '', fontWeight: 'bold' as const },
        heavy: { fontFamily: '', fontWeight: '900' as const },
    },
};

export const transparentContentStyle: ViewStyle = { backgroundColor: 'transparent' };
