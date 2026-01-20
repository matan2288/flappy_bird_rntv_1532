import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import { globalStyles } from "@/theme/globalStyles";
import { Bird } from "@/components";
import { useRef, useEffect, useState } from "react";
import { GameScreenDashbaord } from "./components/GameScreenDashboard";

type Props = NativeStackScreenProps<RootStackParamList, "GameScreen">;

// Type for the Bird component ref (class component instance)
type BirdRef = InstanceType<typeof Bird>;


export default function GameScreen(props: Props) {

    const birdRef = useRef<BirdRef>(null);
    const gameLoop = useRef<NodeJS.Timeout | null>(null);

    const startGameLoop = () => {
        if (gameLoop.current) return; // Prevent multiple loops

        gameLoop.current = setInterval(() => {
            birdRef.current?.applyGravity();

            if (birdRef.current?.isBirdDead() && gameLoop.current) {
                stopGameLoop();
            }
        }, 16);
    };


    const restartGameLoop = () => {
        stopGameLoop();
        birdRef.current?.resetBirdGravity();
        startGameLoop();
    }

    const stopGameLoop = () => {
        if (gameLoop.current) {
            clearInterval(gameLoop.current);
            gameLoop.current = null;
        }
    };

    useEffect(() => {
        startGameLoop();

        // Cleanup on unmount
        return () => {
            stopGameLoop();
        };
    }, []);

    return (
        <View style={globalStyles.container}>
            <GameScreenDashbaord
                onRestart={restartGameLoop}
                onStop={stopGameLoop}
                onJump={() => birdRef.current?.jump()}
            />
            <Bird ref={birdRef} />
        </View>
    );
}
