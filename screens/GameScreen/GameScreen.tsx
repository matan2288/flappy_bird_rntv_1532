import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import { globalStyles } from "@/theme/globalStyles";
import { Bird } from "@/components";
import { useRef, useEffect, useState } from "react";

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
            <button
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 1000,
                    padding: 8,
                    backgroundColor: '#eee',
                    border: '1px solid #aaa',
                    borderRadius: 4,
                    cursor: 'pointer',
                }}
                onClick={() => birdRef.current?.jump()}
            >
                Jump
            </button>
            <button
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 60,
                    zIndex: 1000,
                    padding: 8,
                    backgroundColor: '#eee',
                    border: '1px solid #aaa',
                    borderRadius: 4,
                    cursor: 'pointer',
                }}
                onClick={() => stopGameLoop()}
            >
                Stop
            </button>
            <button
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 110,
                    zIndex: 1000,
                    padding: 8,
                    backgroundColor: '#eee',
                    border: '1px solid #aaa',
                    borderRadius: 4,
                    cursor: 'pointer',
                }}
                onClick={() => restartGameLoop()}
            >
                Restart
            </button>
            <Bird ref={birdRef} />
        </View>
    );
}
