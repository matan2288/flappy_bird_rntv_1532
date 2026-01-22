import { StyleSheet } from "react-native";

export const gameScreenStyle = StyleSheet.create({
    dashboardContainer: {
        position: 'absolute',
        top: 0,
        left: 500,
        flexDirection: 'row',
        width: '100%',
    },
    dashboardButtons: {
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