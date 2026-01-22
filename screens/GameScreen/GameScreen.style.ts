import { StyleSheet } from "react-native";

export const gameScreenStyle = StyleSheet.create({
    dashboardButtons: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        padding: 8,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 4,
        cursor: 'pointer',
    }
});