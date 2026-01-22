import { View } from "react-native";
import { globalStyles } from "@/theme/globalStyles";
import { Bird, Pipes } from "@/components";
import { useRef, useEffect, useState, createRef } from "react";
import { Dashboard } from "./components/Dashboard";
import type { GameScreenProps, BirdRef, PipesRef } from "./GameScreen.types";


export default function GameScreen(props: GameScreenProps) {
    const birdRef = useRef<BirdRef>(null);
    const pipesRef = useRef<PipesRef>(null);
    const gameLoop = useRef<NodeJS.Timeout | null>(null);
    const pipesListRef = useRef<React.RefObject<PipesRef | null>[]>([]);
    const [pipesList, setPipesList] = useState<React.RefObject<PipesRef | null>[]>([]);
    const pipeSpwanTimerLimit = 120;
    let pipeSpwan = 0;

    const startGameLoop = () => {
        if (gameLoop.current) return; // Prevent multiple loops

        gameLoop.current = setInterval(() => {
            birdRef.current?.applyGravity();
            pipesListRef.current.forEach(ref => {
                ref.current?.movePipes(3);
            });

            pipeSpwan++;
   


            if (pipeSpwan === pipeSpwanTimerLimit) {
                const newPipesRef = createRef<PipesRef>();

                pipesListRef.current = [...pipesListRef.current, newPipesRef];
                setPipesList([...pipesListRef.current]);

                console.log("new pipes has been added");
                pipeSpwan = 0;
            }

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

        return () => {
            stopGameLoop();
        };
    }, []);

    return (
        <View style={globalStyles.container}>
            {pipesList.map((ref, index) => (
                <Pipes key={index} ref={ref} />
            ))}
            <Dashboard
                onRestart={restartGameLoop}
                onStop={stopGameLoop}
                onJump={() => birdRef.current?.jump()}
            />

            <Bird ref={birdRef} />
        </View>
    );
}
