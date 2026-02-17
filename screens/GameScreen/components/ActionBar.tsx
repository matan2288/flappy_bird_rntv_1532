import { View, useWindowDimensions, TouchableOpacity, Text } from "react-native";
import { gameScreenStyle } from "../GameScreen.style";
import { ActionBarProps } from "../GameScreen.types";

export const ActionBar = (props: ActionBarProps) => {
    const { width, height } = useWindowDimensions();

    return (
        <View style={[gameScreenStyle.actionBarContainer, { top: height * 0.02 }]}>
            <TouchableOpacity
                style={[gameScreenStyle.actionBarButtons, { marginRight: width * 0.02 }]}
                onPress={() => props.onJump()}
            >
                <Text>Jump</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[gameScreenStyle.actionBarButtons, { marginRight: width * 0.02 }]}
                onPress={() => props.onStop()}
            >
                <Text>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={gameScreenStyle.actionBarButtons}
                onPress={() => props.onRestart()}
            >
                <Text>Restart</Text>
            </TouchableOpacity>
        </View>
    );
}
