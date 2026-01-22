import { View } from "react-native";
import { useEffect } from "react";
import { gameScreenStyle } from "../GameScreen.style";
import { DashboardProps } from "../GameScreen.types";

export const Dashboard = (props: DashboardProps) => {
    useEffect(() => {

    }, []);
    return (
        <View style={gameScreenStyle.dashboardContainer}>
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
