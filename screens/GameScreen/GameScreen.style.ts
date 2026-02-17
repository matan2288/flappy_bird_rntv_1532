import { StyleSheet } from "react-native";

export const gameScreenStyle = StyleSheet.create({
    actionBarContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 1000,
    },
    actionBarButtons: {
        zIndex: 1000,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 4,
    }
});