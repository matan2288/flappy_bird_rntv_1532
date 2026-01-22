import { View } from "react-native";
import { useEffect } from "react";
import { globalStyles } from "@/theme/globalStyles";
import { gameScreenStyle } from "../GameScreen.style";
import { GameScreenDashboardProps } from "../GameScreen.types";

export const GameScreenDashbaord = (props: GameScreenDashboardProps) => {
    useEffect(() => {

    }, []);
    return (
        <View style={globalStyles.container}>
            <button
                style={{
                    ...gameScreenStyle.dashboardButtons,
                    left: 10
                }}
                onClick={() => props.onJump()}
            >
                Jump
            </button>
            <button
                style={{
                    ...gameScreenStyle.dashboardButtons,
                    left: 60
                }}
                onClick={() => props.onStop()}
            >
                Stop
            </button>
            <button
                style={{
                    ...gameScreenStyle.dashboardButtons,
                    left: 110
                }}
                onClick={() => props.onRestart()}
            >
                Restart
            </button>
        </View>
    );
}
