import { View } from "react-native";
import { globalStyles } from "@/theme/globalStyles";
import { Bird, Pipes } from "@/components";
import { useRef, useEffect, useState } from "react";
import { GameScreenDashbaord } from "./components/GameScreenDashboard";
import type { GameScreenProps, BirdRef, PipesRef } from "./GameScreen.types";


export default function GameScreen(props: GameScreenProps) {
    const birdRef = useRef<BirdRef>(null);
    const pipesRef = useRef<PipesRef>(null);
    const gameLoop = useRef<NodeJS.Timeout | null>(null);

    const [pipeSpawn, setPipeSpawn] = useState([]);


    // const test = [] as any;

    const startGameLoop = () => {
        if (gameLoop.current) return; // Prevent multiple loops

        gameLoop.current = setInterval(() => {
            birdRef.current?.applyGravity();
            pipesRef.current?.movePipes(1);

            // test.push(<Pipes ref={pipesRef} />);

            if (birdRef.current?.isBirdDead() && gameLoop.current) {
                stopGameLoop();
            }
        }, 16);
    };


    const restartGameLoop = () => {
        stopGameLoop();
        birdRef.current?.resetBirdGravity();
        pipesRef.current?.resetPipes();
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
            {/* {test.map()} */}
            <Pipes ref={pipesRef}/>
            <Bird ref={birdRef} />
        </View>
    );
}
